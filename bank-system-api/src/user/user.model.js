'use strict'

import { Schema, model } from "mongoose"

const userSchemma = Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    DPI: {
        type: String,
        maxLength: 13
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    workname: {
        type: String
    },
    balance: {
        type: Number
    },
    role: {
        type: String,
        uppercase: true
    }
}, {
    versionKey: false
})

export default model('User', userSchemma);
