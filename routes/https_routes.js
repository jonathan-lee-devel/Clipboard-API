"use strict";

module.exports = function(app) {
  const userController = require("../controllers/userController");
  const customerController = require("../controllers/customerController");

  app.route("/").get((req, res) => {
    console.log("Session ID: " + req.session.id);
    res.send("Sent from Clipboard API v1 - " + new Date());
  });

  /* User Routes */
  app.route("/users").get(userController.list_all_users);

  app.route("/users/find/:userEmail").get(userController.find_a_user_by_email);

  app.route("/users/register").post(userController.register_a_user);

  app.route("/users/login").post(userController.verify_user);

  /* Customer Routes */
  app
    .route("/customers")
    .get(customerController.list_all_customers)
    .post(customerController.create_a_customer);

  app
    .route("/customers/:customerId")
    .get(customerController.read_a_customer)
    .put(customerController.update_a_customer)
    .delete(customerController.delete_a_customer);
};
