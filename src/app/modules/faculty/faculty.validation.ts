import { z } from "zod"
import { designation, facultyBloodGroup, facultyGender } from "./faculty.constant";



const facultyUpdateZodSchema = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string().optional(),
            middleName: z.string().optional(),
            lastName: z.string().optional(),
        }),
        gender: z.enum([...facultyGender] as [string, ...string[]]).optional(),

        dateOfBirth: z.string().optional(),

        email: z.string().email().optional(),

        contactNo: z.string().optional(),

        emergencyContactNo: z.string().optional(),

        presentAddress: z.string().optional(),

        permanentAddress: z.string().optional(),

        bloodGroup: z.enum([...facultyBloodGroup] as [string, ...string[]]).optional(),

        designation: z.enum([...designation] as [string, ...string[]]).optional(),

        academicFaculty: z.string().optional(),

        academicDepartment: z.string().optional(),
    }),
});

export const facultyValidation = {
    facultyUpdateZodSchema
}
