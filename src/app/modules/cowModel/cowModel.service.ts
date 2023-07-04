import { ICowModel, ICowModelsFilters } from "./cowModel.interface";
import { CowModel } from "./cowModel.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { cowModelSearchableFields } from "./cowModel.constant";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { SortOrder } from "mongoose";

const createCowModel = async (
    payload: ICowModel
): Promise<ICowModel> => {

    const result = await CowModel.create(payload);
    return result;
};



const getAllCowModels = async (
    filters: ICowModelsFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICowModel[]>> => {
    const { searchTerm, ...filtersData } = filters;


    const andConditions = []


    if (searchTerm) {
        andConditions.push({
            $or: cowModelSearchableFields.map(field => ({
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

    if (filtersData.maxPrice) {

        console.log(andConditions)

        const result = await CowModel.find({ price: { $gt: filtersData.maxPrice } })
            .populate('seller')
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);

        const total = await CowModel.countDocuments({ price: { $gt: filtersData.maxPrice } });

        return {
            meta: {
                page,
                limit,
                total
            },
            data: result
        }
    }
    if (filtersData.minPrice) {

        console.log(andConditions)

        const result = await CowModel.find({ price: { $lt: filtersData.minPrice } })
            .populate('seller')
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);

        const total = await CowModel.countDocuments({ price: { $lt: filtersData.minPrice } });

        return {
            meta: {
                page,
                limit,
                total
            },
            data: result
        }
    }

    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {}


    const result = await CowModel.find(whereConditions)
        .populate('seller')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await CowModel.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

const getSingleCowModel = async (id: string): Promise<ICowModel | null> => {
    const result = await CowModel.findById(id).populate('seller');
    return result;
}

const updateCowModel = async (
    id: string,
    payload: Partial<ICowModel>
): Promise<ICowModel | null> => {
    const result = await CowModel.findOneAndUpdate({ _id: id }, payload, { new: true }).populate('seller');
    return result;
}

const deleteCowModel = async (id: string): Promise<ICowModel | null> => {
    const result = await CowModel.findByIdAndDelete(id).populate('seller');
    return result;
}

export const CowModelService = {
    createCowModel,
    getAllCowModels,
    getSingleCowModel,
    updateCowModel,
    deleteCowModel
}