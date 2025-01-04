import {motion} from "framer-motion"
import AirdropForm from "@/components/airdrop/AirdropForm"

export default function Airdrop() {
    return (
        <div className="container h-[95vh] flex justify-center items-center">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="max-w-xl mx-auto flex-1"
            >
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold mb-4">Airdrop SOL</h1>
                    <p className="text-muted-foreground">
                        Request test SOL to be airdropped to any wallet address
                    </p>
                </div>

                <div className="bg-card rounded-lg border p-6">
                    <AirdropForm/>
                </div>
            </motion.div>
        </div>
    )
}