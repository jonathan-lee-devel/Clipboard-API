/**
 * https_user_router.js
 *
 * Router responsible for linking all routes along the user path '/user'
 * to appropriate actions provided by the user controller.
 */

const express = require("express");
const user_controller = require("../../controllers/user_controller");
const router = express.Router();

router.get("/", user_controller.list_all_users);

module.exports = router;
