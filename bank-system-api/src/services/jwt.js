'use strict'

import jwt from 'jsonwebtoken';

export const createToken = (user) => {
    try {
        let payload = {
            _id: user._id,
            name: user.name,
            username: user.username,
            DPI: user.DPI,
            address: user.address,
            phone: user.phone,
            email: user.email,
            workname: user.workname,
            balance: user.balance,
            role: user.role,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 120)
        }
        return jwt.sign(payload, process.env.SECRET_KEY);
    } catch (e) {
        console.error(e);
        return e;
    }
}