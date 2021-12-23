const db = require("../models");
const Question = db.questions;
const sequelize = db.sequelize
const { QueryTypes, Op } = require('sequelize');

// Create a new question
exports.create = async (req, res) => {
	const questionData = req.body
	if (!questionData.questionText || !questionData.choices || !questionData.category || (!questionData.testAddress && !questionData.exerciseExerciseID)) {
		res.status(400).send({
			message: "A required field is missing!"
		});
		return;
	}

    try {
        const question = {
            questionText: questionData.questionText,
            choices: questionData.choices,
            testAddress: questionData.testAddress,
            exerciseExerciseID: questionData.exerciseExerciseID,
			category: questionData.category
        }
        await Question.create(question)
        res.status(201).send({ message: 'Created successfully' })
    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the question."
        });
    }
}

// Retrieve all questions
exports.findAll = (req, res) => {
	condition = req.query
	Question.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving questions."
			});
		});
};

// Retrieve questions of a exercise
exports.findByExercise = (req, res) => {
	const id = req.params.id;

	Question.findAll({ where: { exerciseExerciseID: id } })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving questions."
			});
		});
};

// Retrieve all questions of a certain test
exports.findByTest = (req, res) => {
	const address = req.params.address;

	Question.findAll({ where: { testAddress: address } })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving questions."
			});
		});
};

// Retrieve all questions of a certain category
exports.findByCategory = (req, res) => {
	const category = req.params.category;

	Question.findAll({ where: { category: category } })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving questions."
			});
		});
};

//Update/edit a question with id
exports.edit = (req, res) => {
	const id = req.params.id;

	Question.update(req.body, {
		where: { id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Question was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update question with id=${id}. Maybe question was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Error updating question with id=${id}, ${err}`
			});
		});
};

// Delete a question with id
exports.delete = (req, res) => {
	const id = req.params.id;

	Question.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Question was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete question with id=${id}. Maybe test was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Could not delete question with id=${id}. ${err}`
			});
		});
};





