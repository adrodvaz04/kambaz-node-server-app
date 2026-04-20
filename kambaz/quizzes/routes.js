import QuizzesDao from "./dao.js";
import UsersDao from "../users/dao.js";
export default function QuizRoutes(app) {
  const quizDao = QuizzesDao();
  const userDao = UsersDao();

  const getQuizzes = async (req, res) => {
    const { courseId, userId, published } = req.query;
    let quizzes;
    if (courseId) {
      quizzes = published
        ? await quizDao.getPublishedQuizzesbyCourse(courseId)
        : await quizDao.getQuizzesByCourse(courseId);
    } else if (userId) {
      quizzes = await quizDao.getQuizzesByUser(userId);
    }

    if (!quizzes) {
      res.status(400).json({message: "Quizzes not found."});
    }

    res.json(quizzes);
  };

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
    const { userId } = req.body;

    const currentUser = userDao.findUserById(userId);
    if (!currentUser) {
      res.status(400).json({ message: "Current user not found" });
    }

    const quizzes = await quizDao.getQuizzesByUser(currentUser._id);
  };

  const getQuizById = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await quizDao.getQuizById(quizId);
    if (!quiz) {
      res.status(400).json({message: `Quiz with ID ${quizId} not found.`});
      return;
    }
    res.json(quiz);
  };

  const createQuiz = async (req, res) => {
    const { quiz } = req.body;

    if (!quiz) {
      res.status(400).json({ message: "Quiz to create not found" });
      return;
    }

    // validate associated userId exists
    const currentUser = await userDao.findUserById(quiz.userId);
    if (!currentUser) {
      res.status(400).json({ message: "Current user not found." });
      return;
    }

    const status = await quizDao.createQuiz(quiz);
    res.json(status);
  };

  const updateQuiz = async (req, res) => {
    const { updates } = req.body;

    const updatedQuiz = await quizDao.updateQuiz(updates);
    res.json(updatedQuiz);
  };

  const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;
    const deletedQuiz = await quizDao.deleteQuiz(quizId);
    res.json(deletedQuiz);
  };

  const addQuizAttempt = async (req, res) => {
    const { attempt } = req.body;
    const currentUser = await userDao.findUserById(attempt.user_id);

    if (!currentUser) {
      res.status(400).json({ message: "Current user not found" });
      return;
    }

    const attemptWithUser = { ...attempt };

    const newAttempt = await quizDao.addQuizAttempt(attemptWithUser);
    res.json(newAttempt);
  };

  const getQuizAttempts = async (req, res) => {
    const { quizId, courseId } = req.query;
    const { userId } = req.body;

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

    if (userId) {
      if (!userDao.findUserById) {
        res.status(400).json({ message: "Current user not found." });
        return;
      }

      const attempts = await quizDao.getQuizAttemptsByUser(userId);
      res.json(attempts);
      return;
    }

    res
      .status(400)
      .json({ message: "Quiz ID, course ID, and credentials not found." });
  };

  const deleteQuizAttempt = async (req, res) => {
    const { attemptId } = req.params;
    const deletedAttempt = await quizDao.deleteQuizAttempt(attemptId);
    res.json(deletedAttempt);
  };

  const deleteAllQuizAttempts = async (req, res) => {
    const { quizId } = req.params;
    const deleted = await quizDao.deleteAllQuizAttempts(quizId);
    res.json(deleted);
  };

  app.get("/api/quizzes", getQuizzes);
  app.get("/api/quizzes/:quizId", getQuizById);
  app.post("/api/quizzes", createQuiz);
  app.put("/api/quizzes", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
  app.post("/api/quizzes/:quizId/attempts", addQuizAttempt);
  app.get("/api/quizzes/:quizId/attempts", getQuizAttempts);
  app.get("/api/quizzes/attempts", getQuizAttempts);
  app.delete("/api/quizzes/:quizId/attempts", deleteAllQuizAttempts);
  app.delete("/api/quizzes/attempts/:attemptId", deleteQuizAttempt);
}
