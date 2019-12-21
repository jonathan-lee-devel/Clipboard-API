const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {// Redirects all HTTP traffic to HTTPS
    res.redirect("https://" + req.hostname + ":" + HTTPS_PORT + req.url);
});

module.exports = router;