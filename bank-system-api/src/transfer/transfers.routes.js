'use strict'


import { Router } from "express";
import { validateToken } from '../../middlewares/validateToken.js';
import { createTransfer, getTransferById, getTransfers, updateTransfer } from './transfer.controller.js';

const api = Router();

api.post('/add', [validateToken], createTransfer);
api.put('/update/:id', [validateToken], updateTransfer);
api.get('/get', [validateToken], getTransfers);
api.get('/getById', [validateToken], getTransferById);

export default api