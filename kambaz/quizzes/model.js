import mongoose from "mongoose";
import * as schemas from "./schema.js";

export const Quiz = mongoose.model("QuizModel", schemas.quizSchema, "quizzes");
export const QuizAttempt = mongoose.model("QuizAttemptModel", schemas.quizAttemptSchema, "quizAttempts");

