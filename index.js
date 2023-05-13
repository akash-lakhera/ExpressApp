const {app}=require("./app")
const items = require("./items");
const { con,col} = require("./db");
const PORT = process.env.PORT || 3000;
con.connect() // Start the server after the database is ready
  .then(() => {
    col.insertMany(items);
    app.listen(PORT, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log("Following error occurred in database connection : " + err);
  });