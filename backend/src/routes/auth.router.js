var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
var auth_controller = require('../controllers/auth.controller')
const { validationResult } = require('express-validator');
const verifyToken = require("../middleware/auth.middleware")
const { validateSignUpBody } = require('../config/validation')


router.post('/sign-up', validateSignUpBody,auth_controller.createAdmin);
router.post('/sign-in', validateSignUpBody,auth_controller.login)
router.get('/reg-check', auth_controller.registrationCheck)


module.exports = router;
