import { Model } from "mongoose";

export type IBuyer = {
    budget: number;
}

export type BuyerModel = Model<IBuyer, Record<string, unknown>>

