'use strict'

import { Schema, model } from "mongoose"

const historyTransferModel = Schema({
    transfer: {
        type: Schema.ObjectId,
        ref: 'Transfer'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
})

export default model('HistoryTransfer', historyTransferModel);