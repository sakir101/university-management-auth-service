import { z } from "zod";
import { bloodGroup, gender } from "../student/student.constant";
import { designation, facultyBloodGroup, facultyGender } from "../faculty/faculty.constant";



const createUserZodSchema = z.object({
    body: z.object({
        password: z.string().optional(),
        student: z.object({
            name: z.object({
                firstName: z.string({
                    required_error: 'First Name is required'
                }),
                middleName: z.string({
                    required_error: 'Middle Name is required'
                }).optional(),
                lastName: z.string({
                    required_error: 'Last Name is required'
                }),
            }),

            dateOfBirth: z.string({
                required_error: 'Date of birth is required'
            }),

            gender: z.enum([...gender] as [string, ...string[]], {
                required_error: 'Gender is required'
            }),

            bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
                required_error: 'Blood group is required'
            }).optional(),

            email: z.string({
                required_error: 'Email is required'
            }).email(),

            contactNo: z.string({
                required_error: 'Contact number is required'
            }),
            emergencyContactNo: z.string({
                required_error: 'Emergency contact number is required'
            }),

            presentAddress: z.string({
                required_error: 'Present Address is required'
            }),

            permanentAddress: z.string({
                required_error: 'Permanent address is required'
            }),

            guardian: z.object({
                fatherName: z.string({
                    required_error: 'Father name is required'
                }),

                fatherOccupation: z.string({
                    required_error: 'Father occupation is required'
                }),

                fatherContactNo: z.string({
                    required_error: 'Father contact No. is required'
                }),

                motherName: z.string({
                    required_error: 'mother name is required'
                }),
                motherOccupation: z.string({
                    required_error: 'mother Occupation is required'
                }),
                motherContactNo: z.string({
                    required_error: 'Mother Contact No. is required'
                }),
                address: z.string({
                    required_error: 'Address is required'
                }),
            }),

            localGuardian: z.object({
                name: z.string({
                    required_error: "Local guardian name is required"
                }),
                occupation: z.string({
                    required_error: "Local guardian occupation is required"
                }),
                contactNo: z.string({
                    required_error: "Local guardian contact No. is required"
                }),
                address: z.string({
                    required_error: "Local guardian address is required"
                }),
            }),

            profileImage: z.string().optional(),

            academicFaculty: z.string({
                required_error: 'Academic Faculty is required'
            }),
            academicDepartment: z.string({
                required_error: 'Academic Department is required'
            }),
            academicSemester: z.string({
                required_error: 'Academic semester is required'
            }),

        }),
    }),
})

const createFacultyZodSchema = z.object({
    body: z.object({
        password: z.string().optional(),
        faculty: z.object({
            name: z.object({
                firstName: z.string({
                    required_error: 'First Name is required'
                }),
                middleName: z.string({
                    required_error: 'Middle Name is required'
                }).optional(),
                lastName: z.string({
                    required_error: 'Last Name is required'
                }),
            }),

            gender: z.enum([...facultyGender] as [string, ...string[]], {
                required_error: 'Gender is required'
            }),

            dateOfBirth: z.string({
                required_error: 'Date of birth is required'
            }),

            email: z.string({
                required_error: 'Email is required'
            }).email(),

            contactNo: z.string({
                required_error: 'Contact number is required'
            }),
            emergencyContactNo: z.string({
                required_error: 'Emergency contact number is required'
            }),

            presentAddress: z.string({
                required_error: 'Present Address is required'
            }),

            permanentAddress: z.string({
                required_error: 'Permanent address is required'
            }),

            bloodGroup: z.enum([...facultyBloodGroup] as [string, ...string[]], {
                required_error: 'Blood group is required'
            }).optional(),

            designation: z.enum([...designation] as [string, ...string[]], {
                required_error: 'Designation is required'
            }),

            academicFaculty: z.string({
                required_error: 'Academic Faculty is required'
            }),

            academicDepartment: z.string({
                required_error: 'Academic Department is required'
            }),
        }),
    }),
})

const createAdminZodSchema = z.object({
    body: z.object({
        password: z.string().optional(),

        admin: z.object({
            name: z.object({
                firstName: z.string({
                    required_error: 'First name is required',
                }),
                lastName: z.string({
                    required_error: 'Last name is required',
                }),
                middleName: z.string().optional(),
            }),

            dateOfBirth: z.string({
                required_error: 'Date of birth is required',
            }),

            gender: z.string({
                required_error: 'Gender is required',
            }),

            bloodGroup: z.string({
                required_error: 'Blood group is required',
            }),

            email: z
                .string({
                    required_error: 'Email is required',
                })
                .email(),

            contactNo: z.string({
                required_error: 'Contact number is required',
            }),

            emergencyContactNo: z.string({
                required_error: 'Emergency contact number is required',
            }),

            presentAddress: z.string({
                required_error: 'Present address is required',
            }),

            permanentAddress: z.string({
                required_error: 'Permanent address is required',
            }),

            managementDepartment: z.string({
                required_error: 'Management department is required',
            }),

            designation: z.string({
                required_error: 'Designation is required',
            }),

            profileImage: z.string().optional(),
        }),
    }),
});

export const UserValidation = {
    createUserZodSchema,
    createFacultyZodSchema,
    createAdminZodSchema
}

