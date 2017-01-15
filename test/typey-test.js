/**
 * @file
 * Runs our tests.
 */

'use strict';

var sassTrue = require('sass-true');

let options = {
  file: 'test/sass/ratio-tests.scss',
  includePaths: [
    'stylesheets'
  ]
}
sassTrue.runSass(options, describe, it);

options.file = 'test/sass/rhythm-tests.scss';
sassTrue.runSass(options, describe, it);
