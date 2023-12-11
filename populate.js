const express = require("express");
const app = express();
const connectDB = require("./DB/connect");
require("dotenv").config();

const Product = require("./Models/Product");

const jsonProducts = require("./products.json");
const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    app.listen(port, console.log("success"));
  } catch (error) {
    console.log(error);
  }
};

start();
