const { connectDB } = require("../../../dbconfig/sqlite");

const serviceClaimsQuery = `
  CREATE TABLE IF NOT EXISTS serviceClaims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    claimDate DATE,
    description VARCHAR(250),
    startDate DATE,
    endDate DATE,
    claimType VARCHAR(50),
    totalAmount DECIMAL(18,2)
  )
`;

const claimItemsQuery = `
  CREATE TABLE IF NOT EXISTS claimItems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    claimId INTEGER,
    expenseCategory VARCHAR(50),
    name VARCHAR(250),
    amount DECIMAL(18,2),
    startDate DATE,
    endDate DATE,
    FOREIGN KEY (claimId) REFERENCES serviceClaims(id)
  )
`;

class UserRepository {
  async createTables() {
    try {
      const db = await connectDB();
      if (!db) {
        console.error("Database connection is not established.");
        throw new Error("Database connection is not established.");
      }
      await db.run(serviceClaimsQuery);
      await db.run(claimItemsQuery);
      console.log("Tables created or already exist.");
    } catch (error) {
      console.error("Error creating tables:", error);
      throw error;
    }
  }

  async createUser(serviceDetails) {
    try {
      const db = await connectDB();
      if (!db) {
        console.error("Database connection is not established.");
        throw new Error("Database connection is not established.");
      }
      
      const { claimDate, description, startDate, endDate, claimType, totalAmount } = serviceDetails;
      const claimQuery = `INSERT INTO serviceClaims (claimDate, description, startDate, endDate, claimType, totalAmount) VALUES (?, ?, ?, ?, ?, ?)`;
      const result = await db.run(claimQuery, [claimDate, description, startDate, endDate, claimType, totalAmount]);
      
      // Assuming claimId is returned from the insert operation
      const claimId = result.lastID; // Adjust this if necessary based on your database library
      
      return claimId;
    } catch (error) {
      console.error("Error creating claim:", error);
      throw error;
    }
  }

  async createClaimItem(claimItemDetails) {
    try {
      const db = await connectDB();
      if (!db) {
        console.error("Database connection is not established.");
        throw new Error("Database connection is not established.");
      }
      
      const { claimId, expenseCategory, name, amount, startDate, endDate } = claimItemDetails;
      const claimItemQuery = `INSERT INTO claimItems (claimId, expenseCategory, name, amount, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?)`;
      const result = await db.run(claimItemQuery, [claimId, expenseCategory, name, amount, startDate, endDate]);

      return result;
    } catch (error) {
      console.error("Error creating claim item:", error);
      throw error;
    }
  }
  async fetchAllClaimItems() {
    try {
      const db = await connectDB();
      if (!db) {
        console.error("Database connection is not established.");
        throw new Error("Database connection is not established.");
      }
      const getClaimItemsData = `SELECT * FROM claimItems`;
      const claimItemsData = await db.all(getClaimItemsData);
      return claimItemsData;
    } catch (error) {
      console.error("Error while reading claim items:", error);
      throw error;
    }
  }

  async fetchAllClaims() {
    try {
      const db = await connectDB();
      if (!db) {
        console.error("Database connection is not established.");
        throw new Error("Database connection is not established.");
      }
      const getClaimsData = `SELECT * FROM serviceClaims`;
      const claimsData = await db.all(getClaimsData);
      return claimsData;
    } catch (error) {
      console.error("Error while reading claims:", error);
      throw error;
    }
  }

  async fetchClaim(claimId) {
    try {
        const db = await connectDB();
        if (!db) {
            console.error("Database connection is not established.");
            throw new Error("Database connection is not established.");
        }

        // Use parameterized queries to prevent SQL injection
        const getClaimsData = 'SELECT * FROM claimItems WHERE claimId = ?';
        const claimsData = await db.all(getClaimsData, [claimId]);

        return claimsData;
    } catch (error) {
        console.error("Error while reading claims:", error);
        throw error; // Rethrow the error to handle it at a higher level if needed
    }
}
  
}

module.exports = new UserRepository();
