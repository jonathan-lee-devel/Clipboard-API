/**
 * http_redirect_router.js
 *
 * Router responsible for responding to all HTTP requests
 * and redirecting appropriately to the corresponding HTTPS application path.
 */

const express = require("express");
const router = express.Router();

router.get("*", (req, res) => {
  res.redirect(`https://${req.hostname}:${process.env.HTTPS_PORT}${req.url}`);
});

module.exports = router;
