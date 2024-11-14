import { Sequelize } from 'sequelize';
//const defineModels = require('../db/models/index')
import { defineModels } from '../db/models/index.js';

// Option 2: Passing parameters separately (sqlite)
export const sequelize = new Sequelize({
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    'password': 'admin',
    'database': 'todos-web2-20242',
    dialect: 'postgres'
});

defineModels( sequelize )

sequelize.sync() // OJO: Usar en desarrollo, no en producción

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}