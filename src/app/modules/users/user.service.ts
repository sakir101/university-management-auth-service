import mongoose, { SortOrder } from 'mongoose'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser, IUsersFilters } from './user.interface'
import { Buyer } from '../buyer/buyer.model'
import httpStatus from 'http-status'
import { User } from './user.model'
import { Seller } from '../seller/seller.model'
import { IBuyer } from '../buyer/buyer.interface'
import { ISeller } from '../seller/seller.interface'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { userSearchableFields } from './user.constant'
import { paginationHelpers } from '../../../helpers/paginationHelper'


const createBuyer = async (buyer: IBuyer, user: IUser): Promise<IUser | null> => {

  //password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  // set role
  user.role = 'buyer'

  //generate id
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    //array
    const newBuyer = await Buyer.create([buyer], { session })

    if (!newBuyer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create buyer')
    }

    user.buyer = newBuyer[0]._id;

    const newUser = await User.create([user], { session });


    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();

  } catch (error) {
    await session.abortTransaction();
    await session.endSession()
    throw error;
  }

  return newUserAllData
}

const createSeller = async (seller: ISeller, user: IUser): Promise<IUser | null> => {

  //password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  // set role
  user.role = 'seller'


  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()


    const newSeller = await Seller.create([seller], { session })

    if (!newSeller.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create seller')
    }

    user.seller = newSeller[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();

  } catch (error) {
    await session.abortTransaction();
    await session.endSession()
    throw error;
  }

  return newUserAllData
}

const getAllUsers = async (
  filters: IUsersFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;



  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i'
        },
      })),
    });
  }


  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value
      }))
    })
  }

  const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortConditions) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await User.find(whereConditions)
    .populate('buyer')
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  }
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
    .populate('buyer')
    .populate('seller')
  return result;
}

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {

  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { name, ...userData } = payload;
  const updateStudentData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }


  const result = await User.findOneAndUpdate({ _id: id }, updateStudentData, { new: true })
    .populate('buyer')
    .populate('seller');
  return result;
}



const deleteUser = async (id: string): Promise<IUser | null> => {

  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.deleteOne({ _id: id });
    if (!user) {
      throw new ApiError(404, 'Failed to delete user');
    }
    //delete user
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return user;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};





export const UserService = {
  createBuyer,
  createSeller,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
}
