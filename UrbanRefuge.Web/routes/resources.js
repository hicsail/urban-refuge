exports.index = function(req, res) {
  res.render('resources/index.hbs', {
    title: 'Resources',
    resources: [{
      name: "test1",
      ariabicName: "اختبار",
      latitude: 31.7213531,
      longitude: 35.6249074,
      primaryType: "Health",
      types: "Health, Food",
      address: "The Jordan Museum, Ali Ben Abi Taleb St. 10, Amman 11183, Jordan",
      ariabicAddress: "متحف الأردن، علي بن أبي طالب سانت 10، عمان 11183، الأردن",
      phone: "+962 6 462 9317",
      notes: "cool place",
      ariabicNotes: "مكان بارد"
    },{
      name: "test2",
      ariabicName: "اختبار",
      latitude: 31.7213531,
      longitude: 35.6249074,
      primaryType: "Health",
      types: "Health, Food",
      address: "The Jordan Museum, Ali Ben Abi Taleb St. 10, Amman 11183, Jordan",
      ariabicAddress: "متحف الأردن، علي بن أبي طالب سانت 10، عمان 11183، الأردن",
      phone: "+962 6 462 9317",
      notes: "cool place",
      ariabicNotes: "مكان بارد"
    }]
  });
};

exports.create = function(req, res) {
  res.render('resources/create.hbs', {
    title: 'Create Resources',
    types: ['Health','Education','Food']
  });
};

exports.view = function(req, res) {
  res.render('resources/view.hbs', {
    title: 'View Resources',
    resource: {
      name: "test",
      ariabicName: "اختبار",
      latitude: 31.7213531,
      longitude: 35.6249074,
      primaryType: "Health",
      types: "Health, Food",
      address: "The Jordan Museum, Ali Ben Abi Taleb St. 10, Amman 11183, Jordan",
      ariabicAddress: "متحف الأردن، علي بن أبي طالب سانت 10، عمان 11183، الأردن",
      phone: "+962 6 462 9317",
      notes: "cool place",
      ariabicNotes: "مكان بارد"
    }
  });
};

exports.edit = function(req, res) {
  res.render('resources/edit.hbs', {
    title: 'Edit Resources',
    resource: {
      name: "test",
      ariabicName: "اختبار",
      latitude: 31.7213531,
      longitude: 35.6249074,
      primaryType: "Health",
      types: "Health, Food",
      address: "The Jordan Museum, Ali Ben Abi Taleb St. 10, Amman 11183, Jordan",
      ariabicAddress: "متحف الأردن، علي بن أبي طالب سانت 10، عمان 11183، الأردن",
      phone: "+962 6 462 9317",
      notes: "cool place",
      ariabicNotes: "مكان بارد"
    },
    types: ['Health','Education','Food']
  });
};
