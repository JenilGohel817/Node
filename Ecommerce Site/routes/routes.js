const express = require("express");
const controller = require("../controller/user");
const { authToken, isAdmin } = require("../middlewares/authToken");
const router = express.Router();

router.post("/register", controller.registerUser);

router.post("/login", controller.loginUser);

router.get("/refresh", controller.handleRefreshToken);

router.get("/fetchAllUser", controller.fetchAllUser);

router.get("/fetchUser/:id", authToken, isAdmin, controller.fetchUser);

router.get("/deleteUser/:id", controller.deleteUser);

router.get("/logout", controller.logout);

router.put("/updateUser", authToken, controller.updateUser);

router.put("/blockUser/:id", authToken, controller.blockUser);

router.put("/ubBlockUser/:id", authToken, controller.unBlockUser);

module.exports = router;
