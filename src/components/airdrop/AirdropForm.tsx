import {useState} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {motion} from "framer-motion"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {airdropFormSchema} from "@/lib/validations/airdrop"
import type {z} from "zod"
import {handleNumberInput} from "@/lib/validations/common.ts";
import {useAirdrop} from "@/hooks/use-airdrop.ts";
import {LoadingOverlay} from "@/components/common/loading-overlay.tsx";
import {TransactionStatus} from "@/components/common/transaction-status.tsx";

type FormData = z.infer<typeof airdropFormSchema>

export default function AirdropForm() {
    const {requestAirdrop, isAirdropping} = useAirdrop()
    const [txStatus, setTxStatus] = useState<{
        success?: boolean;
        signature?: string;
        error?: string;
    }>({})

    const form = useForm<FormData>({
        resolver: zodResolver(airdropFormSchema),
    })

    async function onSubmit(data: FormData) {
        try {
            const signature = await requestAirdrop(data.recipientAddress, data.amount)
            setTxStatus({success: true, signature})
            form.reset()
        } catch (error) {
            setTxStatus({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            })
        }
    }

    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="space-y-4 p-4"
                >
                    <div className="grid gap-2">
                        <Label htmlFor="recipientAddress" className="text-lg">Recipient Address</Label>
                        <Input
                            id="recipientAddress"
                            {...form.register("recipientAddress")}
                            className='py-6 text-lg'
                            placeholder="Enter Solana address"
                        />
                        {form.formState.errors.recipientAddress && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.recipientAddress.message}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="amount" className="text-lg">Amount (SOL)</Label>
                        <Input
                            id="amount"
                            type="text"
                            className='py-6 text-lg'
                            placeholder="Enter Amount (SOL)"
                            onChange={handleNumberInput("amount", form)}
                            value={form.watch("amount") || ""}
                        />
                        {form.formState.errors.amount && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.amount.message}
                            </p>
                        )}
                    </div>

                    <TransactionStatus {...txStatus} />

                    <Button type="submit" className="w-full py-6 text-lg" disabled={isAirdropping}>
                        {isAirdropping ? "Processing" : "Airdrop SOL"}
                    </Button>
                </motion.div>
            </form>
            <LoadingOverlay
                loading={isAirdropping}
                message="Processing airdrop..."
            />
        </>
    )
}