import { Schema, model } from "mongoose";
import { IOrderHistory, OrderHistoryModel } from "./orderHistory.interface";


export const orderHistorySchema = new Schema<IOrderHistory, OrderHistoryModel>({
    cowModel: {
        type: Schema.Types.ObjectId,
        ref: 'CowModel',
        required: true
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'Buyer',
        required: true
    },
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
)

export const OrderHistory = model<IOrderHistory, OrderHistoryModel>('OrderHistory', orderHistorySchema);