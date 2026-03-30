const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

const module = {
  id: 1,
  name: "on the way to vermont",
  description: "i have a tkd tournament",
  course: "taekwondo",
};

export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };
  const SetAssignmentCompleted = (req, res) => {
    const { completed } = req.params;
    module.completed = completed;
    res.json(module);
  };
  const getModule = (req, res) => {
    res.json(module);
  };
  const getModuleTitle = (req, res) => {
    res.json(module.name);
  };

  const SetModuleName = (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  };

  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/completed/:completed", SetAssignmentCompleted);
  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleTitle);
  app.get("/lab5/module/name/:newName", SetModuleName);
}
