'use strict';

var Customer = require('../models/customerModel');

exports.list_all_customers = (req, res) => {
  Customer.getAllCustomers( (err, customer) => {

    if (err) {
      res.send(err);
    }
    else {
      console.log('res', customer);
      res.send(customer);
    }
  });
};

exports.create_a_customer = (req, res) => {
  var new_customer = new Customer(req.body);

  // Handles null error
  if (!new_customer.name || !new_customer.address) {
    res.status(400).send({ error: true, message: 'Must provide cusomer name & address' });
  }
  else {
    Customer.createCustomer(new_customer, (err, customer) => {
      if (err) {
        res.send(err);
      }
      else {
        res.json(customer);
      }
    });
  }
};

exports.read_a_customer = (req, res) => {
  Customer.getCustomerById(req.params.customerId, (err, customer) => {
    if (err) {
      res.send(err);
    }
    else {
      res.json(customer);
    }
  });
};

exports.update_a_customer = (req, res) => {
  Customer.updateCustomerById(req.params.customerId, new Customer(req.body), (err, customer) => {
    if (err) {
      res.send(err);
    }
    else {
      res.json(customer);
    }
  });
};

exports.delete_a_customer = (req, res) => {
  Customer.remove(req.params.customerId, (err, customer) => {
    if (err) {
      res.send(err);
    }
    else {
      res.json({ message: 'Customer successfully deleted' });
    }
  });
};