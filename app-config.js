const authCookieName = 'auth_cookie';
const bcryptSaltRounds = 10;
const jwtOptions = {
    expiresIn: '59m'
};
const jwtSecret = 'MySuperPrivateSecret';

module.exports={
    authCookieName,
    bcryptSaltRounds,
    jwtOptions,
    jwtSecret
}