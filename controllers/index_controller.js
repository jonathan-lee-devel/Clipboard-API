/**
 * index_controller.js
 *
 * Controller responsible for defining appropriate actions
 * which will be set to appropriate routes by index router.
 */

exports.index_all = (req, res) => {
  res.send(`Sent from Clipboard API: ${new Date()}`);
};
