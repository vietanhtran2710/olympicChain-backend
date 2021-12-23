module.exports = (sequelize, DataTypes) => {
    const ParentalControl = sequelize.define("parentalControls", {
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, 
    {
        tableName: "parentalControls",
        timestamps: false
    });
    
    return ParentalControl;

};