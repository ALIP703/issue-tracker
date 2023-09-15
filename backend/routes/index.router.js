var express = require('express');
var router = express.Router();
var admin_helper = require('../helper/admin.helper')
const { validationResult } = require('express-validator');
const verifyToken = require("../middleware/auth.middleware")

router.get('/projects', verifyToken, (req, res) => {
    admin_helper.getProjects(req.body)
        .then((response) => {
            res.status(200).json({ data: response, message: "Projects successfully fetch" });
        })
        .catch((err) => {
            // Handle errors from createAdmin function
            res.status(500).json({ message: err.message ?? "An error occurred during admin creation!" });
        });
})

module.exports = router;