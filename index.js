import cors from "cors";
import "dotenv/config";
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
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentRoutes(app, db);
EnrollmentRoutes(app, db);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
