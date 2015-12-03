# grunt-openport-async

Gets next open port async so grunt config tasks i.e. `load-grunt-config` can
occur after an open port is available. Can be called multiple times.

## Install

	npm i -D grunt-openport-async

## Usage

Typically you'd get the next available port and set it so configs can use it.

	require('grunt-openport-async')(grunt)
	.then(function(port) {
      // Recommended: set the available port for use in other configs
      grunt.config('port', port);
	  // Or do grunt.initConfig() here
	});
	
I recommend using `load-grunt-config` to have a clean grunt config setup.
`grunt-openport-async` queues all tasks run after it so you can run
`load-grunt-config` sequentially and have the tasks run in sequence.

	require('grunt-openport-async')(grunt)
	.then(function(port) {
      grunt.config('port', port);
	});

	// port is available via grunt.config.get('port') when your configs are
	// loaded by load-grunt-config
	require('load-grunt-config')(grunt, {
	  jitGrunt: true
	});

## Options

See [openport](https://www.npmjs.com/package/openport) for all the options you
can pass as the second argument.

	require('grunt-openport-async')(grunt, {
      startingPort: 1024,
      endingPort: 2000,
      avoid: [1025, 1500]
	})
	.then(function(port) {
	  // Handle results
	});
