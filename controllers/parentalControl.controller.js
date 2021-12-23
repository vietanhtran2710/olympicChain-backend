const db = require("../models");
const ParentalControl = db.parentalControls;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.childrenAddress || !req.body.parentAddress) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const parentalControl = {
        childrenAddress: req.body.childrenAddress,
        parentAddress: req.body.courseId,
    };
  
    ParentalControl.create(parentalControl)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while enrolling."
        });
      });
  };

exports.getAllControls = (req, res) => {
    condition = req.query
    ParentalControl.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
}

exports.getParentChildren = (req, res) => {
    const userAddress = req.params.address;
  
    ParentalControl.findAll({ where: { parentAddress: userAddress } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
}

exports.getStudentParents = (req, res) => {
    const userAddress = req.params.address;
  
    ParentalControl.findAll({ where: { childrenAddress: userAddress } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
}

exports.checkControl = (req, res) => {
    const children = req.params.student;
    const parent = req.params.parent;
  
    ParentalControl.findAndCountAll({ where: { childrenAddress: children, parentAddress: parent} })
      .then(data => {
        if (data.count == 1)
          res.send({liked: true});
        else 
          res.send({liked: false});
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
}

exports.verify = (req, res) => {
	const children = req.params.student;
  const parent = req.params.parent;

	ParentalControl.update(req.body, {
		where: { childrenAddress: children, parentAddress: parent }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Control was verified successfully."
				});
			} else {
				res.send({
					message: `Cannot uverify with 2 address=${children}, ${parent}. Maybe account was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Error verifing with address=${address}, ${err}`
			});
		});
};

exports.delete = (req, res) => {
    if (!req.params.student || !req.params.parent) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    ParentalControl.destroy({
      where: { childrenAddress: req.params.student, parentAddress: req.params.parent }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Control was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete. Maybe parental control was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
  }