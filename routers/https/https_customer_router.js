const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("Session ID: " + req.session.id);
    res.send("Customers response from Clipboard API v1 - " + new Date());
});

module.exports = router;