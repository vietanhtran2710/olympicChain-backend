module.exports = app => {
    const courseEnrollment = require("../controllers/courseEnrollment.controller");

    var router = require("express").Router();

    router.get('/', courseEnrollment.getAllCourseEnrollments)

    router.get('/course/:courseID', courseEnrollment.getCourseEnrolledStudents)

    router.get('/user/:address', courseEnrollment.getUserEnrolledCourses)

    router.get('/check/:address/:courseID', courseEnrollment.checkEnrollment)

    router.post('/', courseEnrollment.enroll)

    router.delete('/:address/:courseID', courseEnrollment.unenroll)

    app.use('/api/courseEnrollment', router);
};