'use strict'

import { Schema, model } from "mongoose"

const productSSchema = Schema({
    product: {
        type: Schema.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    },
    account: {
        type: Number,
        ref: 'Account'
    }
}, {
    versionKey: false
})

export default model('ProductoS', productSSchema)