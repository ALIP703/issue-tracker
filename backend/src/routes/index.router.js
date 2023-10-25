var express = require('express');
var router = express.Router();
var admin_helper = require('../helper/admin.helper')
const verifyToken = require("../middleware/auth.middleware")
var user_controller = require('../controllers/user.controller')

router.get('/projects', verifyToken, (req, res) => {
    user_controller.getProjects()
        .then((response) => {
            res.status(200).json({ data: response, message: "Projects successfully fetch" });
        })
        .catch((err) => {
            // Handle errors from createAdmin function
            res.status(500).json({ message: err.message ?? "An error occurred during admin creation!" });
        });
})

router.post('/projects', verifyToken, (req, res) => {
    if (req.body.data != undefined) {
        user_controller.getProjectsBySearch(req.body.data)
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

router.post('/issue', verifyToken, (req, res) => {
    if (!(req.body.tracker && req.body.description && req.body.projectId)) {
        return res.status(500).json({ message: "An error occurred!" });
    }
    admin_helper.createIssue(req.body)
        .then((response) => {
            res.status(200).json({ data: response, message: "Issue create successfully" });
        })
        .catch((err) => {
            // Handle errors from createAdmin function
            res.status(500).json({ message: err.message ?? "An error occurred!" });
        });
})

router.get('/project/:id', verifyToken, (req, res) => {
    admin_helper.getProjectById(req.params.id)
        .then((response) => {
            res.status(200).json({ data: response, message: "Project fetch successfully" });
        })
        .catch((err) => {
            // Handle errors from createAdmin function
            res.status(500).json({ message: err.message ?? "An error occurred!" });
        });
})

router.put('/project/:id', verifyToken, (req, res) => {
    admin_helper.updateProject(req.params.id, req.body)
        .then((response) => {
            res.status(200).json({ data: response, message: "Project Updated successfully" });
        })
        .catch((err) => {
            // Handle errors from createAdmin function
            res.status(500).json({ message: err.message ?? "An error occurred!" });
        });
})

router.post('/issues', verifyToken, (req, res) => {
    if (req.body) {
        admin_helper.getIssueByFilter(req.body)
            .then((response) => {
                res.status(200).json({ data: response, message: "Issue successfully fetched" });
            })
            .catch((err) => {
                // Handle errors from getIssueByFilter function
                res.status(500).json({ message: err.message ?? "An error occurred!" });
            });
    } else {
        // Moved the response inside the else block
        res.status(500).json({ message: "An error occurred!" });
    }
});

router.put('/issue/:id', verifyToken, (req, res) => {
    admin_helper.updateIssueStatus(req.params.id, req.body)
        .then((response) => {
            res.status(200).json({ data: response, message: "Issue status Updated successfully" });
        })
        .catch((err) => {
            // Handle errors from createAdmin function
            res.status(500).json({ message: err.message ?? "An error occurred!" });
        });
})

router.get('/issue/:id', verifyToken, (req, res) => {
    admin_helper.getIssue(req.params.id)
        .then((response) => {
            res.status(200).json({ data: response, message: "Issue Fetch successfully" });
        })
        .catch((err) => {
            // Handle errors from createAdmin function
            res.status(500).json({ message: err.message ?? "An error occurred!" });
        });
})


module.exports = router;