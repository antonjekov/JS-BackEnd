//cubeModel = require('../models/_cube');
const cubeModel = require('../models/cube');

// function homeHandler(req, res, next) {
//     cubeModel.getAll().then(cubes => res.render('index.hbs', {
//         cubes
//     })).catch(next);
// };


/**This version of handlebars dosn't like mongoose:) for this we must use mongoo method lean()
 * this method change mongoo object to js object
 */
function homeHandler(req, res, next) {
    cubeModel.find().lean().then(cubes =>{
        res.render('index.hbs', {cubes});
    }).catch(next);
};

// function filterHandler(req, res, next) {
//     const {search,from,to} =req.body;
//     cubeModel.getAll()
//     .then(cubesAll=>{
//         console.log(cubesAll)
//         let cubes =  cubesAll.filter(
//             x=>(!!search?x.name.toUpperCase()===search.toUpperCase():true)&&
//             (!!from?x.difficultyLevel>=from:true)&&
//             (!!to?x.difficultyLevel<=to:true));
//         res.render('index.hbs',{cubes});
//     })
//     .catch(next);    
// };
function filterHandler(req, res, next) {
    const {search,from,to} =req.body;
    cubeModel.find().lean()
    .then(cubesAll=>{
        let cubes =  cubesAll.filter(
            x=>(!!search?x.name.toUpperCase()===search.toUpperCase():true)&&
            (!!from?x.difficultyLevel>=from:true)&&
            (!!to?x.difficultyLevel<=to:true));
        res.render('index.hbs',{cubes});
    })
    .catch(next);    
};

function createHandler(req, res) {
    res.render('create.hbs');
};

function aboutHandler(req, res) {
    res.render('about.hbs');
};

// function detailsHandler(req, res, next) {
//     const id = req.params.id
//     cubeModel.getOne(id)
//         .then(cube => {
//             if (!cube) {
//                 res.redirect('/not-found');
//                 return;
//             }
//             res.render('details.hbs', {
//                 cube
//             })
//         })
//         .catch(next);
// };

function detailsHandler(req, res, next) {
    const id = req.params.id
    cubeModel.findById(id).lean()
        .then(cube => {
            if (!cube) {
                res.redirect('/not-found');
                return;
            }
            res.render('details.hbs', {
                cube
            })
        })
        .catch(next);
};


// function createHandlerPost(req, res, next) {
//     const cube =req.body;
//     cubeModel.insert(cube).then(res.redirect('/')).catch(next);
// };
function createHandlerPost(req, res, next) {
    const cube =req.body;
    cubeModel.create(cube).then(res.redirect('/')).catch(next);
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

