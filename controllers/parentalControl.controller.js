const db = require("../models");
const ParentalControl = db.parentalControls;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.userAddress || !req.body.courseId) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const parentalControl = {
        userAddress: req.body.userAddress,
        courseId: req.body.courseId,
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
    const courseId = req.params.courseID;
  
    ParentalControl.findAll({ where: { courseId: courseId } })
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
  
    ParentalControl.findAll({ where: { userAddress: userAddress } })
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
    const address = req.params.address;
    const courseId = req.params.courseID;
  
    ParentalControl.findAndCountAll({ where: { userAddress: address, courseId: courseId} })
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
	const address = req.params.address;

	ParentalControl.update(req.body, {
		where: { address }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Account was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update account with address=${address}. Maybe account was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Error updating account with address=${address}, ${err}`
			});
		});
};

exports.delete = (req, res) => {
    if (!req.params.address || !req.params.courseID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    ParentalControl.destroy({
      where: { userAddress: rreq.params.address, courseId: rreq.params.courseID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Enrollment was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot unenroll. Maybe enrollment was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
  }