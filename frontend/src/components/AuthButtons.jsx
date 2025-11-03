import { useAuth0 } from '@auth0/auth0-react';

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const returnUrl = 'https://mern-exercise-tracker-topaz.vercel.app';

  return isAuthenticated ? (
    <button onClick={() => logout({ returnTo: returnUrl })}>
      Log Out
    </button>
  ) : (
    <button onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

export default AuthButtons;
