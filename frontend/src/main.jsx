import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

const container = document.getElementById('root');
const root = createRoot(container);

const Root = () => {
  const redirectUri = window.location.origin;

  if (!domain || !clientId) {
    return (
      <div>
        Missing Auth0 configuration.  
        Check your Vercel environment variables.
      </div>
    );
  }

  return (
    <StrictMode>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: redirectUri,
          ...(audience && { audience }) 
        }}
      >
        <App />
      </Auth0Provider>
    </StrictMode>
  );
};

root.render(<Root />);