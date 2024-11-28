import {sequelize} from '../libs/sequelize.js'

async function index() {
    console.log('INDEX /api/v1/tasks');
    const tasks = await sequelize.models.task.findAll()
    return tasks
}

async function create(task) {
    console.log('CREATE /api/v1/tasks');
    const newTask = await sequelize.models.task.create({
        title: task.title,
        done: (task.done) ? task.done : false
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
        title: task.title,
        done: (task.done) ? task.done : false
    }, {
        where: {
            id
        },
        returning: true
    })
    return updatedTask
}

async function destroy(id) {
    console.log('DESTROY /api/v1/tasks/:id');
    const task = await sequelize.models.task.findByPk(id)
    console.log(task)
    if(!task){
        return false
    }
    await sequelize.models.task.destroy(
        {
            where: {
                id
            }
        }
    )
    return task
}

export {
    index,
    create,
    show,
    update,
    destroy
}