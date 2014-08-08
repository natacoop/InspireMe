module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					port: 9001,
					base: ''
				}
			}
		},
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'compressed'
				},
				files: {                         // Dictionary of files
					'style.css': 'style.scss'      // 'destination': 'source'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 5 version', 'ie 7', 'ie 8', 'ie 9']
			},
			no_dest: {
				src: 'style.css'
			}
		},
		watch: {
			css: {
				files: ['styles/*.scss'],
				tasks: ['sass', 'autoprefixer'],
				options: {
					livereload: true
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// Run the server and watch for file changes
	grunt.registerTask('default', ['connect', 'sass', 'autoprefixer', 'watch']);
};