'use strict'

import { Schema, model } from "mongoose"

const depositHModel = Schema({
    deposit: {
        type: Schema.ObjectId,
        ref: 'Deposit'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
})

export default model('depositH', depositHModel);