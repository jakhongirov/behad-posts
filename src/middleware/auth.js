const JWT = require('../lib/jwt')
const model = require('../modules/apps/model')

module.exports = {
    AUTH: async (req, res, next) => {
        try {
            const { token } = req.headers;
            const app = await model.getAppbyKeyAppAuth(token)

            if (app) {
                next()
            } else {
                const userStatus = new JWT(token).verify()

                if (userStatus.role == 'admin') {
                    next()
                } else {
                    res.json({
                        status: 401,
                        message: 'Unauthorized'
                    })
                }
            }

        } catch (err) {
            res.json({
                status: 401,
                message: 'Unauthorized'
            })
        }
    }
}