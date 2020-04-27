const models = require('../models');

/**This version of handlebars dosn't like mongoose:) for this we must use mongoo method lean()
 * this method change mongoo object to js object
 */
async function homeHandler(req, res, next) {
    try {
        const cubes = await models.cubeModel.find().lean();
        const user = req.user;
        res.render('index.hbs', {
            cubes,
            user
        });
    } catch (err) {
        next(err)
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
        const user = req.user;
        res.render('index.hbs', {
            cubes,
            user
        });
    } catch (error) {
        next
    }
};

function createHandler(req, res) {
    const user = req.user;
    res.render('create.hbs', {user});
};

function aboutHandler(req, res) {
    const user = req.user;
    res.render('about.hbs', {user});
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

        const user = req.user;
        res.render('details.hbs', {
            cube,
            accessories,
            user
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
    const user = req.user;
    res.render('404.hbs', {user});
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