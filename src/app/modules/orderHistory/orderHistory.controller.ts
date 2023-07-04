import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constant/constant";
import { IOrderHistory } from "./orderHistory.interface";
import { OrderHistoryService } from "./orderHistory.service";

const createOrderHistory = catchAsync(async (req: Request, res: Response) => {


    const { ...orderHistoryData } = req.body
    const result = await OrderHistoryService.createOrderHistory(orderHistoryData)
    console.log(result)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order history created successfully',
        data: result,
    });


})

const getAllOrderHistories = catchAsync(
    async (req: Request, res: Response) => {

        const paginationOptions = pick(req.query, paginationFields)

        const result = await OrderHistoryService.getAllOrderHistories(
            paginationOptions
        )


        sendResponse<IOrderHistory[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Order histories retrived successfully',
            meta: result.meta,
            data: result.data,
        });




    }


)

export const OrderHistoryController = {
    createOrderHistory,
    getAllOrderHistories
}