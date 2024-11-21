import express from "express";
import { index } from "../services/tasks.service.js";
export const tasksViewsRouter = express.Router();

tasksViewsRouter.get("/", async (req, res) => {
    const tasks = await index();
    res.render('index', {
        tasks
    });
})