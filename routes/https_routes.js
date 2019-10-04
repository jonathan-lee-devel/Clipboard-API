'use strict';

module.exports = function(app) {
  var customerController = require('../controllers/customerController');

  // todoList Routes
  app.route('/customers')
    .get(customerController.list_all_customers)
    .post(customerController.create_a_customer);
   
   app.route('/customers/:customerId')
    .get(customerController.read_a_customer)
    .put(customerController.update_a_customer)
    .delete(customerController.delete_a_customer);
    
};