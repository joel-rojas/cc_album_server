import Sequelize from 'sequelize';
//Setup DB connection
/**
 * This variable saves a Sequelize instance given DB main properties and to perform its methods for DB communication.
 */
export const sqlize = new Sequelize('albumdb', 'administrator', 'challenge', {
  host: 'coding-challenge.cwwq3n79khji.us-east-2.rds.amazonaws.com',
  port: 3306, 
  dialect: 'mysql'
});
