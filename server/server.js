require('dotenv').config({ path: './.env' });
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const CustomError = require('./util/CustomError.js');
const cors = require('cors');
const router = require('./router/index.js');
const { dbConnect } = require('./config/dbConnect.js');
const morgan = require('morgan');

// Database
dbConnect();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
// app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));

// Routes
app.use('/', router);

//global error handling
app.all('*', (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(err);
});

// Error handling
app.use(require('./controller/errorController.js'));

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
