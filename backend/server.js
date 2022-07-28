/** @format */

const express = require('express');
const colors = require('colors');

const connectDB = require('./config/database');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorMiddleware');
const AppError = require('./utils/AppError');

const PORT = process.env.SERVER_PORT || 3000;

connectDB();
const app = express();

//app configs
app.use(express.json());

app.get('/', (req, res) => {
  res.json(req.headers);
});
//ROUTES
app.use('/api', routes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
