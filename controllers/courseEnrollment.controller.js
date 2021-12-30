const db = require("../models");
const CourseEnrollment = db.courseEnrollments;
const Op = db.Sequelize.Op;

exports.enroll = (req, res) => {
    if (!req.body.userAddress || !req.body.courseCourseID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    const courseEnrollment = {
        userAddress: req.body.userAddress,
        courseCourseID: req.body.courseCourseID,
    };

    CourseEnrollment.create(courseEnrollment)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while enrolling."
        });
      });
  };

exports.getAllCourseEnrollments = (req, res) => {
    condition = req.query
    CourseEnrollment.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
}

exports.getCourseEnrolledStudents = (req, res) => {
    const courseId = req.params.courseID;

    CourseEnrollment.findAll({ where: { courseCourseId: courseId } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
}

exports.getUserEnrolledCourses = (req, res) => {
    const userAddress = req.params.address;

    CourseEnrollment.findAll({ where: { userAddress: userAddress } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
}

exports.checkEnrollment = (req, res) => {
    const address = req.params.address;
    const courseId = req.params.courseID;

    CourseEnrollment.findAndCountAll({ where: { userAddress: address, courseCourseId: courseId} })
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

exports.unenroll = (req, res) => {
    if (!req.params.address || !req.params.courseID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    CourseEnrollment.destroy({
      where: { userAddress: req.params.address, courseCourseId: req.params.courseID }
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
