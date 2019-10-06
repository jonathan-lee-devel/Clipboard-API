"user strict";
const sql = require("../util/mysql-connection");

// Customer object constructor
const Customer = function(customer) {
  this.name = customer.name;
  this.address = customer.address;
  this.created_at = new Date();
};

Customer.createCustomer = (customer, result) => {
  sql.query("INSERT INTO customers set ?", customer, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Customer.getCustomerById = (id, result) => {
  sql.query("SELECT * FROM customers WHERE id = ? ", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Customer.getAllCustomers = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
    } else {
      console.log("Customers: ", res);
      result(null, res);
    }
  });
};

Customer.updateCustomerById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET customer = ? WHERE id = ?",
    [customer.customer, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Customer.removeCustomerById = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Customer;
