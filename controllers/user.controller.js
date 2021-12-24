const db = require("../models");
const User = db.users;
const sequelize = db.sequelize
const { QueryTypes, Op } = require('sequelize');

// Create a new User
exports.create = async (req, res) => {
	const userData = req.body
	if (!userData.address || !userData.role || !userData.fullName || !userData.email || !userData.workLocation || !userData.dateOfBirth) {
		res.status(400).send({
			message: "A required field is missing!"
		});
		return;
	}

    try {
        const user = {
            address: userData.address,
            role: userData.role,
            fullName: userData.fullName,
            email: userData.email,
            workLocation: userData.workLocation,
            dateOfBirth: userData.dateOfBirth
        }
        await User.create(user)
        res.status(201).send({ message: 'Signup successfully' })
    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the account."
        });
    }
}

// Retrieve all users
exports.findAll = (req, res) => {
	condition = req.query
	User.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving accounts."
			});
		});
};

// Retrieve single user with address
exports.findOne = (req, res) => {
	const address = req.params.address;

	User.findByPk(address)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving account with address=" + address + ", " + err
			});
		});
};

// Retrieve users with a certain role
exports.findUnverified = (req, res) => {

	User.findAll({ where: { verified: false } })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving accounts."
			});
		});
};
j2

// Retrieve users with a certain role
exports.findByRole = (req, res) => {
	const role = req.params.role;

	User.findAll({ where: { role: role } })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving accounts."
			});
		});
};

//Edit an user with address
exports.edit = (req, res) => {
	const address = req.params.address;

	User.update(req.body, {
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

//Delete an user with address
exports.delete = (req, res) => {
	const address = req.params.address;

	User.destroy({
		where: { address: address }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Account was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete account with address=${address}. Maybe account was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Could not delete account with address=${address}. ${err}`
			});
		});
};





