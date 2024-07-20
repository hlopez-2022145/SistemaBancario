'use strict'

import { Schema, model } from "mongoose"

const accountSchema = Schema({
    _id: {
        type: Number
    },
    balances: {
        type: Number,
        required: true,
        default: 0
    },
    typeAccount: {
        type: Schema.ObjectId,
        ref: 'TypeAccount',
        required: true
    },
    state: {
        type: String,
        required: true,
        default: 'Activa'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    dpi: {
        type: String
    },
    movements: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false
})

export default model('Account', accountSchema);