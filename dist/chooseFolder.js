'use strict';

const inquirer = require('inquirer');
const path = require('path');
const getDirectories = require('./getDirectories');

module.exports = function (opts = {}, callback) {
  var depth = 0;
  let title = opts.title || 'Please choose a folder';
  let basePath = opts.basePath || './';

  prompt(basePath);

  function prompt(srcPath) {
    var choices = getDirectories(srcPath);

    if (choices.length > 0) {
      choices.push(new inquirer.Separator());
    }

    choices.push('choose this folder');

    if (depth > 0) {
      choices.push(new inquirer.Separator());
      choices.push('.. back');
    }

    process.stdout.write('\u001B[2J\u001B[0;0f');

    inquirer.prompt([{
      type: 'list',
      name: 'path',
      message: function () {
        return title + ` (current folder: ${ srcPath })`;
      },
      choices: choices
    }]).then(answers => {
      if (answers.path === 'choose this folder') {
        callback(null, srcPath);
      } else if (answers.path === '.. back') {
        depth--;
        prompt(path.dirname(srcPath));
      } else {
        depth++;
        prompt(path.join(srcPath, answers.path));
      }
    });
  }
};