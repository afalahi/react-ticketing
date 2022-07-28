/** @format */

const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((res) => {
      console.log(`MongoDB Connected: ${res.connection.host}`.cyan.underline);
    })
    .catch((error) => {
      console.log(`${error} - Will attempt local instance`.red.underline.bold);
      mongoose
        .connect(process.env.LOCAL_DB_URL)
        .then((res) => {
          console.log(
            `MongoDB Connected: ${res.connection.host}`.cyan.underline
          );
        })
        .catch((error) => {
          console.log(`${error}`.red.underline.bold);
          process.exit(1);
        });
    });
};

module.exports = connectDB;
