const mongoose = require('mongoose');

const createMongoDbConnection = async () => {
  mongoose.connect(process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  ).then(()=>{
    console.log("MongoDb Connected");
  })
  .catch((err)=>{
    console.log(err);
  })
}

module.exports = createMongoDbConnection;