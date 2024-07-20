'use strict'

import { Schema, model } from "mongoose"

const productSchemma = Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    }
}, {
    versionKey: false
})

export default model('Product', productSchemma);