var user_service = require('../services/user.service')


module.exports = {
    getProjects: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                await user_service.getProjects().then((res) => {
                    resolve(res)
                })
            } catch (err) {
                reject(err); // Reject the Promise with the error
            }
        })
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