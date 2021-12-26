const db = require("../models");
const Exercise = db.exercises;
const sequelize = db.sequelize
const { QueryTypes, Op } = require('sequelize');

// Create a new exercise
exports.create = async (req, res) => {
	const exerciseData = req.body
	if (!exerciseData.title || !exerciseData.week || !exerciseData.courseCourseID || !exerciseData.description || !exerciseData.answer) {
		res.status(400).send({
			message: "A required field is missing!"
		});
		return;
	}

    try {
        const exercise = {
            title: exerciseData.title,
            week: exerciseData.week,
            courseCourseID: exerciseData.courseCourseID,
            description: exerciseData.description,
            file: exerciseData.file,
			answer: exerciseData.answer
        }
        await Exercise.create(exercise)
        res.status(201).send({ message: 'Created successfully' })
    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the exercise."
        });
    }
}

// Retrieve all exercise
exports.findAll = (req, res) => {
	condition = req.query
	Exercise.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving exercises."
			});
		});
};

// Retrieve excerise of a course
exports.findOne = (req, res) => {
	const id = req.params.id;

	Exercise.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving exercise with id=" + id + ", " + err
			});
		});
};

// Retrieve users with a certain role
exports.findByCourse = (req, res) => {
	const id = req.params.id;

	Exercise.findAll({ where: { courseCourseID: id } })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving exercises."
			});
		});
};

//Update/edit a exercise with id
exports.edit = (req, res) => {
	const id = req.params.id;

	Exercise.update(req.body, {
		where: { exerciseID: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Exercise was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot exercise account with id=${id}. Maybe exercise was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Error updating exercise with address=${id}, ${err}`
			});
		});
};

// Delete a exercise with id
exports.delete = (req, res) => {
	const id = req.params.id;

	Exercise.destroy({
		where: { exerciseID: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Exercise was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete exercise with address=${id}. Maybe exercise was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Could not delete exercise with address=${id}. ${err}`
			});
		});
};





