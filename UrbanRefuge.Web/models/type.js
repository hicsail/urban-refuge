let config = require('../config/config');
let Sequelize = require('sequelize');
let sequelize = new Sequelize(config.database);

let Type = sequelize.define('types', {
  name: {
    type: Sequelize.STRING,
  }
}, {
  timestamps: true, // Add timestamps
  freezeTableName: true // Model tableName will be the same as the model name
});

Type.sync();

const baseTypes = [
  "Cash",
  "Education",
  "Health",
  "Housing",
  "Other",
  "Work"
]

for(var name of baseTypes){
  checkType(name);
}

function checkType(name){
  Type.find({where:{name:name}}).then((type) => {
    if(!type){
      Type.create({name:name}).then;
    }
  });
}


module.exports = {
  findAll : function() { return Type.findAll(); },
  findById : function(id) { return Type.find({where:{id:id}});},
  findByName : function(name) { return Type.find({where:{name:name}});}
};
