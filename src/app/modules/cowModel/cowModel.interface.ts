import { Model, Types } from "mongoose"
import { ISeller } from "../seller/seller.interface"

export type ICowModelLocation =
    | "Dhaka"
    | "Chattogram"
    | "Barishal"
    | "Rajshahi"
    | "Sylhet"
    | "Comilla"
    | "Rangpur"
    | "Mymensingh"

export type ICowModelBreed =
    | "Brahman"
    | "Nellore"
    | "Sahiwal"
    | "Gir"
    | "Indigenous"
    | "Tharparkar"
    | "Kankrej"

export type ICowModelLabel =
    | "for sale"
    | "sold out"

export type ICowModelCategory =
    | "Dairy"
    | "Beef"
    | "Dual Purpose"

export type ICowModel = {
    name: string;
    age: number;
    price: number;
    location: ICowModelLocation;
    breed: ICowModelBreed;
    weight: number;
    label: ICowModelLabel;
    category: ICowModelCategory;
    seller: Types.ObjectId | ISeller
}

export type CowModelModel = Model<ICowModel, Record<string, unknown>>

export type ICowModelsFilters = {
    searchTerm: string;

}

