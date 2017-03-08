let config = require('../config/config');
let Sequelize = require('sequelize');
let sequelize = new Sequelize(config.database);

let User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
  }
}, {
  timestamps: true, // Add timestamps
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync();

module.exports = {
	vaildUser: function(email) {
    return User.findOne({where:{email:email}});
  }
};
