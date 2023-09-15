var db = require('../config/connection')
const bcrypt = require('bcrypt')


module.exports = {
    createAdmin: async (adminData) => {
        return new Promise(async (resolve, reject) => {
            try {
                db.query("SELECT * FROM admin WHERE username=?", adminData.username, async function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length > 0) {
                            reject(new Error("Username is already used"));
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
    login: async (userDate) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('result');
                db.query("SELECT * FROM admin WHERE username=?", userDate.username, async function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length > 0) {
                            console.log(result[0].password);
                            if (await bcrypt.compare(userDate.password, result[0].password)) {
                                let response = { username: userDate.username }
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
    }
}