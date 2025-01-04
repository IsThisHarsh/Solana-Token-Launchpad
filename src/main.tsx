import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import {ErrorProvider} from "@/providers/error-provider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorProvider>
            <App/>
        </ErrorProvider>
    </StrictMode>
);