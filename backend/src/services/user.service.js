var db = require('../config/connection')

module.exports = {
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
                    WHERE p.name LIKE ? OR p.description LIKE ?
                    GROUP BY p.id, p.name`,
                    [`%${searchTerm}%`, `%${searchTerm}%`], // Use placeholders to prevent SQL injection
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
}