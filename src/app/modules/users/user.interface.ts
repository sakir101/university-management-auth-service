import { Model, Types } from "mongoose"
import { IBuyer } from "../buyer/buyer.interface";
import { ISeller } from "../seller/seller.interface";



export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string
  role: string
  password: string
  name: UserName
  address: string
  buyer?: Types.ObjectId | IBuyer
  seller?: Types.ObjectId | ISeller
}

export type UserModel = Model<IUser, Record<string, unknown>>

export type IUsersFilters = {
  searchTerm: string;
}
