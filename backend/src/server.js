const { connectDB } = require("./dbconfig/sqlite");
const app = require("./app");

connectDB()
  .then(async (db) => {
    console.log("server connected to the database");
    const port = process.env.PORT;
    app.listen(5000, () => {
      console.log(`⚙️ Server is running at port: http://localhost:5000`);
    });
    module.exports.db = db;
  })
  .catch((error) => {
    console.error("Error server connecting to database:", error);
  });