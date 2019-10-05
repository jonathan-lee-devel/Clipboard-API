'user strict';
const sql = require('../util/mysql-connection');

// Customer object constructor
const Customer = function(customer){
    this.name = customer.name;
    this.address = customer.address;
    this.created_at = new Date();
};

Customer.createCustomer = function (customer, result) {
    sql.query("INSERT INTO customers set ?", customer, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    })
};

Customer.getCustomerById = function (id, result) {
    sql.query("SELECT * FROM customers WHERE id = ? ", id, function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Customer.getAllCustomers = function (result) {
    sql.query("SELECT * FROM customers", function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            console.log("Customers: ", res);
            result(null, res);
        }
    });
};

Customer.updateCustomerById = function(id, customer, result) {
    sql.query("UPDATE customers SET customer = ? WHERE id = ?", [customer.customer, id], function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Customer.removeCustomerById = function(id, result) {
    sql.query("DELETE FROM customers WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    })
}

module.exports= Customer;