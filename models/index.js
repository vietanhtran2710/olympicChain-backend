const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  timezone: '+07:00'
});

users = require("./user.model")(sequelize, DataTypes)
courses = require("./course.model")(sequelize, DataTypes)
questions = require("./question.model")(sequelize, DataTypes)
exercises = require("./exercise.model")(sequelize, DataTypes)
tests = require("./test.model")(sequelize, DataTypes)
questions = require('./question.model')(sequelize, DataTypes)
courseEnrollments = require('./courseEnrollment.model')(sequelize, DataTypes)
contestRegistrations = require('./contestRegistration.model')(sequelize, DataTypes)

users.hasMany(courses)
users.hasMany(tests)
courses.hasMany(tests)
courses.hasMany(exercises)
tests.hasMany(questions)
exercises.hasMany(questions)

users.belongsToMany(courses, { through: courseEnrollments})
courses.belongsToMany(users, { through: courseEnrollments})

users.belongsToMany(tests, { through: contestRegistrations})
tests.belongsToMany(users, { through: contestRegistrations})

const db = {
    users,
    courses,
    questions,
    exercises,
    tests,
    questions,
    courseEnrollments,
    contestRegistrations
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;