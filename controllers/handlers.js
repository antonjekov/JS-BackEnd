const models = require('../models');

/**This version of handlebars dosn't like mongoose:) for this we must use mongoo method lean()
 * this method change mongoo object to js object
 */
async function homeHandler(req, res, next) {
    try {
        const cubes = await models.cubeModel.find().lean();
        res.render('index.hbs', {
            cubes
        });
    } catch (error) {
        next
    }
};

async function filterHandler(req, res, next) {
    try {
        const {
            search,
            from,
            to
        } = req.body;
        const cubesAll = await models.cubeModel.find().lean();
        const cubes = cubesAll.filter(
            x => (!!search ? x.name.toUpperCase() === search.toUpperCase() : true) &&
            (!!from ? x.difficultyLevel >= from : true) &&
            (!!to ? x.difficultyLevel <= to : true));
    
        res.render('index.hbs', {
            cubes
        });
    } catch (error) {
        next
    }
};

function createHandler(req, res) {
    res.render('create.hbs');
};

function aboutHandler(req, res) {
    res.render('about.hbs');
};

async function detailsHandler(req, res, next) {
    try {
        const id = req.params.id;
        const cube = await models.cubeModel.findById(id).lean();
        if (!cube) {
            res.redirect('/not-found');
            return;
        }

        const accessories = await models.accessoryModel.find({
            '_id': {
                $in: cube.accessories
            }
        }).lean();

        res.render('details.hbs', {
            cube,
            accessories
        });

    } catch (error) {
        next
    }

};

async function createHandlerPost(req, res, next) {
    try {
        const cube = req.body;
        await models.cubeModel.create(cube);
        res.redirect('/');
    } catch (error) {
        next
    }
};

function notFoundHandler(req, res) {
    res.render('404.hbs');
};

module.exports = {
    homeHandler,
    filterHandler,
    createHandler,
    aboutHandler,
    detailsHandler,
    createHandlerPost,
    notFoundHandler
};