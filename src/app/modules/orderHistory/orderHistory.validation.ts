import { z } from "zod";

const createOrderHistoryZodSchema = z.object({
    body: z.object({
        cowModel: z.string({
            required_error: 'Cow model is required'
        }),
        buyer: z.string({
            required_error: 'Buyer is required'
        }),
    })
})

export const OrderHistoryValidation = {
    createOrderHistoryZodSchema
}
