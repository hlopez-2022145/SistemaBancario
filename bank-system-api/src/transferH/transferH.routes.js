'use strict'

import { Router } from "express";
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js';
import { getAllTransferH, getByIdTransferH, getTransferH } from "./transferH.controller.js";

const api = Router();

api.get('/get/:id', [validateToken, validateRoleAdmin], getTransferH);
api.get('/getById', [validateToken, validateRoleAdmin], getByIdTransferH);
api.get('/getAll/:id', [validateToken, validateRoleAdmin], getAllTransferH);

export default api