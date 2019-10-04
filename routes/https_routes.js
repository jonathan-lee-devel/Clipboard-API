'use strict';

module.exports = function(app) {
  var todoList = require('../controllers/customerController');

  // todoList Routes
  app.route('/customers')
    .get(todoList.list_all_customers)
    .post(todoList.create_a_customer);
   
   app.route('/customers/:customerId')
    .get(todoList.read_a_customer)
    .put(todoList.update_a_customer)
    .delete(todoList.delete_a_customer);
    
};