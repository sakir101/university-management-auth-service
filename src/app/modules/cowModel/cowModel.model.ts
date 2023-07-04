import { Schema, model } from "mongoose";
import { CowModelModel, ICowModel } from "./cowModel.interface";
import { cowModelBreed, cowModelCategory, cowModelLabel, cowModelLocation } from "./cowModel.constant";

const cowModelSchema = new Schema<ICowModel>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: cowModelLocation
    },
    breed: {
        type: String,
        required: true,
        enum: cowModelBreed
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: cowModelLabel
    },
    category: {
        type: String,
        required: true,
        enum: cowModelCategory
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    }

},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
)

export const CowModel = model<ICowModel, CowModelModel>('CowModel', cowModelSchema);