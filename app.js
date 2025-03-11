const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const app = express();
// Template Engine
app.set('view engine', 'ejs');

//Global Variables
global.userIn = null;

// Middlewares

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/smartedu-db',
    }),
  })
);

// Routes
app.use('*', (req, res, next) => {
  userIn = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

// Port
const port = 3000;
// Connect DB
mongoose
  .connect('mongodb://localhost/smartedu-db', {
    serverSelectionTimeoutMS: 5000, // 5 saniye
  })
  .then(() => {
    console.log("MongoDB'ye bağlanıldı.");
  })
  .catch((err) => {
    console.error('MongoDB bağlantı hatası:', err);
  });

app.listen(port, () => {
  console.log(`Server ${port} portun'da Çalışıyor `);
});
