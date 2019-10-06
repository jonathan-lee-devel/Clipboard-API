"use strict";

module.exports = function(app) {
  const HTTPS_PORT = 8080;

  app.route("*").get((req, res) => {
    res.redirect("https://" + req.hostname + ":" + HTTPS_PORT + req.url);
  });
};
