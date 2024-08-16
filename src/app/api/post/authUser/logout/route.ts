import { NextRequest, NextResponse } from 'next/server';
import AuthUser from '@/models/AuthModel';
import { connectDB } from '@/lib/database';

export async function POST(request: NextRequest) {
    const cookies = request.headers.get('cookie');
    if (!cookies) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const refreshToken = cookies.split('; ').find(row => row.startsWith('refreshToken='))?.split('=')[1];
    if (!refreshToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    try {
        const foundUser = await AuthUser.findOne({ refreshToken });
        if (!foundUser) {
            return clearCookieResponse();
        }

        await AuthUser.updateOne({ _id: foundUser._id }, { $unset: { refreshToken: "" } });
        
        return clearCookieResponse({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

function clearCookieResponse(body: object = {}) {
    const response = NextResponse.json(body, { status: body ? 200 : 204 });
    response.cookies.set('refreshToken', '', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: -1, // Expire the cookie immediately
    });
    return response;
}