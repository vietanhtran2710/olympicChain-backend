module.exports = (sequelize, DataTypes) => {
    const Exercise = sequelize.define("exercise", {
        exerciseID: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        file: {
            type: DataTypes.TEXT
        },
        title: {
            type: DataTypes.STRING(100)
        },
        week: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        description: {
            type: DataTypes.TEXT
        },
        answer: {
            type: DataTypes.STRING(100)
        }
    }, {
        tableName: "exercises",
        timestamps: true,
    })

    return Exercise;
};