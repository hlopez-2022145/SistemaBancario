'use strict'

import { Schema, model } from "mongoose"

const favoriteSchema = Schema({
    owner: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    accountFav: {
        type: Number,
        ref: 'Account'
    },
    nickName: {
        type: String
    },
    dpi: {
        type: Number
    }
}, {
    versionKey: false
})

export default model('Favorite', favoriteSchema);