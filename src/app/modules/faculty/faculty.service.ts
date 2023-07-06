import mongoose, { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { facultySearchableFields } from "./faculty.constant";
import { IFacultiesFilters, IFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../users/user.model";
import { DeleteResult } from 'mongodb'

const getAllFaculties = async (
    filters: IFacultiesFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
    const { searchTerm, ...filtersData } = filters;



    const andConditions = []

    if (searchTerm) {
        andConditions.push({
            $or: facultySearchableFields.map(field => ({
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

    const result = await Faculty.find(whereConditions)
        .populate('academicFaculty')
        .populate('academicDepartment')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Faculty.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
    const result = await Faculty.findOne({ id })
        .populate('academicFaculty')
        .populate('academicDepartment')
    return result;
}

const updateFaculty = async (
    id: string,
    payload: Partial<IFaculty>
): Promise<IFaculty | null> => {

    const isExist = await Faculty.findOne({ id });
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
    }

    const { name, ...facultyData } = payload;
    const updateFacultyData: Partial<IFaculty> = { ...facultyData };

    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            (updateFacultyData as any)[nameKey] = name[key as keyof typeof name]
        })
    }

    const result = await Faculty.findOneAndUpdate({ id }, updateFacultyData, { new: true });
    return result;
}



const deleteFaculty = async (id: string): Promise<IFaculty | null | DeleteResult> => {
    // check if the student is exist
    const isExist = await Faculty.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //delete faculty
        const faculty = await Faculty.deleteOne({ id });
        if (!faculty) {
            throw new ApiError(404, 'Failed to delete faculty');
        }
        //delete user
        await User.deleteOne({ id });
        session.commitTransaction();
        session.endSession();

        return faculty;
    } catch (error) {
        session.abortTransaction();
        throw error;
    }
};


export const FacultyService = {
    getAllFaculties,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty
}