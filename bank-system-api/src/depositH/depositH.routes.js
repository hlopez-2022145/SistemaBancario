'use strict'

import { Router } from "express";
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js';
import { getByIdDepositH, getDepositH } from "./depositH.controller.js";

const api = Router()

api.get('/get/:id', [validateToken, validateRoleAdmin], getDepositH);
api.get('/getById', [validateToken, validateRoleAdmin], getByIdDepositH);

export default api