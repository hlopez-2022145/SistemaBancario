'use strict'

import { Router } from "express"
import { buyService } from './shopService.controller.js'
import { validateToken } from "../../middlewares/validateToken.js"

const api = Router()

api.post('/buyService', [validateToken], buyService);

export default api
