import { NextFunction, Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constant/constant'
import { IAcademicSemester } from './academicSemester.interface'
import { academicSemesterFilterableField } from './academicSemster.constant'




const createSemester = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(academicSemesterData)

    sendResponse<IAcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester created successfully',
        data: result,
    });


    next();
})

const getAllSemesters = catchAsync(
    async (req: Request, res: Response) => {

        const filters = pick(req.query, academicSemesterFilterableField)
        const paginationOptions = pick(req.query, paginationFields)

        const result = await AcademicSemesterService.getAllSemesters(
            filters,
            paginationOptions
        )


        sendResponse<IAcademicSemester[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester retrived successfully',
            meta: result.meta,
            data: result.data,
        });




    }


)

const getSingleSemester = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await AcademicSemesterService.getSingleSemester(id)

        sendResponse<IAcademicSemester>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single semester retrived successfully',
            data: result,
        });




    }
)

const updateSemester = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const updatedData = req.body;

        const result = await AcademicSemesterService.updateSemester(id, updatedData)

        sendResponse<IAcademicSemester>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester update successfully',
            data: result,
        });



    }
)

const deleteSemester = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await AcademicSemesterService.deleteSemester(id)

        sendResponse<IAcademicSemester>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester deleted successfully',
            data: result,
        });



    }
)

export const AcademicSemesterController = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    updateSemester,
    deleteSemester
}
