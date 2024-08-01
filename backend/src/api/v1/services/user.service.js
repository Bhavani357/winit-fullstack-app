/* -----> Repository <----- */
const UserRepository = require("../repositories/user.repository");

class UserService {
  async createUser(userDetails) {
    console.log("------ createUser service");

    try {
      await UserRepository.createTables();
      // Call the repository to create a user
      const user = await UserRepository.createUser(userDetails);
    } catch (error) {
      // Log the error for debugging
      console.error("Error in UserService:", error);

      // Rethrow the error to be handled by the controller
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async createClaimItem(claimDetails) {
    console.log("------ createUser service");

    try {
      await UserRepository.createTables();
      const user = await UserRepository.createClaimItem(claimDetails);
    } catch (error) {
      // Log the error for debugging
      console.error("Error in claimItem:", error);

      // Rethrow the error to be handled by the controller
      throw new Error(`Error creating claimItem: ${error.message}`);
    }
  }

  async getClaimItems() {
    console.log("------ getClaimItems service");

    try {
      // Call the repository to fetch all claim items
      const claimItems = await UserRepository.fetchAllClaimItems();
      return claimItems;
    } catch (error) {
      // Log the error for debugging
      console.error("Error while getting claim items in services:", error);
      throw new Error(`Error while getting claim items: ${error.message}`);
    }
  }

  async getClaims() {
    console.log("------ getClaims service");

    try {
      // Call the repository to fetch all claims
      const claims = await UserRepository.fetchAllClaims();
      return claims;
    } catch (error) {
      // Log the error for debugging
      console.error("Error while getting claims in services:", error);
      throw new Error(`Error while getting claims: ${error.message}`);
    }
  }

  async getClaim(claimId){
    try {
      // Call the repository to fetch all claims
      const claims = await UserRepository.fetchClaim(claimId);
      return claims;
    } catch (error) {
      // Log the error for debugging
      console.error("Error while getting claims in services:", error);
      throw new Error(`Error while getting claims: ${error.message}`);
    }
  }

}


module.exports = new UserService();