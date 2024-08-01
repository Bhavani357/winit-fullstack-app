/* -----> Services <----- */
const UserServices = require("../services/user.service");

class UserController {
  async createUser(req, res) {
    console.log("--- createUser controller");
    console.log(req.body);
    const userDetails = req.body;

    try {
      // Call the service to create a user
      const user = await UserServices.createUser(userDetails);
      
      // Send a success response
      res.status(201).json({
        message: "User created successfully",
        user,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      
      // Send an error response
      res.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  }

  async createclaim(req, res) {
    console.log("--- createUser controller");
    console.log(req.body);
    const userDetails = req.body;

    try {
      // Call the service to create a user
      const user = await UserServices.createClaimItem(userDetails);
      
      // Send a success response
      res.status(201).json({
        message: "claimItem created successfully",
        user,
      });
    } catch (error) {
      console.error("Error creating claimItem:", error);
      
      // Send an error response
      res.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  }

  async getClaimItems(req, res) {
    try {
      // Call the service to fetch all claim items
      const claimItems = await UserServices.getClaimItems();
      
      // Send a success response
      res.status(200).json({
        claimItems,
      });
    } catch (error) {
      console.error("Error fetching claim items:", error);
      
      // Send an error response
      res.status(500).json({
        message: "Error fetching claim items",
        error: error.message,
      });
    }
  }

  async getClaims(req, res) {
    try {
      // Call the service to fetch all claims
      const claims = await UserServices.getClaims();
      
      // Send a success response
      res.status(200).json({
        claims,
      });
    } catch (error) {
      console.error("Error fetching claims:", error);
      
      // Send an error response
      res.status(500).json({
        message: "Error fetching claims",
        error: error.message,
      });
    }
  }
  async getClaim(req, res) {
    try {
      // Extract claimId from request parameters
      const { claimId } = req.params;
      
      // Call the service to fetch the claim by ID
      const claim = await UserServices.getClaim(claimId);
      
      // Send a success response
      res.status(200).json({
        claim,
      });
    } catch (error) {
      console.error("Error fetching claim:", error);
      
      // Send an error response
      res.status(500).json({
        message: "Error fetching claim",
        error: error.message,
      });
    }
  }

}

module.exports = new UserController();