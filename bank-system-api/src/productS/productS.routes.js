'use strict'

import { Router } from "express"
import { validateToken } from '../../middlewares/validateToken.js'
import { buyProduct } from './productS.controller.js'


const api = Router()

api.post('/buyProduct', [validateToken], buyProduct);

export default api
