
var auth_service = require('../model/auth.service')

module.exports = {
    registrationCheck: () => {
        return new Promise(async (resolve, reject) => {
            try {
                await auth_service.checkAdminIsExist().then((res) => {
                    resolve(res)
                })
            } catch (err) {
                reject(err); // Reject the Promise with the error
            }
        })
    },
}