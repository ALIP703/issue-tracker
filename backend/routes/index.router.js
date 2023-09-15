var express = require('express');
var router = express.Router();
var admin_helper = require('../helper/admin.helper')
const { validationResult } = require('express-validator');
const verifyToken = require("../middleware/auth.middleware")

router.get('/projects', verifyToken, (req, res) => {
    admin_helper.getProjects()
        .then((response) => {
            res.status(200).json({ data: response, message: "Projects successfully fetch" });
        })
        .catch((err) => {
            // Handle errors from createAdmin function
            res.status(500).json({ message: err.message ?? "An error occurred during admin creation!" });
        });
})

router.post('/projects', verifyToken, (req, res) => {
    console.log(req.body.data);
    if (req.body.data != undefined) {
        admin_helper.getProjectsBySearch(req.body.data)
            .then((response) => {
                res.status(200).json({ data: response, message: "Projects successfully fetch" });
            })
            .catch((err) => {
                // Handle errors from createAdmin function
                res.status(500).json({ message: err.message ?? "An error occurred!" });
            });
    }
})
router.post('/project', verifyToken, (req, res) => {
    if (!(req.body.name && req.body.description)) {
        return res.status(500).json({ message: "An error occurred!" });
    }
    admin_helper.createProject(req.body)
        .then((response) => {
            res.status(200).json({ data: response, message: "Projects create successfully" });
        })
        .catch((err) => {
            // Handle errors from createAdmin function
            res.status(500).json({ message: err.message ?? "An error occurred!" });
        });
})

module.exports = router;