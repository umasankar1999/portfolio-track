const app = require('./src/app');

const PORT_NO = process.env.PORT_NO;

// starts the server 
app.listen(PORT_NO,()=>{
  console.log(`Listening to port : ${PORT_NO}`);
});