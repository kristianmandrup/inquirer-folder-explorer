const folder = require('./chooseFolder');
const promisify = require('es6-promisify');

module.exports = promisify(folder);