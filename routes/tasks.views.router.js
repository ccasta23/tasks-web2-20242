import express from "express";
import { index, create, destroy, update } from "../services/tasks.service.js";
export const tasksViewsRouter = express.Router();

tasksViewsRouter.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/auth/login");
    }
})

tasksViewsRouter.get("/", async (req, res) => {
    const tasks = await index();
    res.render('index', {
        tasks,
        user: req.user
    });
})

tasksViewsRouter.post("/", async (req, res) => {
    console.log("body", req.body);
    let { title, done } = req.body;
    done = done === "on";
    await create({title, done});
    res.redirect("/tasks");
})

tasksViewsRouter.post('/edit/:id', async (req, res) => {
    console.log("params", req.params);
    console.log("body", req.body);
    const { id } = req.params;
    let { title, done } = req.body;
    done = (done === "on") ? true : false;
    await update(id, {title, done});
    res.redirect("/tasks");
})

tasksViewsRouter.post("/destroy/:id", async (req, res) => {
    console.log("params", req.params);
    const { id } = req.params;
    await destroy(id);
    res.redirect("/tasks");
})