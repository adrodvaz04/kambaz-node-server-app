import enrollments from "../database/enrollments.js";
import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
    const dao = EnrollmentsDao();
    
    const findCoursesForUser = async (req, res) => {
        const {userId} = req.params;
        const userEnrollments = await dao.findCoursesForUser(userId);
        res.send(userEnrollments);
    }
    
    const enrollUserInCourse = async (req, res) => {
        const { userId, courseId } = req.body;
        const newEnrollment = await dao.enrollUserInCourse(userId, courseId);
        res.send(newEnrollment);
    }

    const unenrollUserFromCourse = async (req, res) => {
        const { userId, courseId } = req.params;
        await dao.unenrollUserFromCourse(userId, courseId);
        res.send(200);
    }

    app.get('/api/enrollments/:userId', findCoursesForUser);
    app.post('/api/enrollments', enrollUserInCourse);
    app.delete('/api/enrollments/:userId/:courseId', unenrollUserFromCourse);
}