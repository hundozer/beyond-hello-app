import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSignups, addSignup, clearSignups } from './_storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Setup CORS headers for ease of deployment
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const list = await getSignups();
      return res.status(200).json({
        success: true,
        count: 417 + list.length,
        signups: list,
      });
    }

    if (req.method === 'POST') {
      // Check if body is a string (some clients send text/plain)
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { name, email, ageRange, gender, lookingFor, city } = body;

      // Validation check
      if (!name || !name.trim()) {
        return res.status(400).json({ success: false, error: 'First name is required.' });
      }
      if (!email || !email.trim() || !email.includes('@')) {
        return res.status(400).json({ success: false, error: 'A valid email is required.' });
      }
      if (!ageRange) {
        return res.status(400).json({ success: false, error: 'Age range is required.' });
      }
      if (!gender) {
        return res.status(400).json({ success: false, error: 'Gender identification is required.' });
      }
      if (!lookingFor) {
        return res.status(400).json({ success: false, error: 'Primary social interest is required.' });
      }
      if (!city || !city.trim()) {
        return res.status(400).json({ success: false, error: 'City is required.' });
      }

      const { signup, ticketNum } = await addSignup({
        name,
        email,
        ageRange,
        gender,
        lookingFor,
        city,
      });

      return res.status(200).json({
        success: true,
        signup,
        ticketNum,
      });
    }

    if (req.method === 'DELETE') {
      const adminKey = process.env.ADMIN_API_KEY;
      const clientKey = req.headers['x-admin-key'] || req.query.adminKey;

      if (!adminKey) {
        // If not configured, reject DELETE requests in production to prevent database wipes
        if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
          return res.status(403).json({ 
            success: false, 
            error: 'DELETE method is disabled in production unless ADMIN_API_KEY is set in Vercel.' 
          });
        }
      } else if (clientKey !== adminKey) {
        return res.status(401).json({ success: false, error: 'Unauthorized: Invalid admin key.' });
      }

      await clearSignups();
      return res.status(200).json({ success: true, message: 'All registrations cleared.' });
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('API Handler Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
}
