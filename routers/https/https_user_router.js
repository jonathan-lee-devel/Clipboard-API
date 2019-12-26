const express = require("express");
const router = express.Router();
const user_controller = require("../../controllers/user_controller");

function check_authenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function check_not_authenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
}

// Will require POST conversion to DELETE,
// DELETE always safer when deleting
router.delete('/logout', (req, res) => {
    req.logOut();
    req.redirect('/login');
})

router.get("/", check_authenticated, user_controller.list_all_users);

router.get("/find/:user_email", user_controller.find_user_by_email);

router.post("/register", user_controller.register_user);

router.post("/login", user_controller.verify_user);

module.exports = router;
