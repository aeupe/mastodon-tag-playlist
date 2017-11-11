module.exports = function(grunt){
	grunt.initConfig({
		cssmin: {
			default: {
				files: [{
					expand: true,
					cwd: 'public/css',
					src: ['*.css', '!*.min.css'],
					dest: 'public/css',
					ext: '.min.css'
				}]
			}
		},
		babel: {
			default: {
				files: {
					'public/js/main.js_': 'public/js/main.js',
					'public/js/script.js_': 'public/js/script.js'
				}
			}
		},
		browserify: {
			default: {
				files: {
					'public/js/bundle.js_': ['public/js/main.js_']
				}
			}
		},
		uglify: {
			default: {
				files: [{
					expand: true,
					cwd: 'public/js',
					src: ['*.js_', '!main.js_'],
					dest: 'public/js',
					ext: '.min.js'
				}]
			}
		},
		clean: {
			default: ['public/js/*.js_']
		},
	});
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['cssmin', 'babel', 'browserify', 'uglify', 'clean'])
}