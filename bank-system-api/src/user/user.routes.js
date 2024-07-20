'use strict'

import { Router } from "express"
import { validateRoleAdmin, validateToken } from "../../middlewares/validateToken.js"
import {
  deleteUser, getByIdUser, getPersonalInfo, getRoleClient, getUser, login, saveUser,
  updatePersonalInfo,
  updateUser
} from "./user.controller.js"

const api = Router()

api.post('/save', [validateToken, validateRoleAdmin], saveUser);
api.post('/login', login);
api.put('/update/:id', [validateToken, validateRoleAdmin], updateUser);
api.delete('/delete/:id', [validateToken, validateRoleAdmin], deleteUser);
api.get('/get', [validateToken, validateRoleAdmin], getUser);
api.get('/getById/:id', [validateToken, validateRoleAdmin], getByIdUser);
api.get('/getRoleClient', [validateToken, validateRoleAdmin], getRoleClient);
api.get('/personalInfo/:id', [validateToken], getPersonalInfo)
api.put('/personalInfo/:id', [validateToken], updatePersonalInfo)

export default api