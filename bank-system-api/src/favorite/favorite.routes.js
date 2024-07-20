'use strict'

import { Router } from "express"
import { validateToken } from '../../middlewares/validateToken.js'
import { addFavorite, deleteFavorite, getByIdFavorite, getFavorite } from "./favorite.controller.js"

const api = Router()

api.post('/add', [validateToken], addFavorite);
api.delete('/delete/:id', [validateToken], deleteFavorite);
api.get('/get', [validateToken], getFavorite);
api.get('/getById/:id', [validateToken], getByIdFavorite);

export default api