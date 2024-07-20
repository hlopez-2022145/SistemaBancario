'use strict'

import { Router } from "express"
import { deleteS, getByIdServices, getServices, saveService, updatedService } from "./services.controller.js";
import { validateRoleAdmin, validateToken } from "../../middlewares/validateToken.js";

const api = Router()

api.post('/save', [validateToken, validateRoleAdmin], saveService);
api.put('/updateService/:id', [validateToken, validateRoleAdmin], updatedService);
api.delete('/deleteS/:id', [validateToken, validateRoleAdmin], deleteS);
api.get('/getServices', [validateToken], getServices);
api.get('/getByIdServices/:id', [validateToken], getByIdServices)

export default api