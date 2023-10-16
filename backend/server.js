const express = require("express");
const routes = require('./routes/routes')
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors({
  origin : 'http://localhost:8080'
})); 

app.use(express.json());
app.use(routes);
app.use(cors);

app.get('/',(req,res) =>{
    res.send('hellow node');
})
// Database connection
const uri = "mongodb+srv://admin:root@cluster0.4xy2og8.mongodb.net/data?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas !');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });



//starting node server

app.listen(8000,function check(error){
    if(error){
console.log("server error ")
    }else{
      console.log("server started on port 8000")  
    }
});

app.use(express.json());


