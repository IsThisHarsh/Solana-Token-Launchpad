import * as z from "zod"

export const liquidityFormSchema = z.object({
  tokenMintAddress: z
    .string()
    .min(32, "Invalid token mint address")
    .max(44, "Invalid token mint address"),
  amount: z
    .number()
    .positive("Amount must be greater than 0"),
  solAmount: z
    .number()
    .positive("SOL amount must be greater than 0"),
})


