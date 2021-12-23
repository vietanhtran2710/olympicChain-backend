module.exports = app => {
    const parentalControl = require("../controllers/parentalControl.controller");

    var router = require("express").Router();

    router.get('/', parentalControl.getAllControls)

    router.get('/parent/:address', parentalControl.getParentChildren)

    router.get('/student/:address', parentalControl.getStudentParents)

    router.get('/check/:student/:parent', parentalControl.checkControl)

    router.post('/', parentalControl.create)

    router.put('/:student/:parent', parentalControl.verify)

    router.delete('/:student/:parent', parentalControl.delete)

    app.use('/api/contestRegistration', router);
};