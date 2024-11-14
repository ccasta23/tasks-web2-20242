import express from 'express'
import 'dotenv/config';
import { routerTasks } from './routes/index.js';
import { writeLog } from './utils/files.js';

const app = express();

app.use(express.json());


// Crear Middleware 
app.use((req, res, next) => {
    console.log('Middleware');
    writeLog(req);
    next();
})

routerTasks(app)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
