import mongoose from "mongoose";

const QuizTypes = [
  "graded-quiz",
  "practice-quiz",
  "graded-survey",
  "ungraded-survey",
];
const AssignmentGroups = ["quizzes", "exams", "assignments", "projects"];
const QuestionTypes = ["true-false", "multiple-choice", "fill-in-blank"];

const quizSchema = new mongoose.Schema({
  _id: String,
  title: String,
  user_id: { type: String, ref: "UserModel" },
  course: { type: String, ref: "CourseModel" },
  availableFrom: Date,
  availableUntil: Date,
  dueDate: Date,
  points: Number,
  published: Boolean,
  // Quiz Details
  quizType: { type: String, enum: QuizTypes, default: "graded-quiz" },
  assignment_group: {
    type: String,
    enum: AssignmentGroups,
    default: "quizzes",
  },
  shuffle_answers: { type: Boolean, default: true },
  time_limit_mins: { type: Number, default: 20 },
  multiple_attempts: { type: Boolean, default: true },
  max_attempts: { type: Number, default: 1 },
  show_correct_answers: Date,
  access_code: { type: String, default: "" },
  one_question_at_a_time: { type: Boolean, default: true },
  webcam_required: { type: Boolean, default: false },
  lock_questions: Boolean,
  questions: [
    {
      title: String,
      questionType: { type: String, enum: QuestionTypes },
      points: Number,
      question: String,
      answers: [String],
      correctAnswers: [String],
    },
  ],
});

const quizAttemptSchema = new mongoose.Schema({
  _id: String,
  quiz_id: { type: String, ref: "QuizModel" },
  user_id: { type: String, ref: "UserModel" },
  answers: [
    {
      question_id: { type: String, ref: "QuizQuestionModel" },
      answer: String,
    },
  ],
  attemptDate: Date,
});

export { quizSchema, quizAttemptSchema };
