import "dotenv/config";
import cors from "cors";
import express from "express";
import session from "express-session";
import Hello from "./Hello.js";
import CourseRoutes from "./kambaz/courses/routes.js";
import Lab5 from "./lab5/index.js";
import UserRoutes from "./kambaz/users/routes.js";
import db from "./kambaz/database/index.js";
import ModulesRoutes from "./kambaz/modules/routes.js";
import AssignmentRoutes from "./kambaz/assignments/routes.js";
import EnrollmentRoutes from "./kambaz/enrollments/routes.js";
import mongoose from "mongoose";
import QuizRoutes from "./kambaz/quizzes/routes.js";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

mongoose.connect(CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
  
const app = express();
app.use(
  cors({
    credentials: true, // cookies
    origin: process.env.CLIENT_URL || "http://localhost:3000", // cors resource sharing
  }),
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModulesRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
QuizRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
