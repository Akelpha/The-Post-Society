
import createError from "http-errors";
import express, { json, urlencoded } from "express";

import { join } from "path";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/posts";
import usersRouter from "./routes/users";

const app = express();

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "../public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: { message: any; status: any; }, req: { app: { get: (arg0: string) => string; }; }, res: { locals: { message: any; error: any; }; status: (arg0: any) => void; render: (arg0: string) => void; }, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
