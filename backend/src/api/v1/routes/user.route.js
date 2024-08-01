/* -----> Third Party Packages <----- */
const express = require("express");
const router = express.Router();

/* -----> Controller <----- */
const UserController = require("../controllers/user.controller");
const userController = require("../controllers/user.controller");

/* -----> Routes <----- */

// 01 create new user
router.post("/claim", UserController.createUser);
router.post("/claimItem", userController.createclaim);
router.get("/getClaims", UserController.getClaims);
router.get("/getClaimItems", UserController.getClaimItems);
router.get("/getClaim/:claimId", UserController.getClaim);

module.exports = router;