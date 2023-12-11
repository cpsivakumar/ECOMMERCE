const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;

// mongoose.connect(connections).then(() =>
// console.log("connected to database")).catch((err) => console.log(err));
