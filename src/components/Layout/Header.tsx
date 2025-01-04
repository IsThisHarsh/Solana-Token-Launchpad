import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {Menu, X} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import {ThemeToggle} from '@/components/theme/ThemeToggle';
import {WalletButton} from "@/components/common/wallet-button.tsx";
import {NetworkBadge} from "@/components/common/network-badge.tsx";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleWalletConnection = () => {
        setIsConnected(!isConnected);
        // TODO: Implement actual wallet connection logic
    };

    const menuItems = [
        {path: '/create-token', label: 'Create Token'},
        {path: '/airdrop', label: 'Airdrop'},
        {path: '/liquidity', label: 'Liquidity'},
    ];

    return (
        <header className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b">
            <div className="container mx-auto px-4 py-2">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="text-xl font-bold">
                        Solana Tools
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="text-md font-medium hover:text-primary transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <NetworkBadge/>
                        <ThemeToggle/>
                        <WalletButton/>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle/>
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md hover:bg-accent"
                        >
                            {isOpen ? <X size={24}/> : <Menu size={24}/>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        className="md:hidden border-t"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="block text-md font-medium hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Button
                                onClick={handleWalletConnection}
                                variant={isConnected ? "destructive" : "default"}
                                className="w-full"
                            >
                                {isConnected ? "Disconnect Wallet" : "Connect Wallet"}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}