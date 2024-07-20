'use strict'

import { Router } from "express"
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js'
import { addTypeA, deleteTypeA, getByIdTypeA, getTypeA, updateTypeA } from './typeAccount.controller.js'

const api = Router()

api.post('/add', [validateToken, validateRoleAdmin], addTypeA);
api.put('/update/:id', [validateToken, validateRoleAdmin], updateTypeA);
api.delete('/delete/:id', [validateToken, validateRoleAdmin], deleteTypeA);
api.get('/get', [validateToken, validateRoleAdmin], getTypeA);
api.get('/getById/:id', [validateToken, validateRoleAdmin], getByIdTypeA);

export default api