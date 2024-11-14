import express from "express";
import { tasksFileRouter } from "./tasks.file.router.js";
import { tasksRouter } from "./tasks.router.js";
const router = express.Router();

export function routerTasks(app) {
    app.use("/api/v1", router);

    router.use("/file/tasks", tasksFileRouter);
    router.use("/tasks", tasksRouter);
}