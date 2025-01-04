import {motion} from 'framer-motion';
import {ArrowRight, Coins, Zap, RefreshCw} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';

export default function Home() {
    const features = [
        {
            icon: <Coins className="h-6 w-6"/>,
            title: 'Token Creation',
            description: 'Create your own Solana tokens with custom parameters and settings.',
        },
        {
            icon: <Zap className="h-6 w-6"/>,
            title: 'Quick Airdrop',
            description: 'Easily airdrop test SOL to any wallet address for development.',
        },
        {
            icon: <RefreshCw className="h-6 w-6"/>,
            title: 'Liquidity Management',
            description: 'Manage token liquidity and swaps with an intuitive interface.',
        },
    ];

    const steps = [
        {
            number: '01',
            title: 'Connect Your Wallet',
            description: 'Start by connecting your Solana wallet to access all features.',
        },
        {
            number: '02',
            title: 'Choose Your Tool',
            description: "Select from our suite of tools based on your needs.",
        },
        {
            number: '03',
            title: 'Execute Operations',
            description: 'Follow the guided process to complete your desired operation.',
        },
    ];

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden h-[95vh] flex justify-center items-center">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Powerful Solana Token Launchpad
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Create tokens, manage airdrops, and handle liquidity with our comprehensive toolkit.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg">
                                <Link to="/create-token">
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                    const element = document.querySelector('#features');
                                    if (element) {
                                        element.scrollIntoView({behavior: 'smooth'});
                                    }
                                }}
                            >
                                Learn More
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-muted/50 h-[95vh] flex justify-center items-center" id="features">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Offerings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: index * 0.2}}
                                className="bg-background p-6 rounded-lg shadow-sm"
                            >
                                <div className="mb-4 text-primary">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-20 h-[95vh] flex justify-center items-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Steps to Use the App</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: index * 0.2}}
                                className="relative"
                            >
                                <div className="text-4xl font-bold text-primary/20 mb-4">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}