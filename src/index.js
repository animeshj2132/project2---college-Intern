const express = require('express');
const bodyParser = require('body-parser');
const {default: mongoose} = require('mongoose');
const route = require('./routes/route')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://aneel_11:uUjly3oOvF7vFmzv@anilcluster.9ltebdm.mongodb.net/group7Database",{useNewUrlParser: true})
.then(()=>console.log("MongoDb is connected"))
.catch(error=>console.log(error))

app.use('/', route)

app.listen(process.env.PORT || 3000, function (){
     console.log('Express app running on port' + (process.env.PORT || 3000))
});
