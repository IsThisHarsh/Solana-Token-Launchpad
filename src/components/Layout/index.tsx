import Header from './Header';
import Footer from './Footer';
import {Outlet} from "react-router-dom";
import {ThemeProvider} from "@/components/theme/ThemeProvider.tsx";

export default function Layout() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="solana-tools-theme">
            <div className="min-h-screen flex flex-col">
                <Header/>
                <main className="flex-1 py-16">
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </ThemeProvider>
    );
}