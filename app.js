const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routerTemp = express.Router();
const socketAlerts = require('./modules/socket')
const indexRouter = require('./routes/index');
const cameraRouter = require('./routes/camera');
const officeRouter = require('./routes/office');
const ruleRouter = require('./routes/rule');
const userRouter = require('./routes/user');
//const alertRouter = require('./routes/alert');
const violationRouter = require('./routes/violation'); // Stand in for alertRouter
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser('SHOW ME THE CAMERA'));

//Session Configuration
//Change cookie . secure: false, to secure: true on HTTPS server
const MemoryStore = session.MemoryStore;
app.use(session({
    secret: 'SHOW ME THE CAMERA',
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore(),
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}))


// ? Is this required for anymore?
routerTemp.get('/realtime',(req,res)=>{
     
    let temp={
        timestamp:parseInt(Math.random()*10),
        policy1:true,
        policy2:true,
        policy3:true,
        policy4:true,
    }
    socketAlerts.demo()
    res.send({result:200})

})

// ** Publishes event on socket with alert data payload on POST call from the watcher
routerTemp.post('/realtime', (req, res) => {
    console.log(req.body);
    socketAlerts.demo(req.body);
})

app.use(logger('dev'));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({extended: false, limit: '25mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/camera', cameraRouter);
app.use('/office', officeRouter);
app.use('/rule', ruleRouter);
app.use('/user', userRouter);
app.use('/data',routerTemp)
// app.use('/alert', alertRouter);
app.use('/alert', violationRouter); // Stand in for alertRouter


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
