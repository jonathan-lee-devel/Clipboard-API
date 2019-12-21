const sql;

// Customer object constructor
const CustomerModel = function(customer) {
  this.name = customer.name;
  this.address = customer.address;
  this.created_at = new Date();
};

CustomerModel.create_customer = (customer, result) => {
  sql.query("INSERT INTO customers set ?", customer, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

CustomerModel.get_customer_by_id = (id, result) => {
  sql.query("SELECT * FROM customers WHERE id = ? ", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

CustomerModel.get_all_customers = result => {
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

CustomerModel.update_customer_by_id = (id, customer, result) => {
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

CustomerModel.remove_customer_by_id = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = CustomerModel;
