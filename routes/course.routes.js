module.exports = app => {
    const course = require("../controllers/course.controller.js");
  
    var router = require("express").Router();
  
    // Create a new course
    router.post("/", course.create);
  
    // Retrieve all course
    router.get("/", course.findAll);

    // Retrieve single course with id
    router.get("/:id", course.findOne)

    // Retrieve all course of a certain teacher
    router.get("/teacher/:id", course.findByTeacher)
  
    //Update/edit a course with id
    router.put("/:id", course.edit);
  
    //Delete a course with id
    router.delete("/:id", course.delete);
  
    app.use('/api/course', router);
  };
  