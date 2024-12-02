import { defineTasks } from './tasks.model.js'
import { defineUsers } from './users.model.js'

export function defineModels(sequelize){
    defineTasks(sequelize)
    defineUsers(sequelize)
}