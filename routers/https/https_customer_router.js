const express = require('express');
const router = express.Router();
const customer_controller = require('../../controllers/customer_controller');

router.get('/', customer_controller.list_all_customers);

router.post('/create', customer_controller.create_customer);

router.get('find/:customer_id', customer_controller.find_customer_by_id);

router.put('update/:customer_id', customer_controller.update_customer);

router.delete('delete/:customer_id', customer_controller.delete_customer);

module.exports = router;