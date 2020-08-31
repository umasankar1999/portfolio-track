const seeder = require('mongoose-seed');

const seedData = require('./consts/seedData');

// connect to the MongoDb via mongoose
seeder.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},()=>{

  // load mongoose models
  seeder.loadModels([
    './src/models/Securities.js',
    './src/models/Trades.js'
  ]);

  // Clear specified collections
  seeder.clearModels(['Securities','Trades'],()=>{
    //once documents are cleared, populate the models with data
    seeder.populateModels(seedData,()=>{
      seeder.disconnect();
    })
  })
})