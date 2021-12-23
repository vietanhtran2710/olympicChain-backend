const db = require("../models");
const Course = db.users;
const sequelize = db.sequelize
const { QueryTypes, Op } = require('sequelize');

// Create a new Course
exports.create = async (req, res) => {
	const courseData = req.body
	if (!courseData.name || !courseData.week || !courseData.description || !courseData.user_address) {
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
            user_id: courseData.user_id
        }
        await Course.create(course)
        res.status(201).send({ message: 'Signup successfully' })
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

	Course.findAll({ where: { user_address: teacherAddress } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving courses."
        });
    });
};

//Edit an user with address
exports.edit = (req, res) => {
	const address = req.params.address;

	Course.update(req.body, {
		where: { address }
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
            message: `Error updating account with id=${id}, ${err}`
        });
    });
};

//Delete an user with address
exports.delete = (req, res) => {
	const id = req.params.id;

	Account.destroy({
		where: { id: id }
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





