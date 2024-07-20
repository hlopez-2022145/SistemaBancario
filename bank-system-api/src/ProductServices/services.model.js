'use strict'

import  { Schema, model } from "mongoose"

const servicesSchema = Schema({
    name: {
        type: String
    },
    price: {
        type: String
    }
}, {
    versionKey: false
})

export default model('Service', servicesSchema)