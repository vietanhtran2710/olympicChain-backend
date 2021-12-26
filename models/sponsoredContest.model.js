module.exports = (sequelize, DataTypes) => {
    const SponsoredConest = sequelize.define("sponsoredConest", {
        
    }, 
    {
        tableName: "sponsoredConests",
        timestamps: false
    });
    
    return SponsoredConest;

};