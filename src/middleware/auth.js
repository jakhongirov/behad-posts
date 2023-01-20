const JWT = require('../lib/jwt')

module.exports = {
    AUTH: (req, res, next) => {
        try {
            const { token } = req.headers;
            const userStatus = new JWT(token).verify()
            
            if (!token && !userStatus) {
                res.json({
                    status: 401,
                    message: 'Unauthorized'
                })
            }
            else if(userStatus.role == 'admin') {
                next()
            }

        } catch (err) {
            console.log(err);
            res.json({
                status: 401,
                message: 'Unauthorized'
            })
        }
    }
}