import {Button} from "@/components/ui/button"
import {Copy} from "lucide-react"
import {useToast} from "@/hooks/use-toast"
import {motion} from "framer-motion"
import {useTheme} from "@/components/theme/ThemeProvider.tsx";

interface TokenSuccessModalProps {
    open: boolean
    onClose: () => void
    associateTokenAddress: string
    mintAddress: string
}

export default function TokenSuccessModal({
                                              open,
                                              onClose,
                                              associateTokenAddress,
                                              mintAddress,
                                          }: TokenSuccessModalProps) {
    const {toast} = useToast()
    const theme = useTheme();


    const copyToClipboard = async (text: string, label: string) => {
        try {
            await navigator.clipboard.writeText(text)
            toast({
                title: "Copied!",
                description: `${label} copied to clipboard`,
            })
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to copy to clipboard",
            })
        }
    }

    if (!open) return null

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        >
            <div
                className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
                <div className="flex flex-col space-y-4">
                    <h2 className="text-2xl font-semibold">Token Created Successfully!</h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Associate Token Address</label>
                            <div className="flex items-center space-x-2">
                                <code className="flex-1 rounded bg-muted px-2 py-1">
                                    {associateTokenAddress}
                                </code>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => copyToClipboard(associateTokenAddress, "Public address")}
                                >
                                    <Copy className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Mint Token Address</label>
                            <div className="flex items-center space-x-2">
                                <code className="flex-1 rounded bg-muted px-2 py-1">
                                    {mintAddress}
                                </code>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => copyToClipboard(mintAddress, "Mint address")}
                                >
                                    <Copy className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                        <a href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className={`text-xs text-primary hover:underline ${theme.theme === 'dark' ? 'text-green-800' : ''}`}
                        >
                            View Token on Explorer
                        </a>
                    </div>

                    <Button onClick={onClose}>Close</Button>
                </div>
            </div>
        </motion.div>
    )
}