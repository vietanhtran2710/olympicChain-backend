const db = require("../models");
const Test = db.tests;
const sequelize = db.sequelize
const { QueryTypes, Op } = require('sequelize');

// Create a new test
exports.create = async (req, res) => {
	const testData = req.body
	if (!testData.address || !testData.title || !testData.description || !testData.userAddress) {
		res.status(400).send({
			message: "A required field is missing!"
		});
		return;
	}

    try {
        const user = {
            address: testData.address,
            title: testData.title,
            description: testData.description,
            userAddress: testData.userAddress,
			courseCourseID: testData.courseCourseID,
			stage: "REGISTERING"
        }
        await Test.create(user)
        res.status(201).send({ message: 'Created successfully' })
    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the test."
        });
    }
}

// Retrieve all tests
exports.findAll = (req, res) => {
	condition = req.query
	Test.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving tests."
			});
		});
};

// Retrieve single test with address
exports.findOne = (req, res) => {
	const address = req.params.address;

	Test.findByPk(address)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving test with address=" + address + ", " + err
			});
		});
};

// Retrieve all tests of a certain host
exports.findByHost = (req, res) => {
	const address = req.params.address;

	Test.findAll({ where: { userAddress: address } })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving tests."
			});
		});
};

//Edit an user with address
exports.edit = (req, res) => {
	const address = req.params.address;

	Test.update(req.body, {
		where: { address }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Test was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update test with address=${address}. Maybe account was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Error updating test with address=${address}, ${err}`
			});
		});
};

//Delete an user with address
exports.delete = (req, res) => {
	const address = req.params.address;

	Test.destroy({
		where: { address: address }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Test was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete test with address=${address}. Maybe test was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Could not delete test with address=${address}. ${err}`
			});
		});
};





