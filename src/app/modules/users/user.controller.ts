import { Request, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { userFilterableField } from './user.constant'
import { paginationFields } from '../../../constant/constant'
import { IUser } from './user.interface'



const createBuyer = catchAsync(async (req: Request, res: Response) => {


  const { buyer, ...userData } = req.body
  const result = await UserService.createBuyer(buyer, userData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer created successfully',
    data: result,
  });


})

const createSeller = catchAsync(async (req: Request, res: Response) => {


  const { seller, ...userData } = req.body
  const result = await UserService.createSeller(seller, userData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller created successfully',
    data: result,
  });



})

const getAllUsers = catchAsync(
  async (req: Request, res: Response) => {

    const filters = pick(req.query, userFilterableField)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await UserService.getAllUsers(
      filters,
      paginationOptions
    )


    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrived successfully',
      meta: result.meta,
      data: result.data,
    });




  }


)

const getSingleUser = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await UserService.getSingleUser(id)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single user retrived successfully',
      data: result,
    });




  }
)

const updateUser = catchAsync(
  async (req: Request, res: Response) => {

    const id = req.params.id;

    const updatedData = req.body;

    const result = await UserService.updateUser(id, updatedData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User update successfully',
      data: result,
    });



  }
)

const deleteUser = catchAsync(
  async (req: Request, res: Response) => {

    const id = req.params.id;

    const result = await UserService.deleteUser(id)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully',
      data: result,
    });



  }
)



export const UserController = {
  createBuyer,
  createSeller,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
}
