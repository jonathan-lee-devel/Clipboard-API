/**
 * index_controller.js
 * 
 * IMPORTANT NOTE: It is the responsibility of routers in this applications current
 * configuration to restrict access to specific routes/resources using the provided
 * auth.ensure_authenticated function
 *
 * Controller responsible for defining appropriate actions
 * which will be set to appropriate routes by index router.
 */

exports.index_all = (req, res) => {
  res.send(`Sent from Clipboard API ( ${req.url} ): ${new Date()}`);
};
