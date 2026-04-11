import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const getAllAssignments = async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.json(assignments);
  };

  const getAssignmentsByCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.getAssignmentsByCourse(courseId);
    res.json(assignments);
  };

  const createAssignment = async (req, res) => {
    const newAssignment = await dao.createAssignment(req.body);
    res.json(newAssignment);
  };

  const getAssignmentById = async (req, res) => {
    const { assignmentId } = req.params;
    const assignment = await dao.getAssignmentById(assignmentId);
    res.json(assignment);
  };

  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdate = req.body;
    const status = await dao.updateAssignment(assignmentId, assignmentUpdate);
    res.send(status);
  };

  const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    await dao.deleteAssignment(assignmentId);
  };

  app.get("/api/assignments", getAllAssignments);
  app.get("/api/assignments/course/:courseId", getAssignmentsByCourse);
  app.post("/api/assignments", createAssignment);
  app.get("/api/assignments/:assignmentId", getAssignmentById);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
