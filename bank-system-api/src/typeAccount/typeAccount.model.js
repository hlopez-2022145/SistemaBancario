'use strict'

import { Schema, model } from "mongoose"

const typeAccountSchema = Schema({
    name: {
        type: String
    }
}, {
    versionKey: false
})

export default model('TypeAccount', typeAccountSchema);
