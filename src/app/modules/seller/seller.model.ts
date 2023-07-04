import { Schema, model } from "mongoose";
import { ISeller, SellerModel } from "./seller.interface";

export const sellerSchema = new Schema<ISeller, SellerModel>({
    income: {
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

export const Seller = model<ISeller, SellerModel>('Seller', sellerSchema);