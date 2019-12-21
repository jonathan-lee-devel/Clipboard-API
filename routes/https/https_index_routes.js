/**
 * https_index_routes.js
 * 
 * Responsible for mapping all https index routes ('/') -> appropriate controller actions
 */

module.exports = function (app) {
    
    app.route("/").get((req, res) => {// Respond to index route with simple https response
        console.log("Session ID: " + req.session.id);
        res.send("Sent from Clipboard API v1 - " + new Date());
    });

}