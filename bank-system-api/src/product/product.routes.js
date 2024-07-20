'use strict'

import { Router } from "express"
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js'
import { addProduct, deleteProduct, getByIdProduct, getProduct, updateP } from './product.controller.js'

const api = Router()

api.post('/add', [validateToken, validateRoleAdmin], addProduct);
api.put('/update/:id', [validateToken, validateRoleAdmin], updateP);
api.delete('/delete/:id', [validateToken, validateRoleAdmin], deleteProduct);
api.get('/get', [validateToken], getProduct);
api.get('/getById/:id', [validateToken, validateRoleAdmin], getByIdProduct);

export default api