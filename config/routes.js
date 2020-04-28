const controlers = require('../controllers/handlers');
const controlersAccessory = require ('../controllers/handlersAccessories');
const controlersAuth = require ('../controllers/handlersAuth');
const {auth} = require('../utils')


module.exports = (app) => {
    app.get('/logout',auth(false),controlersAuth.logoutHandler);
    app.get('/login', controlersAuth.loginGetHandler);
    app.post('/login', controlersAuth.loginPostHandler);
    app.get('/register', controlersAuth.registerGetHandler);
    app.post('/register',auth(false), controlersAuth.registerPostHandler);
    app.get('/attach/accessory/:id',auth(false), controlersAccessory.attachAccessoryGetHandler);
    app.post('/attach/accessory/:id',auth(false), controlersAccessory.attachAccessoryPostHandler);
    app.get('/create/accessory',auth(), controlersAccessory.createAccessoryGetHandler);
    app.post('/create/accessory',auth(), controlersAccessory.createAccessoryPostHandler);
    app.post('/filter',auth(false),controlers.filterHandler);
    app.get('/create',auth(),  controlers.createHandler);
    app.post('/create',auth(false),  controlers.createHandlerPost);
    app.get('/edit/:id', auth(), controlers.editGetHandler);
    app.post('/edit/:id', auth(), controlers.editPostHandler);
    app.get('/delete/:id', auth(), controlers.deleteGetHandler);
    app.post('/delete/:id', auth(), controlers.deletePostHandler);
    app.get('/about',auth(false),controlers.aboutHandler);
    app.get('/details/:id',auth(false), controlers.detailsHandler);
    app.get('/not-found',auth(false), controlers.notFoundHandler);
    app.get('/',auth(false), controlers.homeHandler);
    app.get('*', controlers.notFoundHandler);
};