const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const seedDB = require('./seed');
const personRoutes = require('./routes/personRoutes');

mongoose.connect('mongodb://localhost:27017/tracker')
.then(()=>console.log('DB connected'))
.catch((err)=>console.log(err))

seedDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/',(req,res)=>{
    res.send("Connected");
})

app.use(personRoutes);

app.listen(3000,(req,res)=>{
    console.log('server started')
})

