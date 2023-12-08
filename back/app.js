require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const registerRouter = require('./routes/registerRouters');
const STATUS = require('./utils/HttpStatusText');
const loginRouter = require('./routes/loginRoutres');
const countryRouter = require('./routes/countryRouter');

const app = express();
const url = process.env.MONGO_URL;

mongoose.connect(url).then(()=>{
    console.log('connect to DB');
}).catch((err)=>{
    console.log('can not connect to DB', err);
})

app.use(express.json());
app.use(express.static('../front'));


app.use(express.urlencoded({extended: true}));


app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/countries', countryRouter);


app.get('/', (req, res)=>{
    res.redirect('/home');
})
app.get('/home',(req, res)=>{
    res.sendFile(path.join(__dirname, '../front/index.html'));
})


app.use((error, req, res, next)=>{
    res.status(error.statusCode || 500).json({status: error.statusText || STATUS.error, message: error.message});
})



app.listen(process.env.PORT, ()=>{
    console.log('app listen on port 1000'); 
})