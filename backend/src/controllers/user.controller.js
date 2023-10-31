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
    getProjectsBySearch: async (req, res) => {
            try {
                if (req.body.data != undefined) {
                    user_service.getProjectsBySearch(req.body.data)
                        .then((response) => {
                            res.status(200).json({ data: response, message: "Projects successfully fetch" });
                        })
                        .catch((err) => {
                            res.status(500).json({ message: err.message ?? "An error occurred!" });
                        });
                }
            } catch (err) {
                res.status(500).json({ message: err.message ?? "An error occurred!" });
            }
    },
    createProject: async (req, res) => {
    }
}