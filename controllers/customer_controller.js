const CustomerModel = require("../models/customer_model");

exports.list_all_customers = (req, res) => {
  CustomerModel.get_all_customers((err, customer) => {
    if (err) {
      res.send(err);
    } else {
      console.log("res", customer);
      res.send(customer);
    }
  });
};

exports.create_customer = (req, res) => {
  var new_customer = new CustomerModel(req.body);

  // Handles null error
  if (!new_customer.name || !new_customer.address) {
    res
      .status(400)
      .send({ error: true, message: "Must provide cusomer name & address" });
  } else {
    CustomerModel.create_customer(new_customer, (err, customer) => {
      if (err) {
        res.send(err);
      } else {
        res.json(customer);
      }
    });
  }
};

exports.find_customer_by_id = (req, res) => {
  CustomerModel.get_customer_by_id(req.params.customerId, (err, customer) => {
    if (err) {
      res.send(err);
    } else {
      res.json(customer);
    }
  });
};

exports.update_customer = (req, res) => {
  CustomerModel.update_customer_by_id(
    req.params.customerId,
    new CustomerModel(req.body),
    (err, customer) => {
      if (err) {
        res.send(err);
      } else {
        res.json(customer);
      }
    }
  );
};

exports.delete_a_customer = (req, res) => {
  CustomerModel.remove(req.params.customerId, (err, customer) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Customer successfully deleted" });
    }
  });
};
