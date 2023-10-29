var user_service = require('../services/user.service')


module.exports = {
    getProjects: async (req, res) => {
            try {
                await user_service.getProjects().then((response) => {
                    res.status(200).json({ data: response, message: "Projects successfully fetch" });
                })
            } catch (err) {
                res.status(500).json({ message: err.message ?? "An error occurred during Projects fetching!" });
            }
    },
    getProjectsBySearch: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                await user_service.getProjectsBySearch(data).then((res) => {
                    resolve(res)
                })
            } catch (err) {
                reject(err); // Reject the Promise with the error
            }
        })
    },
}