import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface CustomNextApiRequest extends NextApiRequest {
  user?: any;
}

const verifyJWT = (handler:any) => async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    req.user = decoded;
    return handler(req, res);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid access token' });
  }
};

export default verifyJWT;