import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IAcademicFaculty } from "./academicFaculty.interface";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AcademicFacultyService } from "./academicFaculty.service";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constant/constant";
import { academicFacultyFilterableField } from "./academicFacaulty.constant";

const createFaculty = catchAsync(async (req: Request, res: Response) => {


    const { ...academicFacultyData } = req.body
    const result = await AcademicFacultyService.createFaculty(academicFacultyData)

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty created successfully',
        data: result,
    });

})

const getAllAcademicFaculties = catchAsync(
    async (req: Request, res: Response) => {
        console.log(req.headers.authorization)
        console.log(req.user)
        const filters = pick(req.query, academicFacultyFilterableField)
        const paginationOptions = pick(req.query, paginationFields)

        const result = await AcademicFacultyService.getAllAcademicFaculties(
            filters,
            paginationOptions
        )


        sendResponse<IAcademicFaculty[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Faculty retrived successfully',
            meta: result.meta,
            data: result.data,
        });




    }


)

const getSingleFaculty = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await AcademicFacultyService.getSingleFaculty(id)

        sendResponse<IAcademicFaculty>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single faculty retrived successfully',
            data: result,
        });




    }
)

const updateAcademicFaculty = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const updatedData = req.body;

        const result = await AcademicFacultyService.updateAcademicFaculty(id, updatedData)

        sendResponse<IAcademicFaculty>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Faculty update successfully',
            data: result,
        });



    }
)

const deleteAcademicFaculty = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await AcademicFacultyService.deleteAcademicFaculty(id)

        sendResponse<IAcademicFaculty>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Faculty deleted successfully',
            data: result,
        });



    }
)

export const AcademicFacultyController = {
    createFaculty,
    getAllAcademicFaculties,
    getSingleFaculty,
    updateAcademicFaculty,
    deleteAcademicFaculty
}
