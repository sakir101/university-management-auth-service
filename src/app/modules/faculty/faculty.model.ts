import { Schema, model } from "mongoose";
import { FacultyModel, IFaculty } from "./faculty.interface";
import { designation, facultyBloodGroup, facultyGender } from "./faculty.constant";


export const facultySchema = new Schema<IFaculty, FacultyModel>({
    id: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: {
            firstName: {
                type: String,
                required: true,
                unique: true
            },
            middleName: {
                type: String
            },
            lastName: {
                type: String,
                required: true,
                unique: true
            }

        }
    },

    gender: {
        type: String,
        enum: facultyGender
    },

    dateOfBirth: {
        type: String
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    contactNo: {
        type: String,
        unique: true,
        required: true
    },
    emergencyContactNo: {
        type: String,
        required: true
    },
    presentAddress: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },

    bloodGroup: {
        type: String,
        enum: facultyBloodGroup
    },

    designation: {
        type: String,
        required: true,
        enum: designation
    },

    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true
    },

    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
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

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema);