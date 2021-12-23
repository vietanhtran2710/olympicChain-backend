module.exports = app => {
    const question = require("../controllers/question.controller.js");
  
    var router = require("express").Router();
  
    // Create a new question
    router.post("/", question.create);
  
    // Retrieve all question
    router.get("/", question.findAll);

    // Retrieve questions of a exercise
    router.get("/exercise/:id", question.findByExercise)

    // Retrieve all questions of a certain test
    router.get("/test/:address", question.findByTest)

    // Retrieve all questions of a certain category
    router.get("/category/:category", question.findByCategory)

    // Delete a question with id
    router.delete("/:id", question.delete);
  
    //Update/edit a question with id
    router.put("/:id", question.edit);
  
    app.use('/api/question', router);
  };
  