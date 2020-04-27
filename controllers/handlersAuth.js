const models = require('../models');
const utils = require('../utils');
const {
    authCookieName
} = require('../app-config');

function loginGetHandler(req, res) {
    res.render('login.hbs');
};

async function loginPostHandler(req, res, next) {
    try {
        const {
            password,
            username
        } = req.body;
        
        const user = await models.userModel.findOne({
            username: username
        });
        if (!user) {
            res.render('login.hbs', {
                message: 'Wrong user!'
            });
            return
        };
        const matched = await user.matchPassword(password);
        if (!matched) {
            res.render('login.hbs', {
                message: 'Wrong password!'
            });
            return
        }
        const token = utils.jwt.createToken({
            userId: user.id
        });
        res.cookie(authCookieName, token).redirect('/');
        next();
    } catch (err) {
        next(err);
    }
};

function registerGetHandler(req, res) {
    res.render('register.hbs');
};

async function registerPostHandler(req, res, next) {
    try {
        const {
            username,
            password,
            repeatPassword
        } = req.body;
        if (password !== repeatPassword) {
            res.render('register.hbs', {
                errors: {
                    repeatPassword: "Password and repeat password don't match!"
                }
            });
            return;
        }

        const userExist = await models.userModel.findOne({
            username: username
        });
        if (userExist) {
            res.render('register.hbs', {
                errors: {
                    username: "Username already taken"
                }
            });
            return;
        }
        const newUser = {
            username,
            password
        };
        await models.userModel.create(newUser);
        //before to save express call pre midleware from user.js
        res.redirect('/login')
        next();

    } catch (err) {
        next(err);
    }
}

async function logoutHandler(req, res, next) {
    //This is not enaugh because token still is valid. Good Startegy is token to be valid no more than 10 minutes. And we to have refresh token for to renovate the token. After logout we save token in blacklist for not to be posible anybody to use it another time. Must have any script that periodicly clean blacklist from database. 
    try {
        const token = req.cookies[authCookieName];
        await models.tokenBlacklist.create({token});
        res.clearCookie(authCookieName).redirect('/');
    } catch (err) {
        next(err);
    }

};

module.exports = {
    loginGetHandler,
    registerGetHandler,
    registerPostHandler,
    loginPostHandler,
    logoutHandler
}