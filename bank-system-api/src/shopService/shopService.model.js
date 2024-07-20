'use strict'

import { Schema, model } from "mongoose"

const shopServiceSchemma = Schema({
    service: {
        type: Schema.ObjectId,
        ref: 'Service'
    },
    account: {
        type: Number,
        ref: 'Account'
    }
}, {
    versionKey: false
})

export default model('ShopService', shopServiceSchemma)