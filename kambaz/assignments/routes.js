import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const getAllAssignments = (req, res) => {
    const assignments = dao.findAllAssignments();
    res.json(assignments);
  };

  const getAssignmentsByCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.getAssignmentsByCourse(courseId);
    res.json(assignments);
  };

  const createAssignment = (req, res) => {
    const newAssignment = dao.createAssignment(req.body);
    res.json(newAssignment);
  };

  const getAssignmentById = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.getAssignmentById(assignmentId);
    res.json(assignment);
  };

  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdate = req.body;
    const status = dao.updateAssignment(assignmentId, assignmentUpdate);
    res.send(status);
  };

  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    dao.deleteAssignment(assignmentId);
  };

  app.get("/api/assignments", getAllAssignments);
  app.get("/api/assignments/course/:courseId", getAssignmentsByCourse);
  app.post("/api/assignments", createAssignment);
  app.get("/api/assignments/:assignmentId", getAssignmentById);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
