import * as z from "zod"

export const tokenFormSchema = z.object({
    name: z.string().nonempty().min(1, "Token name is required"),
    symbol: z.string().nonempty().min(1, "Token symbol is required").max(10, "Symbol must be 10 characters or less"),
    decimals: z.number()
        .min(0)
        .max(9)
        .refine((val) => val !== undefined && val !== null, "Decimals are required"),
    supply: z.number()
        .positive("Supply must be greater than 0")
        .refine((val) => val !== undefined && val !== null, "Supply is required"),
    image: z.string()
        .url("Must be a valid URL")
        .nonempty()
        .refine(
            (url) => /\.(jpg|jpeg|png)$/i.test(url),
            "Image URL must end with .jpg, .jpeg, or .png"
        ),
    description: z.string().optional(),
    revokeMint: z.boolean().default(false),
    revokeFreeze: z.boolean().default(false),
    revokeUpdate: z.boolean().default(false),
})

export type TokenFormValues = z.infer<typeof tokenFormSchema>