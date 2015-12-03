'use strict';
module.exports = grunt => {
  require('jit-grunt')(grunt);
  require('time-grunt')(grunt);
  grunt.registerTask('lastTask', function() {
    console.log('lastTask');
  });

  //--- Example of typical usage ---//
  require('./openport-async')(grunt, {startingPort: 10000})
  .then(port => {
    handlePort(port);
  });

  require('load-grunt-config')(grunt, {
    jitGrunt: true
  });
  //--- end ---//

  require('./openport-async')(grunt)
  .then(port => {
    console.log('Gruntfile.js - another port:', port);
  });

  // Test: Should be run after another port is returned
  grunt.task.run('lastTask');

  function handlePort(port) {
    // Recommended: set the available port for use in other configs
    grunt.config('port', port);
    // Use in other configs via grunt.config.get('port')

    var msg = 'Gruntfile.js - port: ' + port;
    if (port >= 10000) {
      console.log(msg);
    } else {
      throw new Error(msg);
    }
  }
};
