const express = require('express')

const userRoutes = express.Router()
const {register, login} = require('../controllers/user')
const {registerValidation,validation, logvalidator} = require('../middelware/validator')


userRoutes.post('/register',registerValidation,validation,register)
userRoutes.post('/login',logvalidator,login)


module.exports = userRoutes