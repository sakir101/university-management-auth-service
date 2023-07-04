import { z } from "zod";
import { cowModelBreed, cowModelCategory, cowModelLabel } from "./cowModel.constant";

const createCowModelZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required"
        }),
        age: z.number({
            required_error: "Age is required"
        }),
        price: z.number({
            required_error: "Price is required"
        }),
        location: z.string({
            required_error: "Location is required"
        }),
        breed: z.enum([...cowModelBreed] as [string, ...string[]], {
            required_error: "Breed is required"
        }),
        weight: z.number({
            required_error: "Weight is required"
        }),
        label: z.enum([...cowModelLabel] as [string, ...string[]], {
            required_error: "Label is required"
        }),
        category: z.enum([...cowModelCategory] as [string, ...string[]], {
            required_error: "Category is required"
        }),
        seller: z.string({
            required_error: "Seller is required"
        })
    })
})

const updateCowModelZodSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        age: z.number().optional(),
        price: z.number().optional(),
        location: z.string().optional(),
        breed: z.enum([...cowModelBreed] as [string, ...string[]]).optional(),
        weight: z.number().optional(),
        label: z.enum([...cowModelLabel] as [string, ...string[]]).optional(),
        category: z.enum([...cowModelCategory] as [string, ...string[]]).optional(),
        seller: z.string().optional()
    }).optional()
});

export const CowModelValidation = {
    createCowModelZodSchema,
    updateCowModelZodSchema
}