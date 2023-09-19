var db = require('../config/connection')

module.exports = {
    checkAdminIsExist: () => {
        return new Promise(async (resolve, reject) => {
            try {
                db.query("SELECT username FROM admin", async function (err, result) {
                    if (err) {
                        resolve(err);
                    } else {
                        if (result.length > 0) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    }
                })
            } catch (err) {
                resolve(err) // Reject the Promise with the error
            }
        })
    },
}