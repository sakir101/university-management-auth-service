import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { academicFacultySearchableFields } from "./academicFacaulty.constant";
import { IAcademicFaculty, IAcademicFacultyFilters } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";
import { IPaginationOptions } from "../../../interfaces/pagination";

const createFaculty = async (
    payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {

    const result = await AcademicFaculty.create(payload);
    return result;
};

const getAllAcademicFaculties = async (
    filters: IAcademicFacultyFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
    const { searchTerm, ...filtersData } = filters;



    const andConditions = []

    if (searchTerm) {
        andConditions.push({
            $or: academicFacultySearchableFields.map(field => ({
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

    const result = await AcademicFaculty.find(whereConditions).sort(sortConditions).skip(skip).limit(limit);

    const total = await AcademicFaculty.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

const getSingleFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.findById(id);
    return result;
}

const updateAcademicFaculty = async (
    id: string,
    payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {

    const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
}

const deleteAcademicFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.findByIdAndDelete(id);
    return result;
}

export const AcademicFacultyService = {
    createFaculty,
    getAllAcademicFaculties,
    getSingleFaculty,
    updateAcademicFaculty,
    deleteAcademicFaculty
}
