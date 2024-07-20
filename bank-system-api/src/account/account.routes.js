'use strict'

import { Router } from "express";
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js';
import { addAccount, deleteAccount, getAccounts, getByIdAccount, getByUser, movementsHight, movementsUnder, updateAccount } from "./account.controller.js";

const api = Router();

api.post('/add', [validateToken, validateRoleAdmin], addAccount);
api.put('/update/:id', [validateToken, validateRoleAdmin], updateAccount);
api.delete('/delete/:id', [validateToken, validateRoleAdmin], deleteAccount);
api.get('/get', [validateToken, validateRoleAdmin], getAccounts);
api.get('/getById/:id', [validateToken, validateRoleAdmin], getByIdAccount);
api.get('/getMovementsHigh', [validateToken, validateRoleAdmin], movementsHight);
api.get('/getMovementsUnder', [validateToken, validateRoleAdmin], movementsUnder);
api.get('/getByUser/:id', [validateToken], getByUser);

export default api;