import express from 'express'
import 'dotenv/config';
import { routerTasks } from './routes/index.js';
import { writeLog } from './utils/files.js';
import { configurePassport } from './config/passport.js';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
configurePassport(app);


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
