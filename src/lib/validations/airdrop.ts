import * as z from "zod"

export const airdropFormSchema = z.object({
  recipientAddress: z
    .string()
    .min(32, "Invalid Solana address")
    .max(44, "Invalid Solana address"),
  amount: z
    .number()
    .min(0.000001, "Minimum amount is 0.000001 SOL")
    .max(2, "Maximum amount is 2 SOL"),
})