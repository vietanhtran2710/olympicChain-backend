const db = require("../models");
const ContestRegistration = db.contestRegistrations;
const Op = db.Sequelize.Op;

exports.register = (req, res) => {
    if (!req.body.userAddress || !req.body.testAddress) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    const contestRegistration = {
      userAddress: req.body.userAddress,
      testAddress: req.body.testAddress,
    };

    ContestRegistration.create(contestRegistration)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while registering."
        });
      });
  };

exports.getAllContestRegistrations = (req, res) => {
    condition = req.query
    ContestRegistration.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
}

exports.getStudentRegistrations = (req, res) => {
  const address = req.params.address;

  ContestRegistration.findAll({ where: { userAddress: address }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
}
