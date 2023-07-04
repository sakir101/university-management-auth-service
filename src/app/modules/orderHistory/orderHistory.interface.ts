import { Model, Types } from "mongoose";
import { ICowModel } from "../cowModel/cowModel.interface";
import { IBuyer } from "../buyer/buyer.interface";

export type IOrderHistory = {
    cowModel: Types.ObjectId | ICowModel;
    buyer: Types.ObjectId | IBuyer;
}

export type OrderHistoryModel = Model<IOrderHistory, Record<string, unknown>>