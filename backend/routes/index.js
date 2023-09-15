var express = require('express');
var router = express.Router();
var admin_helper = require('../helper/admin.helper')
const { validationResult } = require('express-validator');
const { validateSignUpBody } = require('../config/validation')


/* GET home page. */
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
      res.status(200).json({ response, message: "Admin Login" });
    })
    .catch((err) => {
      // Handle errors from createAdmin function
      res.status(500).json({ message: err.message || "An error occurred during admin creation!" });
    });
})

module.exports = router;
