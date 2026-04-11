import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function AssignmentsDao() {
  async function findAllAssignments() {
    return await model.find();
  }

  async function getAssignmentsByCourse(courseId) {
    const assignments = await model.find({course: courseId});
    return assignments;
  }

  // create assignmnet
  async function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return await model.create(newAssignment);
  }

  // retrieve assignment
  async function getAssignmentById(assignmentId) {
    return await model.findById(assignmentId);
  }

  // update assigment
  async function updateAssignment(assignmentId, assignmentUpdate) {
    return await model.updateOne(
      { _id: assignmentId },
      { $set: assignmentUpdate },
    );
  }

  // delete assignment
  async function deleteAssignment(assignmentId) {
    return await model.deleteOne({_id: assignmentId});
  }

  return {
    findAllAssignments,
    getAssignmentsByCourse,
    getAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
