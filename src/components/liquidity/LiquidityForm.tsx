import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {motion} from "framer-motion"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useToast} from "@/hooks/use-toast"
import {liquidityFormSchema} from "@/lib/validations/liquidity"
import type {z} from "zod"
import {handleNumberInput} from "@/lib/validations/common.ts";

type FormData = z.infer<typeof liquidityFormSchema>

export default function LiquidityForm() {
    const {toast} = useToast()
    const form = useForm<FormData>({
        resolver: zodResolver(liquidityFormSchema),
    })

    async function onSubmit(data: FormData) {
        try {
            // TODO: Implement actual liquidity addition logic
            console.log("Adding liquidity:", data)

            toast({
                title: "Success!",
                description: "Liquidity added successfully",
            })

            form.reset()
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to add liquidity. Please try again.",
            })
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="space-y-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="solAmount" className='text-lg'>SOL</Label>
                        <Input
                            type="text"
                            id="solAmount"
                            className='py-6 text-lg'
                            onChange={handleNumberInput("solAmount", form)}
                            value={form.watch("solAmount") || ""}
                            placeholder="0.0"
                        />
                        {form.formState.errors.solAmount && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.solAmount.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tokenAmount" className='text-lg'>Token Amount</Label>
                        <Input
                            type="text"
                            id="tokenAmount"
                            className='py-6 text-lg'
                            onChange={handleNumberInput("amount", form)}
                            value={form.watch("amount") || ""}
                            placeholder="0.0"
                        />
                        {form.formState.errors.amount && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.amount.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="tokenMintAddress" className='text-lg'>Token Mint Address</Label>
                    <Input
                        id="tokenMintAddress"
                        {...form.register("tokenMintAddress")}
                        className='py-6 text-lg'
                        placeholder="Enter token mint address"
                    />
                    {form.formState.errors.tokenMintAddress && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.tokenMintAddress.message}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full py-6 text-lg">
                    Add Liquidity
                </Button>
            </motion.div>
        </form>
    )
}