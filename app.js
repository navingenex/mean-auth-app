const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
//mongoose connect
mongoose.connect(config.database);
//checking connection
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});
//checking error
mongoose.connection.on('error', (err) => {
    console.log(err);
});
//initialize app
const app = express();

const users = require('./routes/users')
const port = 3000;
//cors middleware
app.use(cors());
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body-parser middleware
app.use(bodyParser.json());
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
//routes
app.use('/users', users);

//index route
app.get('/', (req, res) => {
    res.send('Invalid end point');
});
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})

//server running on port 3000
app.listen(port, () => {
    console.log('server running on port:' + port);
});