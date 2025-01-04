import {motion} from "framer-motion"
import TokenForm from "@/components/token/TokenForm"

export default function TokenCreation() {
    return (
        <div className="container mx-auto px-4 flex justify-center items-center py-14">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="max-w-3xl mx-auto flex-1"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">Create Your Token</h1>
                    <p className="text-muted-foreground">
                        Fill in the details below to create your custom Solana token
                    </p>
                </div>
                <div className="bg-card rounded-lg border py-6 px-10">
                    <TokenForm/>
                </div>
            </motion.div>
        </div>
    )
}