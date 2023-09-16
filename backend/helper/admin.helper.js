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
    getProjectById: async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                db.query(
                    `
              SELECT p.id AS id, p.name AS name, p.description AS description, p.status AS status,
                     i.id AS issueId, i.tracker AS issueTracker, i.projectId AS issueProjectId, i.status AS issueStatus,
                     i.description AS issueDescription,i.createdAt AS createdAt
              FROM projects p
              LEFT JOIN issues i ON p.id = i.projectId
              WHERE p.id = ?
              `,
                    [id], // Pass the project ID as a parameter
                    async function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            if (result.length > 0) {
                                // The query will return all issues associated with the project
                                // You can parse the result to group issues with the project
                                const project = {
                                    id: result[0].id,
                                    name: result[0].name,
                                    description: result[0].description,
                                    status: result[0].status,
                                    issues: result
                                        .filter((row) => row.issueId !== null)
                                        .map((row) => ({
                                            id: row.issueId,
                                            tracker: row.issueTracker,
                                            description: row.issueDescription,
                                            createdAt: row.createdAt,
                                            status: row.issueStatus,
                                        })),
                                };
                                resolve(project);
                            } else {
                                reject(new Error("Project Not Found"));
                            }
                        }
                    }
                );
            } catch (err) {
                reject(err);
            }
        });
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
    getIssueByFilter: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {

                let query = `SELECT * FROM issues i WHERE 1`; // Start with a base query that always returns all issues

                const queryParams = []; // Array to hold the query parameters

                if (data.search) {
                    // If 'search' is included in data, add the search condition
                    const searchTerm = `%${data.search}%`;
                    query += ` AND (i.tracker LIKE ? OR i.description LIKE ?)`;
                    queryParams.push(searchTerm, searchTerm); // Add search parameters to queryParams
                }

                if (data.tracker) {
                    // If 'tracker' is included in data, add the tracker condition
                    query += ` AND i.tracker = ?`;
                    queryParams.push(data.tracker); // Add tracker parameter to queryParams
                }

                if (data.status) {
                    // If 'status' is included in data, add the status condition
                    query += ` AND i.status = ?`;
                    queryParams.push(data.status); // Add status parameter to queryParams
                }
                db.query(query, queryParams, async function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length > 0) {
                            resolve(result);
                        } else {
                            reject(new Error("Issues Not Found"));
                        }
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
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
                reject(err); // Reject the Promise with the error
            }
        });

    },
    updateProject: async (projectId, newData) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Create arrays to store SET and VALUES clauses for the SQL query
                const setClauses = [];
                const values = [];

                // Check if a new name is provided
                if (newData.name !== undefined) {
                    setClauses.push('name = ?');
                    values.push(newData.name);
                }

                // Check if a new description is provided
                if (newData.description !== undefined) {
                    setClauses.push('description = ?');
                    values.push(newData.description);
                }

                // Check if a new status is provided
                if (newData.status !== undefined) {
                    setClauses.push('status = ?');
                    values.push(newData.status);
                }

                // Ensure there are valid updates to perform
                if (setClauses.length === 0) {
                    reject(new Error("No valid updates provided"));
                    return;
                }

                // Construct the SQL query to check for existing records with the same name or description
                const queryCheck = "SELECT COUNT(*) AS count FROM projects WHERE (name = ? OR description = ?)";
                const valuesCheck = [newData.name, newData.description];

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
                            // Construct the SQL query to update the project
                            const queryUpdate = `UPDATE projects SET ${setClauses.join(', ')} WHERE id = ?`;
                            values.push(projectId);

                            // Execute the UPDATE query to update the project
                            db.query(queryUpdate, values, function (errUpdate, resultUpdate) {
                                if (errUpdate) {
                                    reject(errUpdate);
                                } else {
                                    resolve(resultUpdate.affectedRows);
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
    updateIssueStatus: async (issueId, newData) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(newData);
                // Construct the SQL query to update the project
                const queryUpdate = `UPDATE issues SET status=? WHERE id = ?`;

                // Execute the UPDATE query to update the project
                db.query(queryUpdate, [newData.status, issueId], function (errUpdate, resultUpdate) {
                    if (errUpdate) {
                        reject(errUpdate);
                    } else {
                        resolve(resultUpdate.affectedRows);
                    }
                });
            } catch (err) {
                reject(err); // Reject the Promise with the error
            }
        });
    },
}