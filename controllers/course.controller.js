const db = require("../models");
const Course = db.courses;
const sequelize = db.sequelize
const { QueryTypes, Op } = require('sequelize');

// Create a new Course
exports.create = async (req, res) => {
	const courseData = req.body
	if (!courseData.name || !courseData.week || !courseData.description || !courseData.userAddress) {
		res.status(400).send({
			message: "A required field is missing!"
		});
		return;
	}

    try {
        const course = {
            name: courseData.name,
            week: courseData.week,
            description: courseData.description,
            userAddress: courseData.userAddress
        }
        await Course.create(course)
        res.status(201).send({ message: 'Course created successfully' })
    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the course."
        });
    }
}

// Retrieve all users
exports.findAll = (req, res) => {
	condition = req.query
	Course.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving courses."
        });
    });
};

// Retrieve single course with id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Course.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving course with id=" + id + ", " + err
        });
    });
};

// Retrieve all course of a certain teacher
exports.findByTeacher = (req, res) => {
	const teacherAddress = req.params.address;

	Course.findAll({ where: { userAddress: teacherAddress } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving courses."
        });
    });
};

//Edit a course with id
exports.edit = (req, res) => {
	const id = req.params.id;

	Course.update(req.body, {
		where: { courseID: id }
	})
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Course was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Course with id=${id}. Maybe course was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error updating course with id=${id}, ${err}`
        });
    });
};

//Delete an user with address
exports.delete = (req, res) => {
	const id = req.params.id;

	Course.destroy({
		where: { courseID: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Course was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete course with id=${id}. Maybe course was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Could not delete course with id=${id}. ${err}`
			});
		});
};





