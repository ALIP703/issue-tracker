var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
var admin_helper = require('../helper/admin.helper')
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
  admin_helper.createAdmin(req.body)
    .then((response) => {
      res.status(200).json({ insertedId: response, message: "Admin Created" });
    })
    .catch((err) => {
      // Handle errors from createAdmin function
      res.status(500).json({ message: err.message || "An error occurred during admin creation!" });
    });
});

router.post('/sign-in', validateSignUpBody, (req, res) => {
  // body validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), message: "body validation failed!" });
  }
  //service
  admin_helper.login(req.body)
    .then((response) => {
      let token = jwt.sign(response, process.env.secret, { expiresIn: 86400 })
      
      res.status(200).json({ auth: true, token, message: "Admin Login" });
    })
    .catch((err) => {
      // Handle errors from createAdmin function
      res.status(500).json({ message: err.message ?? "An error occurred during admin creation!" });
    });
})

router.get('/test', verifyToken, (req, res) => {
  res.json({ message: "true" })
})

module.exports = router;