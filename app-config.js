const authCookieName = 'auth_cookie';
const bcryptSaltRounds = 10;
const jwtOptions = {
    expiresIn: '10m'
};
const jwtSecret = 'MySuperPrivateSecret';

module.exports={
    authCookieName,
    bcryptSaltRounds,
    jwtOptions,
    jwtSecret
}