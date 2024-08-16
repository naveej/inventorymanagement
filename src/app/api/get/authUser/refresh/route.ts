import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import AuthUser from '@/models/AuthModel';
import dotenv from 'dotenv';
import { connectDB } from '@/lib/database';
dotenv.config();

export async function GET(request: Request) {
    const cookies = request.headers.get('cookie');
    if (!cookies) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const refreshToken = cookies.split('; ').find(row => row.startsWith('refreshToken='))?.split('=')[1];
    if (!refreshToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    try {
        const foundUser = await AuthUser.findOne({ refreshToken });
        if (!foundUser) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

        return new Promise((resolve) => {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, decoded: any) => {
                if (err || foundUser.email !== decoded.email) {
                    resolve(NextResponse.json({ error: 'Forbidden' }, { status: 403 }));
                } else {
                    const accessToken = jwt.sign({ userId: foundUser._id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1h' });
                    resolve(NextResponse.json({ accessToken }));
                }
            });
        });
    } catch (error) {
        console.error('Error during token refresh:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}