module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		
		watch: {
		  styles: {
		  	files: ['dev/styles/sass/*.scss'],
		    tasks: ['dev'],
		     options: {
		      spawn: true,
		    },
		  },
		},

		//SASS
		sass: {
			dev: {
				options: {
					style: 'expanded',
					banner: 
					'/* Project: <%= pkg.name  %> */\n' +
					'/* By: <%= pkg.author  %> */\n' + 
					'/* Date: <%= grunt.template.today("yyyy-mm-dd")  %> */\n'
				},
				files: [{
					expand: true,
					cwd: 'dev/styles/sass',
					src: ['*.scss'],
					dest: 'dev/styles/css',
					ext: '.css'
				}]
			},
			prod: {
				options: {
					style: 'compressed',
					banner: 
					'/* Project: <%= pkg.name  %> */\n' +
					'/* By: <%= pkg.author  %> */\n' + 
					'/* Date: <%= grunt.template.today("yyyy-mm-dd")  %> */\n'
				},
				files: [{
					expand: true,
					cwd: 'dev/styles/sass',
					src: ['*.scss'],
					dest: 'prod/styles/css',
					ext: '.min.css',
					extDot: 'first' 
				}]
			}
		},

		//AUTOPREFIXER
		autoprefixer: {
			options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
				cascade: false
			},
			dev: {
				options: {
					cascade: true
				},
				expand: true,
				flatten: true,
				src: 'dev/styles/css/*.css',
				dest: 'dev/styles/css/'
			},
			prod: {
				expand: true,
				flatten: true,
				src: 'prod/styles/css/*.css',
				dest: 'prod/styles/css'
			}
		},


	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//grunt.registerTask('default', ['watch' ]);

//Development
	grunt.registerTask('dev', ['sass:dev', 'autoprefixer:dev' ]);

//Production
	grunt.registerTask('prod', ['sass:prod', 'autoprefixer:prod']);
}