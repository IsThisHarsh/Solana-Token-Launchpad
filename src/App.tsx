import {BrowserRouter as Router} from 'react-router-dom';
import {Toaster} from '@/components/ui/toaster';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import {wallets} from "@/lib/solana/wallet.ts";
import {CURRENT_ENDPOINT} from "@/lib/constants.ts";
import AppRoutes from "@/routes";

function App() {
    return (
        <ConnectionProvider endpoint={CURRENT_ENDPOINT}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <Toaster/>
                    <Router>
                        <AppRoutes/>
                    </Router>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;