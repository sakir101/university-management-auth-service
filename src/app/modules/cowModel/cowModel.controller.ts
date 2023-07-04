import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ICowModel } from "./cowModel.interface";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { cowModelFilterableField } from "./cowModel.constant";
import { paginationFields } from "../../../constant/constant";
import { CowModelService } from "./cowModel.service";

const createCowModel = catchAsync(async (req: Request, res: Response) => {


    const { ...CowModelData } = req.body
    const result = await CowModelService.createCowModel(CowModelData)

    sendResponse<ICowModel>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cow model created successfully',
        data: result,
    });


})

const getAllCowModels = catchAsync(
    async (req: Request, res: Response) => {

        const filters = pick(req.query, cowModelFilterableField)
        const paginationOptions = pick(req.query, paginationFields)

        const result = await CowModelService.getAllCowModels(
            filters,
            paginationOptions
        )


        sendResponse<ICowModel[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow models retrived successfully',
            meta: result.meta,
            data: result.data,
        });




    }


)

const getSingleCowModel = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await CowModelService.getSingleCowModel(id)

        sendResponse<ICowModel>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single cow model retrived successfully',
            data: result,
        });




    }
)

const updateCowModel = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const updatedData = req.body;

        const result = await CowModelService.updateCowModel(id, updatedData)

        sendResponse<ICowModel>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow model update successfully',
            data: result,
        });



    }
)

const deleteCowModel = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await CowModelService.deleteCowModel(id)

        sendResponse<ICowModel>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow model deleted successfully',
            data: result,
        });



    }
)

export const CowModelController = {
    createCowModel,
    getAllCowModels,
    getSingleCowModel,
    updateCowModel,
    deleteCowModel
}
