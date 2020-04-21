const controlers = require('../controllers/handlers')

module.exports = (app) => {
    app.get('/', controlers.homeHandler);
    app.post('/filter',controlers.filterHandler);
    app.get('/create', controlers.createHandler);
    app.post('/create', controlers.createHandlerPost);
    app.get('/about',controlers.aboutHandler);
    app.get('/details/:id', controlers.detailsHandler);
    app.get('/not-found', controlers.notFoundHandler);
};