module.exports = function(grunt) {
  'use strict';

  var polyfillFiles = [
    "WeakMap/weakmap.js",
    "MutationObservers/MutationObserver.js",
    "CustomElements/src/scope.js",
    "CustomElements/src/Observer.js",
    "CustomElements/src/CustomElements.js",
    "CustomElements/src/Parser.js",
    "CustomElements/src/boot.js"
  ].concat([
    'amd.js',
    'amd-config.js'
  ]);

  grunt.initConfig({
    concat: {
      polyfill: {
        src: polyfillFiles,
        dest: 'doc/lib/custom-elements.js'
      }
    },
    uglify: {
      all: {
        files: {
          'doc/lib/custom-elements.min.js': ['doc/lib/custom-elements.js'],
          'doc/lib/marked.min.js': ['node_modules/marked/lib/marked.js'],
          'doc/lib/jquery.min.js': ['node_modules/jquery/dist/jquery.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat:polyfill','uglify']);
};
