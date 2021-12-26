module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", user.create);
  
    // Retrieve all users
    router.get("/", user.findAll);

    // Retrieve unverified users
    router.get("/unverified", user.findUnverified);

    // Retrieve single user with address
    router.get("/address/:address", user.findOne)

    // Retrieve users with a certain role
    router.get("/role/:role", user.findByRole)
  
    //Update/edit an user with address
    router.put("/:address", user.edit);
  
    //Delete an user with address
    router.delete("/:address", user.delete);
  
    app.use('/api/user', router);
  };
  