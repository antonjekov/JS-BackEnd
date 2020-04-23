const controlers = require('../controllers/handlers')
const controlersAccessory = require ('../controllers/handlersAccessories')

module.exports = (app) => {

    app.get('/attach/accessory/:id', controlersAccessory.attachAccessoryGetHandler);
    app.post('/attach/accessory/:id', controlersAccessory.attachAccessoryPostHandler);
    app.get('/create/accessory', controlersAccessory.createAccessoryGetHandler);
    app.post('/create/accessory', controlersAccessory.createAccessoryPostHandler);
    app.post('/filter',controlers.filterHandler);
    app.get('/create', controlers.createHandler);
    app.post('/create', controlers.createHandlerPost);
    app.get('/about',controlers.aboutHandler);
    app.get('/details/:id', controlers.detailsHandler);
    app.get('/not-found', controlers.notFoundHandler);
    app.get('/', controlers.homeHandler);
    
};