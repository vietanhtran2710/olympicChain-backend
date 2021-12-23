module.exports = app => {
    const exercise = require("../controllers/exercise.controller.js");
  
    var router = require("express").Router();
  
    // Create a new exercise
    router.post("/", exercise.create);
  
    // Retrieve all exercise
    router.get("/", exercise.findAll);

    // Retrieve one exercise
    router.get("/", exercise.findOne);

    // Retrieve excerise of a course
    router.get("/:id", exercise.findByCourse);

    // Delete a exercise with id
    router.delete("/:id", exercise.delete);
  
    //Update/edit a exercise with id
    router.put("/:id", exercise.edit);
  
    app.use('/api/question', router);
  };
  