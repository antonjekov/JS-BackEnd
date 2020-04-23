const models = require('../models');

/**This version of handlebars dosn't like mongoose:) for this we must use mongoo method lean()
 * this method change mongoo object to js object
 */
function createAccessoryGetHandler(req, res) {
    res.render('createAccessory.hbs');
};

async function createAccessoryPostHandler(req, res, next) {
    try {
        const accessory = req.body;
        await models.accessoryModel.create(accessory);
        res.redirect('/');
    } catch (error) {
        next
    }
};

async function attachAccessoryGetHandler(req, res, next) {
    try {
        const cubeId = req.params.id;
        const cube = await models.cubeModel.findById(cubeId).lean();
        if (!cube) {
            res.redirect('/not-found');
            return;
        }
        const accessories = await models.accessoryModel.find({
            _id: {
                $nin: cube.accessories
            }
        }).lean();
        let hasAccessories = !!accessories.length;
        res.render('attachAccessory.hbs', {
            cube,
            hasAccessories,
            accessories
        });
    } catch (error) {
        next
    }
};

async function attachAccessoryPostHandler(req, res, next) {
    try {
        const cubeId = req.params.id;
        const {
            accessory: accessoryId
        } = req.body;

        await models.cubeModel.findByIdAndUpdate({
            _id: cubeId
        }, {
            $push: {
                accessories: accessoryId
            }
        });
        res.redirect('/');

    } catch (error) {
        next
    }
};


module.exports = {
    createAccessoryGetHandler,
    createAccessoryPostHandler,
    attachAccessoryGetHandler,
    attachAccessoryPostHandler
};