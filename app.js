//import what we need
const express = require('express');
const expresLayouts = require('express-ejs-layouts');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const nocache = require('nocache');
const bodyParser = require('body-parser');

//import routes
const index = require('./routes/index');
const users = require('./routes/users');



//clear port
// require('./clearPort');

//set app
const PORT = process.env.PORT || 5000;
const app = express();


//load env variables.config({ debug: process.env.DEGUB })
require('dotenv').config();

//import strategy
require('./config/pass-local')(passport);
require('./config/pass-fb')(passport);
require('./config/pass-google')(passport);




//lize
require('./config/passlize')(passport);

//set views
app.use(expresLayouts);
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));

//parse body
// app.use(express.urlencoded({extended: false}));
// app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//set express session
// const secret = process.env.SECRET;
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60}

}));

//passport mw
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//no cache
app.use(nocache());

//nocache impl
// app.use((req, res, next) => {
//     res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//     res.header('Expires', '-1');
//     res.header('Pragma', 'no-cache');
//     next();
// });

//set global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})


//db connection
const URI = process.env.MongoURI;
mongoose.connect(URI, {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//Routes
app.use('/', index);
app.use('/users', users);


app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`))