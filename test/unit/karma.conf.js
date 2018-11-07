// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function karmaConfig (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    client: {
      captureConsole: true
    },
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },
    logLevel: config.LOG_DEBUG,
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    reporters: ['coverage', 'coveralls'],
    // due to https://github.com/vuejs-templates/webpack/issues/474, below entry was added
    files: ['../../node_modules/es6-promise/dist/es6-promise.auto.js','./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    }
  })
}
