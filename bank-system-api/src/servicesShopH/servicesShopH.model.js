'use strict'

import { Schema, model } from "mongoose"

const ServicesShopHModel = Schema({
    service: {
        type: Schema.ObjectId,
        ref: 'ShopService'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
})

export default model('ServicesH', ServicesShopHModel);