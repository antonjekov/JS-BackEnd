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
    res.render('create.hbs', {
        user
    });
};

function aboutHandler(req, res) {
    const user = req.user;
    res.render('about.hbs', {
        user
    });
};

async function detailsHandler(req, res) {
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

        const isCreator = user ? user._id.toString() === cube.creatorId : false;
        res.render('details.hbs', {
            cube,
            accessories,
            user,
            isCreator
        });

    } catch (err) {
        next(err);
    }
};

async function createHandlerPost(req, res, next) {
    try {
        const cube = req.body;
        cube.creatorId = req.user._id.toString();
        await models.cubeModel.create(cube);
        res.redirect('/');
        next();
    } catch (err) {
        next(err)
    }
};

function notFoundHandler(req, res) {
    const user = req.user;
    res.render('404.hbs', {
        user
    });
};

async function editGetHandler(req, res) {
    const cubeId = req.params.id;
    const user = req.user;
    const cube = await models.cubeModel.findById(cubeId).lean();
    res.render('edit.hbs', {
        cube,
        user
    });
};

async function editPostHandler(req, res, next) {
    try {
        const cubeId = req.params.id;
        const cube = req.body;
        await models.cubeModel.findByIdAndUpdate(cubeId, {
            ...cube
        });
        res.redirect('/');

    } catch (err) {
        next(err)
    }

};

async function deleteGetHandler(req, res) {
    const cubeId = req.params.id;
    const user = req.user;
    const cube = await models.cubeModel.findById(cubeId).lean();
    res.render('delete.hbs', {
        cube,
        user
    });
};

async function deletePostHandler(req, res, next) {
    try {
        const cubeId = req.params.id;
        await models.cubeModel.findByIdAndDelete(cubeId);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
};


module.exports = {
    homeHandler,
    filterHandler,
    createHandler,
    aboutHandler,
    detailsHandler,
    createHandlerPost,
    notFoundHandler,
    editGetHandler,
    deleteGetHandler,
    deletePostHandler,
    editPostHandler
};