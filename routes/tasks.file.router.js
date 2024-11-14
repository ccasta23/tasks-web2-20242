import express from "express";
import {read, write} from "../utils/files.js";
import dayjs from "dayjs";
export const tasksFileRouter = express.Router();

tasksFileRouter.get("/", (req, res) => {
    let tasks = read();
    let done = req.query.done;
    //Cambiar done de string a boolean
    if (done === 'true') {
        done = true;
    } else if (done === 'false') {
        done = false;
    }
    console.log('req.query', req.query);
    console.log('tasks', tasks);
    if (req.query.done || req.query.limit) {
        tasks = req.query.done ? tasks.filter(task => task.done === done): tasks;
        tasks = req.query.limit ? tasks.slice(0, parseInt(req.query.limit)) : tasks;
        res.json(tasks);
        return;
    }
    console.log('tasks', tasks);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(tasks));
})

tasksFileRouter.post('/',
    (req, res, next) => {
        req.body.ip = req.ip;
        req.body.created_at = dayjs().format('HH:mm DD-MM-YYYY');
        next();
    }, 
    (req, res) => {
    const tasks = read();
    //Añadir ID a los datos recibidos
    const task = {
        ...req.body, //Spread operator
        id: tasks.length + 1
    }
    tasks.push(task);
    //fs.writeFileSync('tasks.json', JSON.stringify(tasks));
    write(tasks);
    //Código HTTP 201 Created
    res.status(201).json(tasks);
})

tasksFileRouter.get('/:id', (req, res) => {
    const tasks = read();
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (task) {
        res.json(task);
    } else {
        res.status(404).end();
    }
})

tasksFileRouter.put('/:id', 
    (req, res, next) => {
        req.body.ip = req.ip;
        req.body.updated_at = dayjs().format('HH:mm DD-MM-YYYY');
        next();
    }, 
    (req, res) => {
        const tasks = read();
        let task = tasks.find(task => task.id === parseInt(req.params.id));
        if (task) {
            //Actualizar task
            task = {
                ...task,
                ...req.body
            }
            //Actualizar task en el array
            tasks[
                tasks.findIndex(task => task.id === parseInt(req.params.id))
            ] = task;
            //fs.writeFileSync('tasks.json', JSON.stringify(tasks));
            write(tasks);
            res.json(task);
        } else {
            res.status(404).end();
        }
    }
)

tasksFileRouter.put('/update/to/done', (req, res) => {
    let tasks = read();
    tasks = tasks.map(task => {
        task.done = true;
        task.updated_at = dayjs().format('HH:mm DD-MM-YYYY');
        return task;
    });
    write(tasks);
    res.json(tasks);
})

tasksFileRouter.delete('/:id', (req, res) => {
    const tasks = read();
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (task) {
        //Eliminar task
        tasks.splice(
            tasks.findIndex(task => task.id === parseInt(req.params.id)),
            1
        );
        //fs.writeFileSync('tasks.json', JSON.stringify(tasks));
        write(tasks);
        res.json(task);
    } else {
        res.status(404).end();
    }
})