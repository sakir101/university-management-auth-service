import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicDepartmentSearchableFields } from "./academicDepartement.constants";
import { IAcademicDepartment, IAcademicDepartmentFilterRequest } from "./academicDepartement.interface";
import { academicDepartment } from "./academicDepartement.model";

const createDepartment = async (
    payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {

    const result = (await academicDepartment.create(payload))
        .populate('academicFaculty');
    return result;
};

const getAllDepartments = async (
    filters: IAcademicDepartmentFilterRequest,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
    const { searchTerm, ...filtersData } = filters;



    const andConditions = []

    if (searchTerm) {
        andConditions.push({
            $or: academicDepartmentSearchableFields.map(field => ({
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

    const result = await academicDepartment.find(whereConditions)
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await academicDepartment.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
};

const getSingleDepartment = async (id: string): Promise<IAcademicDepartment | null> => {
    const result = await academicDepartment.findById(id).populate('academicFaculty');
    return result;
};

const updateAcademicDepartment = async (
    id: string,
    payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {

    const result = await academicDepartment.findOneAndUpdate({ _id: id }, payload, { new: true }).populate('academicFaculty');
    return result;
};

const deleteAcademicDepartment = async (id: string): Promise<IAcademicDepartment | null> => {
    const result = await academicDepartment.findByIdAndDelete(id);
    return result;
}

export const AcademicDepartmentService = {
    createDepartment,
    getAllDepartments,
    getSingleDepartment,
    updateAcademicDepartment,
    deleteAcademicDepartment
}

