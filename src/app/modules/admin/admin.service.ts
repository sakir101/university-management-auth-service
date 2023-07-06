import mongoose, { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { adminSearchableFields } from "./admin.constant";
import { IAdmin, IAdminsFilters } from "./admin.interface";
import { Admin } from "./admin.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../users/user.model";
import { DeleteResult } from "mongodb";

const getAllAdmins = async (
    filters: IAdminsFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
    const { searchTerm, ...filtersData } = filters;



    const andConditions = []

    if (searchTerm) {
        andConditions.push({
            $or: adminSearchableFields.map(field => ({
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

    const result = await Admin.find(whereConditions)
        .populate('managementDepartment')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Admin.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
    const result = await Admin.findOne({ id })
        .populate('managementDepartment')
    return result;
}

const updateAdmin = async (
    id: string,
    payload: Partial<IAdmin>
): Promise<IAdmin | null> => {

    const isExist = await Admin.findOne({ id });
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
    }

    const { name, ...adminData } = payload;
    const updateAdminData: Partial<IAdmin> = { ...adminData };

    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            (updateAdminData as any)[nameKey] = name[key as keyof typeof name]
        })
    }

    const result = await Admin.findOneAndUpdate({ id }, updateAdminData, { new: true });
    return result;
}



const deleteAdmin = async (id: string): Promise<IAdmin | null | DeleteResult> => {
    // check if the student is exist
    const isExist = await Admin.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //delete admin
        const admin = await Admin.deleteOne({ id });
        if (!admin) {
            throw new ApiError(404, 'Failed to delete admin');
        }
        //delete user
        await User.deleteOne({ id });
        session.commitTransaction();
        session.endSession();

        return admin;
    } catch (error) {
        session.abortTransaction();
        throw error;
    }
};


export const AdminService = {
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin
}