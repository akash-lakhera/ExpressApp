const { col } = require("./db");// get collection
const createId = require("mongodb").ObjectId;

//get all the items controller function
const getAllItems = async (req, res, next) => {
  try {
    const items = await col.find({}).toArray();
   
    res.status(200).json(items);
  } catch (error) {
    console.log("An error occurred in getting items from database : " + error);
  }
};
// get a particular item controller
const getParticularItem = async (req, res, next) => {
  try {
    
    const id = new createId(req.params.item);
    const items = await col.findOne({ _id: id });

    if(!items){
        res.status(404).send("Item does not exist")
    }
    else
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    error.name?BSONError:res.status(404).send("Item does not exist")
    
  }
};
//change the price of an item controller
const changePrice = async (req, res, next) => {
  try {
    const id = new createId(req.params.item);
    let price = String(req.body.price);
    const check = Boolean(price.match(/^[0-9]*$/));
    if (!check) {
      res.status(422).send("Price can only be a number");
    } else {
      price = Number(price);
      const items = await col.updateOne(
        { _id: id },
        {
          $set: {
            price: price,
          },
        }
      );
      res.status(200).send(items);
    }
  } catch (error) {
    console.log(error);
    error.name?BSONError:res.status(404).send("Item does not exist")
  }
};
module.exports = { getAllItems, getParticularItem, changePrice };
