import { Schema, model } from "mongoose";
import { AcademicDepartmentModel, IAcademicDepartment } from "./academicDepartement.interface";

const academicDepartmentSchema = new Schema<IAcademicDepartment, AcademicDepartmentModel>(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },

        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
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

export const academicDepartment = model<IAcademicDepartment, AcademicDepartmentModel>('AcademicDepartment', academicDepartmentSchema)