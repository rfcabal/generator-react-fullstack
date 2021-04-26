'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const askName = require('inquirer-npm-name');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');

function parseScopedName(name) {
  const nameFragments = name.split('/');
  const parseResult = {
    scopeName: '',
    localName: name
  };

  if (nameFragments.length > 1) {
    parseResult.scopeName = nameFragments[0];
    parseResult.localName = nameFragments[1];
  }

  return parseResult;
}

function makeGeneratorName(name) {
  const parsedName = parseScopedName(name);
  name = parsedName.localName;
  name = _.kebabCase(name);
  name = name.indexOf('generator-') === 0 ? name : 'generator-' + name;
  return parsedName.scopeName ? `${parsedName.scopeName}/${name}` : name;
}

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    return askName(
      {
        name: 'name',
        message: 'Your generator name',
        default: makeGeneratorName(path.basename(process.cwd())),
        filter: makeGeneratorName,
        validate: str => {
          return str.length > 'generator-'.length;
        }
      },
      this
    ).then(props => {
      this.props.name = props.name;
      Object.assign(this.props, parseScopedName(props.name));
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.localName) {
      this.log(
        `Your generator must be inside a folder named ${this.props.localName}\nI'll automatically create this folder.`
      );
      mkdirp.sync(this.props.localName);
      this.destinationRoot(this.destinationPath(this.props.localName));
    }

    this.fs.copy(this.templatePath('react-fullstack/**'), this.destinationPath('./'));
    // TODO: how do I insert messages?
    this.log('You installation was succesfully completed');
    // TODO: this dont want to work
    // this.yarnInstall('./package.json');
    this.npmInstall('package.json');
  }
};
