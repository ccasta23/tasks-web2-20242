import dayjs from 'dayjs';
import fs from 'fs';

const FILENAME = 'tasks.json';

function read() {
    return JSON.parse(fs.readFileSync(FILENAME));
}

function write(data) {
    fs.writeFileSync(FILENAME, JSON.stringify(data));
}

function writeLog(req) {
    const now = dayjs().format('DD-MM-YYYY HH:mm:ss');
    fs.appendFileSync('access_log.txt', 
        now + ' ' + req.method + ' ' + req.path + ' ' 
        + JSON.stringify(req.headers) + '\n'
    );
}

export {
    read,
    write,
    writeLog
}