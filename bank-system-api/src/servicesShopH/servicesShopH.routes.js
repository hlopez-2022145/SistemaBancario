'use strict'

import { Router } from "express";
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js';
import { getByIdServicesShopH, getServicesShopH } from "./servicesShopH.controller.js";

const api = Router();

api.get('/get/:id', [validateToken, validateRoleAdmin], getServicesShopH);
api.get('/getById/:id', [validateToken, validateRoleAdmin], getByIdServicesShopH);

export default api