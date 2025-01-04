import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {motion} from "framer-motion"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"
import {tokenFormSchema, type TokenFormValues} from "@/lib/validations/token"
import TokenSuccessModal from "./TokenSuccessModal"
import {useState} from "react"
import {TextField} from "@/components/ui/textfield.tsx";
import {handleNumberInput} from "@/lib/validations/common.ts";
import {useTokenCreation} from "@/hooks/use-token-creation.ts";
import {WalletRequired} from "@/components/common/wallet-required.tsx";
import {LoadingOverlay} from "@/components/common/loading-overlay.tsx";
import {TransactionStatus} from "@/components/common/transaction-status.tsx";
import {PublicKey} from "@solana/web3.js";

export default function TokenForm() {
    const {createToken, isCreating} = useTokenCreation()
    const [txStatus, setTxStatus] = useState<{
        success?: boolean;
        signature?: string;
        error?: string;
    }>({})

    const [showSuccessModal, setShowSuccessModal] = useState(true)
    const [tokenAddresses, setTokenAddresses] = useState<{
        associatedToken: PublicKey
        mint: PublicKey
    } | null>(null)

    const form = useForm<TokenFormValues>({
        resolver: zodResolver(tokenFormSchema),
        defaultValues: {
            revokeMint: false,
            revokeFreeze: false,
            revokeUpdate: false,
        },
    })

    async function onSubmit(data: TokenFormValues) {
        try {
            const signature = await createToken(data);
            if (signature) {
                const {associatedToken, mint} = signature;
                setTokenAddresses({associatedToken, mint})
                setTxStatus({success: true, signature: mint.toBase58()})
                setShowSuccessModal(true);
            }

            form.reset()
        } catch (error) {
            setTxStatus({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            })
        }
    }

    const handleSwitchChange = (field: "revokeMint" | "revokeFreeze" | "revokeUpdate") => (checked: boolean) => {
        form.setValue(field, checked, {shouldValidate: true});
    };

    return (
        <WalletRequired>
            <div className="max-w-3xl mx-auto">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="space-y-4"
                    >
                        <div className='flex items-center justify-between gap-4'>
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="name" className="text-lg">Token Name</Label>
                                <Input
                                    id="name"
                                    {...form.register("name")}
                                    placeholder="Enter token name"
                                    className='py-7 text-lg'
                                />
                                {form.formState.errors.name && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="symbol" className="text-lg">Symbol</Label>
                                <Input
                                    id="symbol"
                                    {...form.register("symbol")}
                                    className='py-7 text-lg'
                                    placeholder="Enter token symbol"
                                />
                                {form.formState.errors.symbol && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.symbol.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-4'>
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="decimals" className="text-lg">Decimals</Label>
                                <Input
                                    id="decimals"
                                    type="text"
                                    className='py-7 text-lg'
                                    placeholder='Enter decimals'
                                    onChange={handleNumberInput("decimals", form)}
                                    value={form.watch("decimals") || ""}
                                />
                                {form.formState.errors.decimals && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.decimals.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="supply" className="text-lg">Initial Supply</Label>
                                <Input
                                    id="supply"
                                    type="text"
                                    className='py-7 text-lg'
                                    onChange={handleNumberInput("supply", form)}
                                    value={form.watch("supply") || ""}
                                    placeholder="Enter initial supply"
                                />
                                {form.formState.errors.supply && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.supply.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-2 flex-1">
                            <Label htmlFor="image" className="text-lg">Image URL</Label>
                            <Input
                                id="image"
                                type="text"
                                className='py-7 text-lg'
                                {...form.register("image")}
                                placeholder="Enter Image URL"
                            />
                            {form.formState.errors.image && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.image.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description" className="text-lg">Description (Optional)</Label>
                            <TextField
                                id="description"
                                className='text-lg'
                                {...form.register("description")}
                                placeholder="Enter token description"
                            />
                        </div>

                        <div className="flex flex-wrap justify-between gap-4 py-4">
                            <div
                                className="flex flex-col items-center gap-4 border px-10 py-5 rounded-xl flex-1 shadow-lg">
                                <Label htmlFor="revokeMint" className="text-lg">Revoke&nbsp;Mint</Label>
                                <Switch
                                    id="revokeMint"
                                    className="h-10 w-[5rem]"
                                    checked={form.watch("revokeMint")}
                                    onCheckedChange={handleSwitchChange("revokeMint")}
                                />
                            </div>

                            <div
                                className="flex flex-col items-center gap-4 border px-10 py-5 rounded-xl flex-1 shadow-lg">
                                <Label htmlFor="revokeFreeze" className="text-lg">Revoke&nbsp;Freeze</Label>
                                <Switch
                                    id="revokeFreeze"
                                    className="h-10 w-[5rem]"
                                    checked={form.watch("revokeFreeze")}
                                    onCheckedChange={handleSwitchChange("revokeFreeze")}
                                />
                            </div>

                            <div
                                className="flex flex-col items-center gap-4 border px-10 py-5 rounded-xl flex-1 shadow-lg">
                                <Label htmlFor="revokeUpdate" className="text-lg">Revoke&nbsp;Update</Label>
                                <Switch
                                    id="revokeUpdate"
                                    className="h-10 w-[5rem]"
                                    checked={form.watch("revokeUpdate")}
                                    onCheckedChange={handleSwitchChange("revokeUpdate")}
                                />
                            </div>
                        </div>
                    </motion.div>

                    <TransactionStatus {...txStatus} token={true}/>

                    <Button type="submit" className="w-full py-6 text-lg">
                        Create&nbsp;Token
                    </Button>
                </form>

                {showSuccessModal && tokenAddresses && (
                    <TokenSuccessModal
                        open={showSuccessModal}
                        onClose={() => setShowSuccessModal(false)}
                        associateTokenAddress={tokenAddresses.associatedToken.toBase58()}
                        mintAddress={tokenAddresses.mint.toBase58()}
                    />
                )}

            </div>
            <LoadingOverlay
                loading={isCreating}
                message="Creating your token..."
            />
        </WalletRequired>
    )
}