const jwt = require('./jwt');
const {
    authCookieName
} = require('../app-config');
const models = require('../models');

function auth(redirectAutenticated = true) {
    return async function auth(req, res, next) {
        try {
            const token = req.cookies[authCookieName]||'';
            const blacklistToken = await models.tokenBlacklist.findOne({
                token
            });
            if (blacklistToken) {
                throw new Error('Token is not valid!')
            }
            const data = jwt.verifyToken(token);
            const user = await models.userModel.findById(data.userId).lean();
            req.user = user;
            next();
        } catch (err) {
            if (redirectAutenticated) {
                res.redirect('/login');
                return;
            }
            next();
        }
    }
}


module.exports = auth;