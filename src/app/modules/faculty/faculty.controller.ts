import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IFaculty } from "./faculty.interface";
import httpStatus from "http-status";
import { paginationFields } from "../../../constant/constant";
import { facultyFilterableField } from "./faculty.constant";
import { FacultyService } from "./faculty.service";

const getAllFaculties = catchAsync(
    async (req: Request, res: Response) => {

        const filters = pick(req.query, facultyFilterableField)
        const paginationOptions = pick(req.query, paginationFields)

        const result = await FacultyService.getAllFaculties(
            filters,
            paginationOptions
        )


        sendResponse<IFaculty[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Faculties retrived successfully',
            meta: result.meta,
            data: result.data,
        });




    }


)

const getSingleFaculty = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await FacultyService.getSingleFaculty(id)

        sendResponse<IFaculty>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single faculty retrived successfully',
            data: result,
        });




    }
)

const updateFaculty = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const updatedData = req.body;

        const result = await FacultyService.updateFaculty(id, updatedData)

        sendResponse<IFaculty>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Faculty update successfully',
            data: result,
        });



    }
)

const deleteFaculty = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await FacultyService.deleteFaculty(id)

        sendResponse<IFaculty>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Faculty deleted successfully',
            data: result,
        });



    }
)


export const FacultyController = {
    getAllFaculties,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty
}
