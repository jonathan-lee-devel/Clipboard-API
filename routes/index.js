const express = require('express');
var router = express.Router();

/* GET Home Page */
router.get('/', (req, res) => {
    res.send('Sent from Clipboard API v1 - ' + new Date());
});

module.exports = router;