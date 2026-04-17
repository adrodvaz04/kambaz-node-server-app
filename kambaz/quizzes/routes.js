import QuizzesDao from "./dao.js";
import UsersDao from "../users/dao.js";
export default function QuizRoutes(app) {
  const quizDao = QuizzesDao();
  const userDao = UsersDao();

  const getQuizzesByCourse = async (req, res) => {
    const { courseId } = req.params;
    const { published } = req.query;

    if (published) {
      const quizzes = await quizDao.getPublishedQuizzesbyCourse(courseId);
      res.json(quizzes);
      return;
    }

    const quizzes = await quizDao.getQuizzesByCourse(courseId);
    res.json(quizzes);
  };

  const getQuizzesByUser = async (req, res) => {
    const { username, password } = req.body;

    const currentUser = userDao.findUserByCredentials(username, password);
    if (!currentUser) {
      res.status(400).json({ message: "Current user not found" });
    }

    const quizzes = await quizDao.getQuizzesByUser(currentUser._id);
  };

  const getQuizById = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await quizDao.getQuizById(quizId);
    if (!quiz) {
      res.status(400).message(`Quiz with ID ${quizId} not found.`);
      return;
    }
    res.json(quiz);
  };

  const createQuiz = async (req, res) => {
    const { quiz, username, password } = req.body;

    if (!quiz) {
      res.status(400).json({ message: "Quiz to create not found" });
      return;
    }

    const currentuser = await userDao.findUserByCredentials(username, password);
    if (!currentUser) {
      res.status(400).json({ message: "Current user not found." });
      return;
    }

    // add currentUser to quiz object
    let quizWithUser = { ...quiz, user_id: currentUser._id };

    const status = await quizDao.createQuiz(quizWithUser);
    res.json(status);
  };

  const updateQuiz = async (req, res) => {
    const { updates } = req.body;

    const updatedQuiz = await quizDao.updateQuiz(updates);
    res.json(updatedQuiz);
  };

  const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;
    const status = await quizDao.deleteQuiz(quizId);
    res.status(status);
  };

  const addQuizAttempt = async (req, res) => {
    const { attempt, username, password } = req.body;
    const currentUser = await userDao.findUserByCredentials(username, password);

    if (!currentUser) {
      res.status(400).json({ message: "Current user not found" });
      return;
    }

    const attemptWithUser = { ...attempt, user_id: currentUser._id };

    const status = await quizDao.addQuizAttempt(attemptWithUser);
    res.status(status);
  };

  const getQuizAttempts = async (req, res) => {
    const { quizId, courseId } = req.query;
    const { username, password } = req.body;

    if (quizId) {
      const attempts = await quizDao.getQuizAttempts(quizId);
      res.json(attempts);
      return;
    }

    if (courseId) {
      const attempts = await quizDao.getQuizAttemptsByCourse(courseId);
      res.json(attempts);
      return;
    }

    if (username && password) {
      const currentUser = await userDao.findUserByCredentials(
        username,
        password,
      );
      if (!currentUser) {
        res.status(400).json({ message: "Current user not found." });
        return;
      }

      const attempts = await quizDao.getQuizAttemptsByUser(currentUser._id);
      res.json(attempts);
      return;
    }

    res
      .status(400)
      .json({ message: "Quiz ID, course ID, and credentials not found." });
  };

  const deleteQuizAttempt = async (req, res) => {
    const { attemptId } = req.params;
    const status = await quizDao.deleteQuizAttempt(attemptId);
    res.status(status);
  };

  const deleteAllQuizAttempts = async (req, res) => {
    const { quizId } = req.params;
    const status = await quizDao.deleteAllQuizAttempts(quizId);
    res.status(status);
  };

  app.get("/api/quizzes/course/:courseId", getQuizzesByCourse);
  app.get("/api/quizzes", getQuizzesByUser); // needs credentials
  app.get("/api/quizzes/:quizId", getQuizById);
  app.post("/api/quizzes", createQuiz);
  app.put("/api/quizzes", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
  app.post("/api/quizzes/:quizId/attempts", addQuizAttempt); // needs credentials for user
  app.get("/api/quizzes/:quizId/attempts", getQuizAttempts);
  app.get("/api/quizzes/attempts", getQuizAttempts);
  app.delete("/api/quizzes/:quizId/attempts", deleteAllQuizAttempts);
  app.delete("/api/quizzes/attempts/:attemptId", deleteQuizAttempt);
}
