    'use strict'

    import { Schema, model } from "mongoose"

    const depositSchema = Schema({
        accountReq: {
            type: Number,
            ref: 'Account',
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: String
        },
        hour: {
            type: String
        },
        reverse: {
            type: Number,
            default: 30
        }
    },
        {
            versionKey: false
        });

export default model('Deposit', depositSchema);