module.exports = app => {
    const contestRegistration = require("../controllers/contestRegistration.controller");

    var router = require("express").Router();

    router.get('/', contestRegistration.getAllContestRegistrations)

    router.get('/user/:address', contestRegistration.getStudentRegistrations)

    router.post('/', contestRegistration.register)

    app.use('/api/contestRegistration', router);
};