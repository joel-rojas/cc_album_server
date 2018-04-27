import Sequelize from 'sequelize';
import {sqlize} from '../db';

/**
 * It defines a Photo model for DB. 
 */
export const Photo = sqlize.define('photo',  {
    name: Sequelize.STRING,
    description: Sequelize.STRING(1000),
    link: Sequelize.STRING,
    date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
});