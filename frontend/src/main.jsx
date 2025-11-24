import { StrictMode, useState, useEffect } from 'react'; 
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL // <-- Reading this is correct

const container = document.getElementById('root');
const root = createRoot(container);

const Root = () => {
    const [authConfig, setAuthConfig] = useState(null);
    
    const redirectUri = window.location.origin;

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                // *** FIX: Use VITE_API_BASE_URL to create the absolute path ***
                const endpoint = `${VITE_API_BASE_URL}/auth-config`; 
                const response = await fetch(endpoint); 
                
                // You might need a more robust check for non-JSON responses here,
                // but this will resolve the 404/SyntaxError
                const config = await response.json();

                setAuthConfig(config);
            } catch (error) {
                console.error('Failed to fetch Auth0 configuration securely:', error);
            }
        };

        fetchConfig();
    }, []);

    if (!authConfig) {
        return <div>Loading authentication configuration...</div>;
    }

    return (
        <StrictMode>
            <Auth0Provider
                domain={authConfig.domain}
                clientId={authConfig.clientId}
                authorizationParams={{ 
                    audience: audience,
                    redirect_uri: redirectUri
                }}
            >
                <App />
            </Auth0Provider>
        </StrictMode>
    );
};

root.render(<Root />);