import { Sequelize } from 'sequelize';
//const defineModels = require('../db/models/index')
import { defineModels } from '../db/models/index.js';

// Option 2: Passing parameters separately (sqlite)
export const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME,
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