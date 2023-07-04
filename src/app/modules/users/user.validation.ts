import { z } from "zod";




const createBuyerZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string({
            required_error: 'Phone number is required'
        }),
        password: z.string().optional(),

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

        address: z.string({
            required_error: 'Address is required'
        }),

        buyer: z.object({
            budget: z.number({
                required_error: 'Budget is required'
            })
        })
    })
})

const createSellerZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string({
            required_error: 'Phone number is required'
        }),
        password: z.string().optional(),

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

        address: z.string({
            required_error: 'Address is required'
        }),

        seller: z.object({
            income: z.number({
                required_error: 'Income is required'
            })
        })
    })
})

const updateUserZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string().optional(),
        password: z.string().optional(),
        name: z.object({
            firstName: z.string().optional(),
            middleName: z.string().optional(),
            lastName: z.string().optional(),
        }).optional(),
        address: z.string().optional(),
        buyer: z.object({
            budget: z.number().optional(),
        }).optional(),
        seller: z.object({
            income: z.number().optional(),
        }).optional(),
    }).optional(),
});



export const UserValidation = {
    createBuyerZodSchema,
    createSellerZodSchema,
    updateUserZodSchema
}

