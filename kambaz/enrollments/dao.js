import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function getEnrollments(userId) {
    const { enrollments } = db;
    return enrollments.filter((e) => e.user === userId);
  }

  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments = [...enrollments, newEnrollment];
    return newEnrollment;
  }

  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.filter((e) => e.user !== userId || e.course !== courseId); // not user and course => either not user or not course
    db.enrollments = enrollments;
  }

  return { getEnrollments, enrollUserInCourse, unenrollUserFromCourse };
}
