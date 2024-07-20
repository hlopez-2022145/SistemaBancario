'use strict'

import { Router } from "express"
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js'
//import { deleteAccount, updateAccount } from "../account/account.controller.js"
import { createDeposit, deleteDeposit, getDepositById, getDeposits, updateDeposit } from './deposit.controller.js'

const api = Router()

api.post('/add', [validateToken, validateRoleAdmin], createDeposit);
api.put('/update/:id', [validateToken, validateRoleAdmin], updateDeposit);
api.get('/get', [validateToken, validateRoleAdmin], getDeposits);
api.get('/getById/:id', [validateToken, validateRoleAdmin], getDepositById);
api.delete('/delete/:id', [validateToken, validateRoleAdmin], deleteDeposit);

export default api