const jwt = require('jsonwebtoken');
const secret = 'haosecret';

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secret);
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else if (!isAdmin) {
            throw 'Access denied';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};