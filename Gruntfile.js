module.exports = function(grunt) {
    grunt.initConfig({
      watch: {
        js: {
          files: 'js/*.js',
          tasks: ['uglify:build']
        },
        css: {
          files: 'css/*.css',
          tasks: ['cssmin:minify'],
        }
      },
      uglify: {
        build: {
          expand: true,
          cwd: 'js',
          src: ['*.js', '!*.min.js'],
          dest: 'js',
          ext: '.min.js'
        }
      },
      cssmin: {
          minify: {
              expand: true,
              cwd: 'css',
              src: ['*.css', '!*.min.css'],
              dest: 'css',
              ext: '.min.css'
            },
        }
    });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default',[
        'uglify:build', 
        'cssmin:minify', 
        'watch'
      ]);
};