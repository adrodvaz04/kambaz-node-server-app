import { v4 as uuidv4 } from "uuid";
export default function AssignmentsDao(db) {
  function findAllAssignments() {
    return db.assignments;
  }

  function getAssignmentsByCourse(courseId) {
    const {assignments} = db;
    return assignments.filter((a) => a.course === courseId);
  }

  // create assignmnet
  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }

  // retrieve assignment
  function getAssignmentById(assignmentId) {
    const { assignments } = db;
    const assignment = assignments.find((a) => a._id === assignmentId);
    return assignment;
  }

  // update assigment
  function updateAssignment(assignmentId, assignmentUpdate) {
    const { assignments } = db;
    const assignment = assignments.find((a) => a._id === assignmentId);
    Object.assign(assignment, assignmentUpdate);
    return assignment;
  }

  // delete assignment
  function deleteAssignment(assignmentId) {
    const { assignments } = db;
    db.assignments = assignments.filter((a) => a._id !== assignmentId);
  }

  return {
    findAllAssignments,
    getAssignmentsByCourse,
    getAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment
  };
}
