import { v4 as uuidv4 } from "uuid";
import { Quiz, QuizAttempt } from "./model.js";
import { model } from "mongoose";

export default function QuizzesDao() {
  // get quizzes by course
  async function getQuizzesByCourse(courseId) {
    const quizzes = await Quiz.find({ course: courseId });
    return quizzes;
  }

  async function getQuizzesByUser(userId) {
    const quizzes = await Quiz.find({ user_id: userId });
    return quizzes;
  }

  async function getPublishedQuizzesbyCourse(courseId) {
    const quizzes = await Quiz.find({
      $and: [{ course: courseId }, { published: true }],
    });
  }

  // create quiz: create quiz, quiz detail, quiz questions
  async function createQuiz(quiz) {
    return await Quiz.create({ ...quiz, _id: uuidv4() });
  }

  // update quiz: update quiz instance, update quiz details
  async function updateQuiz(quiz) {
    return await Quiz.findOneAndUpdate(quiz);
  }

  // delete quiz: delete quiz instance, delete quiz details
  async function deleteQuiz(quizId) {
    return await Quiz.findOneAndDelete(quizId);
  }

  // addQuizAttempt
  async function addQuizAttempt(attempt) {
    return await QuizAttempt.create({ ...attempt, _id: uuidv4() });
  }

  //find quiz attempts by quiz
  async function getQuizAttempts(quizId) {
    return await QuizAttempt.find({ quiz_id: quizId });
  }

  // find quiz attempts by course
  async function getQuizAttemptsByCourse(courseId) {
    return await QuizAttempt.populate("quiz_id").find({ course: courseId });
  }

  // find quiz attempts by user
  async function getQuizAttemptsByUser(userId) {
    return await QuizAttempt.find({ user_id: userId });
  }

  // delete quiz attempt
  async function deleteQuizAttempt(attemptId) {
    return await QuizAttempt.findOneAndDelete({ _id: attemptId });
  }

  async function deleteAllQuizAttempts(quizId) {
    return await QuizAttempt.deleteMany({ quiz_id: quizId });
  }


  async function getQuizById(quizId) {
    // console.log("searching for:", quizId);
    const quiz = await Quiz.findOne({ _id: quizId });
   // console.log("result:", quiz);
    return quiz;
  }

  return {
    getQuizzesByCourse,
    getQuizzesByUser,
    getPublishedQuizzesbyCourse,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    addQuizAttempt,
    getQuizById,
    getQuizAttempts,
    getQuizAttemptsByCourse,
    getQuizAttemptsByUser,
    deleteQuizAttempt,
    deleteAllQuizAttempts,
  };
}
