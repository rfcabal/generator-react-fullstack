const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const configdb = require('./config/db');
const routes = require('./routes');

const app = express();

// CORS Config
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//mongoose setup
/*mongoose.Promise = Promise;
mongoose.connect(configdb.database, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});*/

// view engine setup
app.set('views', path.join(__dirname, '/routes/views'));
app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes setup
app.use('/', routes)

// error handler
app.use((err, req, res, next) =>{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'develop' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

console.info("Initializing Server");

function initExpress () {
    app.listen(9000, () => {
        console.info("Server is Running");
        process.on("SIGINT", closeApp);
        process.on("SIGTERM", closeApp);
    });
}

function closeApp() {
    process.exit(0)
}

initExpress();
