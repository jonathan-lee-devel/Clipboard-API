/**
 * https_index_router.js
 *
 * Router responsible for linking all routes along the index path '/'
 * to appropriate actions provided by the index controller.
 */

const express = require("express");
const index_controller = require("../../controllers/index_controller");
const router = express.Router();

router.get("/", index_controller.index_all);

module.exports = router;
