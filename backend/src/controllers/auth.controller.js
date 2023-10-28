const auth_service = require('../services/auth.service')
const jwt = require("jsonwebtoken");

module.exports = {
    registrationCheck: async (req, res) => {
        try {
            await auth_service.checkAdminIsExist().then((response) => {
                console.log(response);
                if (response === true) {
                    res.status(200).json({ data: response, message: "User Already Created" });
                } else {
                    res.status(200).json({ data: response, message: "User Not Created" });
                }
            })
        } catch (err) {
            res.status(500).json({ message: err.message ?? "An error occurred!" });
        }
    },
    login: async (req, res) => {
        try {
            await auth_service.login(req.body).then((response) => {
                let token = jwt.sign(response, process.env.secret, { expiresIn: 86400 })
                res.status(200).json({ auth: true, token, message: "Admin Login" });
            })
        } catch (err) {
            res.status(500).json({ message: err.message ?? "An error occurred during admin creation!" });
        }
    },
    createAdmin: async (adminData) => {
        return new Promise(async (resolve, reject) => {
            try {
                await auth_service.createAdmin(adminData).then((res) => {
                    resolve(res)
                })
            } catch (err) {
                reject(err); // Reject the Promise with the error
            }
        });
    },
}