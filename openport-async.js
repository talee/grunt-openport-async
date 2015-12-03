'use strict';
var openport = require('openport');
var _fufillments = [];
/**
 * Queues and pauses running grunt tasks until openport finds a port.
 * @param {Grunt} grunt
 * @param {object} openportOptions options to pass to openport.find
 */
module.exports = (grunt, openportOptions) => {
  openportOptions = openportOptions || {};
  return new Promise((resolve, reject) => {
    _fufillments.push({
      resolve: resolve,
      reject: reject,
      options: openportOptions
    });
    if (!grunt.task.exists('openport-async')) {
      grunt.registerTask('openport-async', 'Finding next available port',
          function() {
              var done = this.async();
              var fufillment = _fufillments.shift();
              openport.find(fufillment.options, (err, result) => {
                if (err) {
                  done(err);
                  fufillment.reject(err); 
                }
                else {
                  done();
                  fufillment.resolve(result);
                }
              });
      });
    }
    grunt.task.run('openport-async');
  });
};
