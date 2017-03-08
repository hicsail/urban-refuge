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

User.sync().then(()=>{
  checkPrimaryEmail(config.rootEmail);
});


function checkPrimaryEmail(email){
  User.find({where:{email:email}}).then((user) => {
    if(!user){
      User.create({email:email});
    }
  });
}

module.exports = {
	vaildUser: function(email) {
    return User.findOne({where:{email:email}});
  },
  findAll: function() {
    return User.findAll();
  },
  create: function(email) {
    return User.create(email);
  },
  delete : function (email) { return User.destroy({where:{email:email}});},
};
