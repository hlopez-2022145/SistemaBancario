'use strict'

import jwt from 'jsonwebtoken'
import userModel from '../src/user/user.model.js'

export const validateToken = async (req, res, next) => {
  try {
    let { token } = req.headers
    if (!token) return res.status(401).send('Unauthorized')
    let { _id } = jwt.verify(token, process.env.SECRET_KEY)
    let user = await userModel.findById({ _id }, { password: 0 })
    if (!user) return res.status(404).send({ message: 'User not found - Unauthorized' })
    req.user = user
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).send({ message: 'Invalid or expired token' })
  }
}
  
export const validateRoleAdmin = async (req, res, next) => {
  try {
    let { role } = req.user
    if (!role || role === 'CLIENT' || role === 'DEFAULT')
      return res.status(401).send({ message: 'You dont have access' })
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).send({ message: 'Unauthorized role' })
  }
}