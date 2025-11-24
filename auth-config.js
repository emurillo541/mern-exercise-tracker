export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!process.env.VITE_AUTH0_DOMAIN || !process.env.VITE_AUTH0_CLIENT_ID) {
    console.error('Auth0 secrets missing in Vercel environment.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  res.status(200).json({
    domain: process.env.VITE_AUTH0_DOMAIN,
    clientId: process.env.VITE_AUTH0_CLIENT_ID,
  });
}