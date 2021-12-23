module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define("test", {
        address: {
            type: DataTypes.String(40),
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100)
        },
        description: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: "tests",
        timestamps: true,
    })

    return Test;
};