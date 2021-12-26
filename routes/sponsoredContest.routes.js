module.exports = app => {
    const sponsoredContest = require("../controllers/sponsoredContest.controller");

    var router = require("express").Router();

    router.post('/', sponsoredContest.create)

    router.get('/:address', sponsoredContest.getContests)

    app.use('/api/sponsoredContest', router);
};