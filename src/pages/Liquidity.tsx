import {motion} from "framer-motion"
import LiquidityForm from "@/components/liquidity/LiquidityForm"

export default function Liquidity() {
    return (
        <div className="container px-4 h-[95vh] flex justify-center items-center">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="max-w-2xl mx-auto flex-1"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">Add Liquidity</h1>
                    <p className="text-muted-foreground">
                        Provide liquidity by pairing SOL with your token
                    </p>
                </div>

                <div className="bg-card rounded-lg border p-6">
                    <LiquidityForm/>
                </div>
            </motion.div>
        </div>
    )
}