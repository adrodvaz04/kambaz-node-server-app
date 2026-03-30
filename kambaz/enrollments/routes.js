import enrollments from "../database/enrollments.js";
import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
    const dao = EnrollmentsDao(db);
    
    const getEnrollments = (req, res) => {
        const {userId} = req.params;
        const userEnrollments = dao.getEnrollments(userId);
        res.send(userEnrollments);
    }
    
    const enrollUserInCourse = (req, res) => {
        const { userId, courseId } = req.body;
        const newEnrollment = dao.enrollUserInCourse(userId, courseId);
        res.send(newEnrollment);
    }

    const unenrollUserFromCourse = (req, res) => {
        const { userId, courseId } = req.params;
        dao.unenrollUserFromCourse(userId, courseId);
        res.send(200);
    }

    app.get('/api/enrollments/:userId', getEnrollments);
    app.post('/api/enrollments', enrollUserInCourse);
    app.delete('/api/enrollments/:userId/:courseId', unenrollUserFromCourse);
}