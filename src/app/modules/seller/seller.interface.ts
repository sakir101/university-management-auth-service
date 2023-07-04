import { Model } from "mongoose";

export type ISeller = {
    income: number;
}

export type SellerModel = Model<ISeller, Record<string, unknown>>

