const db = require("../models");
const SponsoredConest = db.sponsoredContests;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.testAddress || !req.body.userAddress) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const contestSponsor = {
        testAddress: req.body.testAddress,
        userAddress: req.body.userAddress,
    };
  
    SponsoredConest.create(contestSponsor)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating data."
        });
    });
  };

exports.getContests = (req, res) => {
    address = req.params.address
    SponsoredConest.findAll({ userAddress: address })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err
        });
    });
}