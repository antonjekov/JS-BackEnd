const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser')


/**@__basedir comes from index.js where we put it like global const. Actualy this is __dirname the directory of our project
 * Because the path to directory is different in different operation sistems is better we to resolve the path with module path with method path.resolve()
*/

module.exports = (app) => {

    //Setup the view engine
    app.set('view engine', 'hbs');
    app.engine('hbs', handlebars({
        extname: 'hbs',
        layoutsDir: path.resolve(__basedir, 'views/layouts'),
        partialsDir: path.resolve(__basedir, 'views/partials'),
        defaultLayout: "index",
        views: path.resolve(__basedir, 'views')
    }));

    //Setup the body parser
    app.use(bodyParser.urlencoded({
        extended: false
    }))

    app.use(cookieParser());

    //Setup the static files
    app.use(express.static(path.resolve(__basedir, 'static')));

    
};