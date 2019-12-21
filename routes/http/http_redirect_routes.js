/**
 * http_redirect_routes.js
 * 
 * Redirects all incoming HTTP traffic to HTTPS by redirecting,
 * utilizing request hostname and url, prepending HTTPS and inserting appropriate port number
 */

module.exports = function (app) {
    
    app.route("*").get( (req, res) => {// Redirects all HTTP traffic to HTTPS
        res.redirect("https://" + req.hostname + ":" + PORT + req.url);
    });

}