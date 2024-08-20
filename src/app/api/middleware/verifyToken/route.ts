import { NextApiRequest, NextApiResponse } from 'next';
import verifyJWT from '@/app/middleware/verifyJWT';

interface CustomNextApiRequest extends NextApiRequest {
  user: any; // Replace 'any' with the actual type of 'user'
}

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'Token is valid', user: req.user });
};

export default verifyJWT(handler);