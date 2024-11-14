import { defineTasks } from './tasks.model.js'

export function defineModels(sequelize){
    defineTasks(sequelize)

}