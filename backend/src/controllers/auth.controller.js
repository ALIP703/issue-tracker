
var auth_service = require('../services/auth.service')

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
    login: async (userData) => {
        return new Promise(async (resolve, reject) => {
            try {
                await auth_service.login(userData).then((res) => {
                    resolve(res)
                })
            } catch (err) {
                reject(err); // Reject the Promise with the error
            }
        })
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