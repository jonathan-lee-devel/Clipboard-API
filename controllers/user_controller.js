/**
 * user_controller.js
 * 
 * Controller responsible for defining appropriate actions
 * which will be set to appropriate routes by user router.
 */

 exports.list_all_users = (req, res) => {

    var users_temp = [ 'User1', 'User2', 'User3' ];

    res.json(users_temp);
 }