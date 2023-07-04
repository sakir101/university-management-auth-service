import { Schema, model } from "mongoose";
import { BuyerModel, IBuyer } from "./buyer.interface";

export const buyerSchema = new Schema<IBuyer, BuyerModel>({
    budget: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
)

export const Buyer = model<IBuyer, BuyerModel>('Buyer', buyerSchema);