const express = require('express');
const router = express.Router();
const user_controller = require('../../controllers/user_controller');

router.get('/', user_controller.list_all_users);

router.get('/find/:user_email', user_controller.find_user_by_email);

router.post('/register', user_controller.register_user);

router.post('/login', user_controller.verify_user);

module.exports = router;