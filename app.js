const express = require("express");
require("dotenv").config(); //configure environment variables
const {
  getAllItems,
  getParticularItem,
  changePrice,
} = require("./controllers");
//initialize the app
const app = express();
app.use(express.json());
//start the database and return connection and the collection of items
app.get("/items", getAllItems); //get all items
app.get("/items/:item", getParticularItem); //get particular item
app.patch("/items/:item", changePrice); //change the price of an item



module.exports = { app };
