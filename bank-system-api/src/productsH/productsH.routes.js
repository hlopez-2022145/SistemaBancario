'use strict'

import { Router } from "express"
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js'
import { getByIdProductH, getProductH } from './productsH.controller.js'

const api = Router()

api.get('/get/:id', [validateToken, validateRoleAdmin], getProductH);
api.get('/getById/:id', [validateToken, validateRoleAdmin], getByIdProductH);

export default api