import express from "express";
export const tasksRouter = express.Router();
import { index, create, show, update, destroy } 
from "../services/tasks.service.js";
import { createTaskSchema, getTaskSchema, updateTaskSchema } from "../schemas/tasks.schema.js";
import { validatorHandler } from "../middlewares/validator.handler.js";


tasksRouter.get("/", async (req, res) => {
    const tasks = await index();
    console.log('GET /api/v1/tasks');
    res.json({tasks});
})

tasksRouter.post('/', 
    validatorHandler(createTaskSchema, 'body'),
    async (req, res) => {
        const task = req.body;
        const newTask = await create(task);
        console.log('POST /api/v1/tasks');
        res.status(201).json({task: newTask});
    }
)

tasksRouter.get('/:id', 
    validatorHandler(getTaskSchema, 'params'),
    async (req, res) => {
        console.log('GET /api/v1/tasks/:id');
        const id = req.params.id;
        const task = await show(id);
        if (!task) {
            return res.status(404)
            .json({error: 'Task not found'});
        }
        res.json({task});
    }
)

tasksRouter.put('/:id', 
    validatorHandler(getTaskSchema, 'params'),
    validatorHandler(updateTaskSchema, 'body'),
    async (req, res) => {
        console.log('PUT /api/v1/tasks/:id');
        const id = req.params.id;
        const task = req.body;
        const updatedTask = await update(id, task);
        if (!updatedTask) {
            return res.status(404)
            .json({error: 'Task not found'});
        }
        res.json({task: updatedTask});
    }
)

tasksRouter.delete('/:id',
    validatorHandler(getTaskSchema, 'params'),
    async (req, res) => {
        console.log('DELETE /api/v1/tasks/:id');
        const id = req.params.id
        const task = await destroy(id);
        if(!task){
            return res.status(404).json({error: 'Task not found', 'deleted': false});
        }
        res.status(200).json({task: task, 'deleted': true});
    }
)