import 'dotenv/config';

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set. Add it to server/.env (see server/.env.example).');
}

export const JWT_SECRET = process.env.JWT_SECRET;
