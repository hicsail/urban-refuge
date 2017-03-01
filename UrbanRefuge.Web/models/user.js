let config = require('../config/config');
let Sequelize = require('sequelize');
let sequelize = new Sequelize(config.database);

let User = sequelize.define('users', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true, // Add timestamps
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync();

module.exports = {
	User: User
};
