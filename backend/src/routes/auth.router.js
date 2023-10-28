var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
var auth_controller = require('../controllers/auth.controller')
const { validationResult } = require('express-validator');
const verifyToken = require("../middleware/auth.middleware")
const { validateSignUpBody } = require('../config/validation')


router.post('/sign-up', validateSignUpBody, (req, res) => {
  // body validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), message: "body validation failed!" });
  }
  //service
  auth_controller.createAdmin(req.body)
    .then((response) => {
      res.status(200).json({ insertedId: response, message: "Admin Created" });
    })
    .catch((err) => {
      // Handle errors from createAdmin function
      res.status(500).json({ message: err.message || "An error occurred during admin creation!" });
    });
});

router.post('/sign-in', validateSignUpBody,auth_controller.login)
router.get('/reg-check', auth_controller.registrationCheck)


module.exports = router;
