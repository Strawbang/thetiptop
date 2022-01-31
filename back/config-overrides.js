const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@' : 'src',
    '@Api' : 'src/api',
    '@Assets' : 'src/assets',
    '@Utilities' : 'src/assets/js/Utilities',
    '@Config' : 'src/config',
    '@Components': 'src/components',
    '@Pages' : 'src/pages',
  })(config);

  return config;
};
