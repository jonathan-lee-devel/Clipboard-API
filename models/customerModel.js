'user strict';
var sql = require('../util/mysql-connection');

//Task object constructor
var Customer = function(customer){
    this.name = customer.name;
    this.address = customer.address;
    this.created_at = new Date();
};
Customer.createCustomer = function (newCustomer, result) {    
        sql.query("INSERT INTO customers set ?", newCustomer, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
Customer.getCustomerById = function (customerId, result) {
        sql.query("SELECT * FROM customers WHERE id = ? ", customerId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Customer.getAllCustomers = function (result) {
        sql.query("SELECT * FROM customers", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);  

                 result(null, res);
                }
            });   
};
Customer.updateById = function(id, task, result){
  sql.query("UPDATE customers SET customer = ? WHERE id = ?", [task.task, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Customer.remove = function(id, result){
     sql.query("DELETE FROM customers WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Customer;