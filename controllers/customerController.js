'use strict';

var Customer = require('../models/customerModel');

exports.list_all_customers = function(req, res) {
    Customer.getAllCustomers(function(err, customer) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', customer);
    res.send(customer);
  });
};



exports.create_a_customer = function(req, res) {
  var new_customer = new Customer(req.body);

  //handles null error 
   if(!new_customer.name || !new_customer.address){

            res.status(400).send({ error:true, message: 'Please provide name/address' });

        }
else{
  
  Customer.createCustomer(new_customer, function(err, customer) {
    
    if (err)
      res.send(err);
    res.json(customer);
  });
}
};


exports.read_a_customer = function(req, res) {
  Customer.getCustomerById(req.params.customerId, function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};


exports.update_a_customer = function(req, res) {
  Customer.updateById(req.params.customerId, new Customer(req.body), function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};


exports.delete_a_customer = function(req, res) {


  Customer.remove( req.params.customerId, function(err, customer) {
    if (err)
      res.send(err);
    res.json({ message: 'Customer successfully deleted' });
  });
};