const path = require('path');

module.exports = {
  resolve: {
    alias: {
      pages: path.resolve(__dirname, 'cypress/pages')
    }
  }
};
