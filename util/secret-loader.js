const fs = require('fs');

/**
 * Simple helper function for loading UTF-8 text data from secret files
 */
function loadSecret(fileName) {
    return (fs.readFileSync('./secrets/' + fileName, 'utf-8', function(err, data) {
        if (err) throw err;
        return data.toString();
    })).trim();
};

module.exports.loadSecret = loadSecret;