'use strict'

import { Schema, model } from "mongoose"

const ProductsHModel = Schema({
    product: {
        type: Schema.ObjectId,
        ref: 'ShopProduct'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
})

export default model('ProductsH', ProductsHModel);