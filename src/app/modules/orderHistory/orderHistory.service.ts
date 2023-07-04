import mongoose, { SortOrder } from "mongoose"
import { IOrderHistory } from "./orderHistory.interface"
import { OrderHistory } from "./orderHistory.model"
import ApiError from "../../../errors/ApiError"
import httpStatus from "http-status"
import { Buyer } from "../buyer/buyer.model"
import { CowModel } from "../cowModel/cowModel.model"
import { Seller } from "../seller/seller.model"
import { IPaginationOptions } from "../../../interfaces/pagination"
import { IGenericResponse } from "../../../interfaces/common"
import { paginationHelpers } from "../../../helpers/paginationHelper"

const createOrderHistory = async (
    orderHistory: IOrderHistory
): Promise<IOrderHistory | undefined> => {


    const buyerId: string = orderHistory.buyer as unknown as string;
    const cowModelId: string = orderHistory.cowModel as unknown as string;
    let newOrderHistoryAllData



    try {

        const buyerData = await Buyer.findById(buyerId).exec();
        const cowData = await CowModel.findById(cowModelId).exec()
        const sellerData = await Seller.findById(cowData?.seller).exec()
        if (buyerData === null || cowData === null || sellerData === null) {
            throw new Error("Data not found");

        } else {

            let budget: number = (buyerData?.budget) as unknown as number;
            let price: number = (cowData?.price) as unknown as number
            let income: number = (sellerData?.income) as unknown as number

            if (cowData.label === 'for sale') {
                if (budget >= price) {
                    const session = await mongoose.startSession()

                    try {
                        session.startTransaction()

                        let current: number = budget - price

                        Buyer.updateOne({ _id: buyerData?._id }, { budget: current })
                            .exec()
                            .then(result => {
                                console.log(result);

                            })
                            .catch(err => {
                                throw err
                                console.error(err);
                            });
                        let income2: number = parseInt(income as any) + parseInt(price as any)


                        Seller.updateOne({ _id: sellerData?._id }, { income: income2 })
                            .exec()
                            .then(result => {
                                console.log(result);

                            })
                            .catch(err => {
                                throw err
                                console.error(err);
                            });

                        CowModel.updateOne({ _id: cowModelId }, { label: 'sold out' })
                            .exec()
                            .then(result => {
                                console.log(result);

                            })
                            .catch(err => {
                                throw err
                            });



                        const newOrderHistory = await OrderHistory.create([orderHistory], { session });


                        if (!newOrderHistory.length) {
                            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order history')
                        }

                        newOrderHistoryAllData = newOrderHistory[0];

                        await session.commitTransaction();
                        await session.endSession();
                        console.log(newOrderHistoryAllData)

                    } catch (error) {
                        await session.abortTransaction();
                        await session.endSession()
                        throw error;
                    }
                }
                else {
                    throw new Error("Budget is too low");

                }
            }

            else {
                throw new Error("Cow is sold");

            }

        }
    } catch (err) {
        throw err;
    }

    return newOrderHistoryAllData
}

const getAllOrderHistories = async (
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrderHistory[]>> => {

    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortConditions) {
        sortConditions[sortBy] = sortOrder;
    }


    const result = await OrderHistory.find()
        .populate('cowModel')
        .populate('buyer')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await OrderHistory.countDocuments();

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}





export const OrderHistoryService = {
    createOrderHistory,
    getAllOrderHistories
}
