module.exports = app => {
    const test = require("../controllers/test.controller.js");
  
    var router = require("express").Router();
  
    // Create a new test
    router.post("/", test.create);
  
    // Retrieve all test
    router.get("/", test.findAll);

    // Retrieve single course with address
    router.get("/:address", test.findOne)

    // Retrieve all course of a certain host
    router.get("/host/:address", test.findByHost)
  
    //Update/edit a course with address
    router.put("/:address", test.edit);
  
    app.use('/api/test', router);
  };
  