import { Routes, Route } from 'react-router-dom';
import Liquidity from "@/pages/Liquidity.tsx";
import TokenCreation from "@/pages/TokenCreation.tsx";
import Airdrop from "@/pages/Airdrop.tsx";
import Home from "@/pages/Home.tsx";
import Layout from "@/components/Layout";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="create-token" element={<TokenCreation />} />
                <Route path="airdrop" element={<Airdrop />} />
                <Route path="liquidity" element={<Liquidity />} />
            </Route>
        </Routes>
    );
}
