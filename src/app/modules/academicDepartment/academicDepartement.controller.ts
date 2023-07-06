import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IAcademicDepartment } from "./academicDepartement.interface";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { paginationFields } from "../../../constant/constant";
import pick from "../../../shared/pick";
import { AcademicDepartmentService } from "./academicDepartement.service";
import { academicDepartmentFilterableField } from "./academicDepartement.constants";

const createDepartment = catchAsync(async (req: Request, res: Response) => {


    const { ...academicDepartmentData } = req.body
    const result = await AcademicDepartmentService.createDepartment(academicDepartmentData)

    sendResponse<IAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department created successfully',
        data: result,
    });

})

const getAllDepartments = catchAsync(
    async (req: Request, res: Response) => {

        const filters = pick(req.query, academicDepartmentFilterableField)
        const paginationOptions = pick(req.query, paginationFields)

        const result = await AcademicDepartmentService.getAllDepartments(
            filters,
            paginationOptions
        )


        sendResponse<IAcademicDepartment[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Department retrived successfully',
            meta: result.meta,
            data: result.data,
        });




    }


)

const getSingleDepartment = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await AcademicDepartmentService.getSingleDepartment(id)

        sendResponse<IAcademicDepartment>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single department retrived successfully',
            data: result,
        });




    }
)

const updateAcademicDepartment = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const updatedData = req.body;

        const result = await AcademicDepartmentService.updateAcademicDepartment(id, updatedData)

        sendResponse<IAcademicDepartment>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Department update successfully',
            data: result,
        });



    }
)

const deleteAcademicDepartment = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await AcademicDepartmentService.deleteAcademicDepartment(id)

        sendResponse<IAcademicDepartment>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Department deleted successfully',
            data: result,
        });



    }
)

export const AcademicDepartmentController = {
    createDepartment,
    getAllDepartments,
    getSingleDepartment,
    updateAcademicDepartment,
    deleteAcademicDepartment
}