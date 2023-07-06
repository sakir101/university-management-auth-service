import { Model, Types } from "mongoose";
import { IAcademicDepartment } from "../academicDepartment/academicDepartement.interface";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type IFaculty = {
    id: string;
    name: UserName;
    gender: 'male' | 'female';
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    designation: 'professor' | 'lecturer'
    academicDepartment: Types.ObjectId | IAcademicDepartment;
    academicFaculty: Types.ObjectId | IAcademicFaculty;
}

export type FacultyModel = Model<IFaculty, Record<string, unknown>>

export type IFacultiesFilters = {
    searchTerm?: string;
}

