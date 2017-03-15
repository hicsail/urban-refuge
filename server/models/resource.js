let config = require('../config/config');
let Sequelize = require('sequelize');
let sequelize = new Sequelize(config.database);

let Resource = sequelize.define('resources', {
  name: {
    type: Sequelize.STRING,
  },
  ariabicName: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.DOUBLE
  },
  longitude: {
    type: Sequelize.DOUBLE
  },
  primaryType: {
    type: Sequelize.STRING
  },
  types: {
    type: Sequelize.JSONB
  },
  address: {
    type: Sequelize.STRING
  },
  ariabicAddress: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  notes: {
    type: Sequelize.STRING
  },
  ariabicNotes: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true, // Add timestamps
  freezeTableName: true // Model tableName will be the same as the model name
});

Resource.sync();

module.exports = {
  findAll : function() { return Resource.findAll({order: 'name ASC'}); },
  findById : function(id) { return Resource.find({where:{id:id}});},
  findByType: function(type) { return Resource.findAll({where:{primaryType:type}});},
  findByTypeSecondary: function(type) {return Resource.findAll({where:{types:{$contains: type}}});},
  create : function(resource) { return Resource.create(resource);},
  update : function (resource) { return Resource.update(resource, {where: {id: resource.resourceid}});},
  delete : function (id) { return Resource.destroy({where:{id:id}});},
  filter : function (terms) {terms = '%'+terms+'%'; return Resource.findAll({where:{name:{$like: terms}}});}
};
