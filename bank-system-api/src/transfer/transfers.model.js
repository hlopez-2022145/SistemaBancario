'use strict'

import { Schema, model } from "mongoose"

const transferSchema = Schema({
    accountReq: {
        type: Number,
        ref: 'Account',
        required: true
    },
    accountSender: {
        type: Number,
        ref: 'Account',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
    },
    hour: {
        type: String
    },
    description: {
        type: String
    }
},
    {
        versionKey: false
    });

export default model('Transfer', transferSchema);