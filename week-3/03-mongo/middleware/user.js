const { User } = require('../db')

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username
    const password = req.headers.password

    User.findOne({
        username,
        password
    }).then((user) => {
        if (!user) return res.status(401).json({ msg: 'Invalid User! Please Login Again.' })
        req.user = user
        next()
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Server Error')
    })
}

module.exports = userMiddleware;