module.exports = (sequelize, DataTypes) => {
    const CourseEnrollment = sequelize.define("courseEnrollment", {
        
    }, 
    {
        tableName: "courseEnrollments",
        timestamps: false
    });
    
    return CourseEnrollment;

};