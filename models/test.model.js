module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define("test", {
        address: {
            type: DataTypes.STRING(50),
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100)
        },
        description: {
            type: DataTypes.TEXT
        },
        stage: {
            type: DataTypes.STRING(20)
        }
    }, {
        tableName: "tests",
        timestamps: true,
    })

    return Test;
};
