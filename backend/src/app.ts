import express, { Request, Response, NextFunction } from "express";
import Logger from "./core/Logger";
import cors from "cors";
import { corsUrl, environment } from "./config/config";
import routes from "./routes";
import "./database";
import { ApiError, ErrorType, InternalError, NotFoundError } from "./core/api-error";

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

const app = express();
//test route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

app.use((req, res, next) => {
  Logger.info(`${req.method} - ${req.originalUrl} - ${req.ip}`);
  next();
});
app.use("/v1", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL) Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  } else {
    Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    Logger.error(err);
    if (environment === "development") {
      res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
