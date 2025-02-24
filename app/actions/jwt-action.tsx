'use server'
import jwt from 'jsonwebtoken';
const SECRET_KEY: string = process.env.SECRET_KEY || '';

export const isTokenExpired = async (token: string) => {
    try {
        const { exp } = jwt.decode(token) as {
            exp: number;
        };
        const expirationDatetimeInSeconds = exp * 1000;

        return Date.now() >= expirationDatetimeInSeconds;
    } catch {
        return true;
    }
}

export const decodeToken = async (token: string) => {
    const decode = jwt.verify(token,SECRET_KEY);
    return decode;
}

export const signToken = async (payload:any) => {
    const token = jwt.sign({payload: payload}, SECRET_KEY,{
        expiresIn: 3600,
        issuer:"tanasat.s@msu.ac.th",
    });
    return token;
}

// --- 
// const { authorization } = ctx.req.headers
// const token = authorization.replace('Bearer ', '')
// const decoded = jwt.verify(token, 'APP_SECRET')
// const userId = (decoded as any).userId