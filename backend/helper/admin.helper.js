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
                db.query("SELECT * FROM admin WHERE username=?", userDate.username, async function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length > 0) {
                            if (await bcrypt.compare(userDate.password, result[0].password)) {
                                let response = { id: result[0].id, username: userDate.username }
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
    getProjects: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                db.query("SELECT p.id AS id, p.name AS name, p.description AS description, p.status AS status, COUNT(CASE WHEN i.status = 'open' THEN i.id ELSE NULL END) AS issueCount FROM projects p LEFT JOIN issues i ON p.id = i.projectId GROUP BY p.id, p.name", async function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length > 0) {
                            resolve(result);
                        } else {
                            reject(new Error("Projects Not Found"));
                        }
                    }
                });
            } catch (err) {
                reject(err);
            }
        })
    },
    getProjectsBySearch: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                // data is a string containing the search term
                let searchTerm = data;

                db.query(
                    `SELECT p.id AS id, p.name AS name, p.description AS description, p.status AS status, COUNT(CASE WHEN i.status = 'open' THEN i.id ELSE NULL END) AS issueCount 
                    FROM projects p 
                    LEFT JOIN issues i ON p.id = i.projectId 
                    WHERE p.name LIKE ? 
                    GROUP BY p.id, p.name`,
                    [`%${searchTerm}%`], // Use placeholders to prevent SQL injection
                    async function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            if (result.length > 0) {
                                resolve(result);
                            } else {
                                reject(new Error("Projects Not Found"));
                            }
                        }
                    }
                );
            } catch (err) {
                reject(err);
            }

        })
    },
    createProject: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let queryCheck = "SELECT COUNT(*) AS count FROM projects WHERE name = ? OR description = ?";
                let valuesCheck = [data.name, data.description];

                // Execute the SELECT query to check for existing records
                db.query(queryCheck, valuesCheck, function (errCheck, resultCheck) {
                    if (errCheck) {
                        reject(errCheck);
                    } else {
                        const recordCount = resultCheck[0].count;

                        // If recordCount is greater than 0, it means a matching record exists
                        if (recordCount > 0) {
                            reject(new Error("Name or description already exists"));
                        } else {
                            let queryInsert = "INSERT INTO projects (name, description) VALUES (?, ?)";
                            let valuesInsert = [data.name, data.description];

                            // Execute the INSERT INTO query to create the project
                            db.query(queryInsert, valuesInsert, function (errInsert, resultInsert) {
                                if (errInsert) {
                                    reject(errInsert);
                                } else {
                                    resolve(resultInsert.insertId);
                                }
                            });
                        }
                    }
                });
            } catch (err) {
                console.log('test');
                reject(err); // Reject the Promise with the error
            }
        });

    }
}