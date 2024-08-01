const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");

const connectDB = async () => {
    try {
      let dbPath = path.join(__dirname, "../../db/dev.db");
      console.log(`Connecting to database at ${dbPath}`);
      const db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });
      console.log("Database connected");
      return db;
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error;
    }
  };
module.exports.connectDB = connectDB;