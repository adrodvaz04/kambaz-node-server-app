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
  title: String,
  user_id: { type: String, ref: "UserModel" },
  course: { type: String, ref: "CourseModel" },
  availableFrom: Date,
  availableUntil: Date,
  dueDate: Date,
  points: Number,
  // Quiz Details
  quiz_id: { type: String, ref: "QuizModel" },
  quizType: { type: String, enum: QuizTypes }, 
  assignment_group: { type: String, enum: AssignmentGroups }, 
  shuffle_answers: Boolean,
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
      quiz_id: { type: String, ref: "QuizModel" },
      title: String,
      questionType: { type: String, enum: QuestionTypes },
      points: Number,
      question: String,
      answers: [String],
    },
  ]
});

const quizAttemptSchema = new mongoose.Schema({
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
