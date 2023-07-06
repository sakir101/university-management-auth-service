import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { studentFilterableField } from "./student.constant";
import { paginationFields } from "../../../constant/constant";
import { IStudent } from "./student.interface";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { StudentService } from "./student.service";


const getAllStudents = catchAsync(
    async (req: Request, res: Response) => {

        const filters = pick(req.query, studentFilterableField)
        const paginationOptions = pick(req.query, paginationFields)

        const result = await StudentService.getAllStudents(
            filters,
            paginationOptions
        )


        sendResponse<IStudent[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Students retrived successfully',
            meta: result.meta,
            data: result.data,
        });




    }


)

const getSingleStudent = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await StudentService.getSingleStudent(id)

        sendResponse<IStudent>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single student retrived successfully',
            data: result,
        });




    }
)

const updateStudent = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const updatedData = req.body;

        const result = await StudentService.updateStudent(id, updatedData)

        sendResponse<IStudent>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student update successfully',
            data: result,
        });



    }
)

const deleteStudent = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await StudentService.deleteStudent(id)

        sendResponse<IStudent>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student deleted successfully',
            data: result,
        });



    }
)


export const StudentController = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent
}
