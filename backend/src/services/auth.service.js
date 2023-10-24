var db = require('../config/connection')
const bcrypt = require('bcrypt')

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
    login: async (userData) => {
        return new Promise(async (resolve, reject) => {
            try {
                db.query("SELECT * FROM admin WHERE username=?", userData.username, async function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length > 0) {
                            if (await bcrypt.compare(userData.password, result[0].password)) {
                                let response = { id: result[0].id, username: userData.username }
                                resolve(response)
                            } else {
                                reject(new Error("Password not valid"));
                            }
                        } else {
                            reject(new Error("User not fount"));
                        }
                    }
                });
            } catch (err) {
                reject(err); // Reject the Promise with the error
            }
        })
    },
    createAdmin: async (adminData) => {
        return new Promise(async (resolve, reject) => {
            try {
                db.query("SELECT * FROM admin", async function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length > 0) {
                            reject(new Error("Already registered"));
                        } else {
                            hashedPassword = await bcrypt.hash(adminData.password, 10) // encrypt the password
                            let query = "INSERT INTO admin (username, password) VALUES (?, ?)";
                            let values = [adminData.username, hashedPassword];
                            // Execute the INSERT INTO query to create the admin
                            db.query(query, values, function (err, result) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(result.insertId);
                                }
                            });
                        }
                    }
                });
            } catch (err) {
                reject(err); // Reject the Promise with the error
            }
        });
    },
}