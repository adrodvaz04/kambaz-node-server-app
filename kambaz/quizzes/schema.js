import mongoose from "mongoose";

const QuizTypes = [
  "Graded Quiz",
  "Practice Quiz",
  "Graded Survey",
  "Ungraded Survey",
];
const AssignmentGroups = ["Quizzes", "Exams", "Assignments", "Projects"];
const QuestionTypes = ["True/False", "Multiple Choice", "Fill-in-the-blank"];

const quizSchema = new mongoose.Schema(
  {
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
    show_correct_answers: Boolean,
    access_code: { type: String, default: "" },
    one_question_at_a_time: { type: Boolean, default: true },
    webcam_required: { type: Boolean, default: false },
    lock_questions: Boolean,
    questions: [
      {
        _id: String,
        title: String,
        questionType: { type: String, enum: QuestionTypes },
        points: Number,
        question: String,
        answers: [
          {
            _id: String,
            text: String,
            correct: Boolean,
          },
        ],
      },
    ],
  },
  {
    collection: "quizzes",
  },
);

const quizAttemptSchema = new mongoose.Schema(
  {
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
  },
  {
    collection: "quizAttempts",
  },
);

export { quizSchema, quizAttemptSchema };
