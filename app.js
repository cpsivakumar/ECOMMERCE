const express = require("express");

const app = express();
const connectDB = require("./DB/connect");
require("express-async-errors");
const productRoute = require("./Routes/Products");

const notFound = require("./Middleware/not_found");
const errorHandlerMiddleware = require("./Middleware/errorHandler");
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1> store Api</h1><a href="/api/v1/products">Products Route</a>');
});
app.use("/api/v1/products", productRoute);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 9000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server run in port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
