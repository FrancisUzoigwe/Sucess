import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { STATUS, errorFile } from "./error/errorFile";
import { errorHandler } from "./error/errorHandler";
import auth from "./router/authRouter"

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(STATUS.OK).json({
        message:
          "You've successfully suscribed to Francis Kossyrisochukwu Uzoigwe's Api, enjoy!!!",
      });
    } catch (error) {
      return res.status(STATUS.BAD).json({
        message: "You'd have to go premuim to have full access to this api",
      });
    }
  });
  app.all(
    "*",
    (error: errorFile, req: Request, res: Response, next: NextFunction) => {
      next(
        new errorFile({
          errorName: `Route Error ${req.originalUrl}`,
          errorMessage: `This is as a result of route error: ${req.originalUrl}`,
          errorStatus: STATUS.BAD,
          errorSuccess: false,
        })
      );
    }
  );
  app.use(errorHandler);
  app.use("/api/v2", auth)
};
