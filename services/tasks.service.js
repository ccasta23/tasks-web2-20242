import {sequelize} from '../libs/sequelize.js'

async function index() {
    console.log('INDEX /api/v1/tasks');
    const tasks = await sequelize.models.task.findAll()
    return tasks
}

async function create(task) {
    const newTask = await sequelize.models.task.create({
        title: task.title
    })
    return newTask
}

async function show(id) {
    console.log('SHOW /api/v1/tasks/:id');
    const task = await sequelize.models.task.findByPk(id)
    return task
}

async function update(id, task) {
    console.log('UPDATE /api/v1/tasks/:id');
    const searchedTask = await sequelize.models.task.findByPk(id)
    if(!searchedTask) {
        return false
    }
    const [rowsAffected, [updatedTask]] = await sequelize.models.task.update({
        title: task.title
    }, {
        where: {
            id
        },
        returning: true
    })
    return updatedTask
}

function destroy() {
    console.log('DESTROY /api/v1/tasks/:id');
}

export {
    index,
    create,
    show,
    update,
    destroy
}