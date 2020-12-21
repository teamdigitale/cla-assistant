module.exports = function (grunt) {
    let appJsFiles = [
        'src/client/app.js',
        'src/client/api.js',
        'src/client/controller/**/*.js',
        'src/client/modals/**/*.js',
        'src/client/services/**/*.js'
    ];

    let config = {

        pkg: grunt.file.readJSON('package.json'),

        coveralls: {
            target: {
                src: 'output/coverage/lcov.info'
            }
        },

        mocha_istanbul: {
            coverage: {
                src: 'src/tests/server',
                options: {
                    coverage: true,
                    mask: '**/*.js',
                    coverageFolder: 'output/coverage'
                }
            }
        },

        // server tests
        mochaTest: {
            server: {
                options: {
                    timeout: 1000
                },
                src: ['src/tests/server/**/*.js']
            },
            debugServer: {
                options: {
                    timeout: 400000
                },
                src: ['src/tests/server/**/*.js']
            }
        },

        // client tests
        karma: {
            unit: {
                configFile: 'src/tests/karma.config.js'
            }
        },

        eslint: {
            options: {
                configFile: './.eslintrc.js'
            },
            target: ['*.js', 'src']
        },

        scsslint: {
            allFiles: [
                'src/client/assets/styles/*.scss'
            ],
            options: {
                config: '.scss-lint.yml',
                colorizeOutput: true
            }
        },

        watch: {
            uglify: {
                tasks: ['uglify'],
                files: appJsFiles
            },
            eslint: {
                tasks: ['eslint'],
                files: ['src/**/*.js', '!src/client/app.min.js']
            },
            mocha: {
                tasks: ['mochaTest:server'],
                files: ['src/server/**/*.js', 'src/tests/server/**/*.js', '!src/client/app.min.js']
            },
            karma: {
                tasks: ['karma'],
                files: ['src/client/**/*.js', 'src/tests/client/**/*.js', '!src/client/app.min.js']
            }
        },

        uglify: {
            options: {
                sourceMap: true,
                sourceMapIncludeSources: true,
                mangle: false
            },
            target: {
                files: {
                    'src/client/app.min.js': appJsFiles
                }
            }
        },
        copy: {
          dist: {
              files: [{
                  expand: true,
                  dot: true,
                  cwd: 'node_modules/font-awesome/css',
                  src: ['font-awesome.min.css', 'font-awesome.css.map'],
                  dest: 'src/client/assets/styles/'
              },{
                  expand: true,
                  dot: true,
                  cwd: 'node_modules/font-awesome',
                  src: ['fonts/*.*'],
                  dest: 'src/client/assets/'
                },{
                  expand: true,
                  dot: true,
                  cwd: 'node_modules/angular',
                  src: ['*.js', '*.map'],
                  dest: 'src/client/assets/js/angular/angular'
                },{
                  expand: true,
                  dot: true,
                  cwd: 'node_modules/angular-scroll',
                  src: ['*.min.js', '*min.js.map'],
                  dest: 'src/client/assets/js/angular/angular-scroll'
                },{
                  expand: true,
                  dot: true,
                  cwd: 'node_modules/angular-sanitize',
                  src: ['*.min.js', '*min.js.map'],
                  dest: 'src/client/assets/js/angular/angular-sanitize'
                },{
                  expand: true,
                  dot: true,
                  cwd: 'node_modules/angular-animate',
                  src: ['*.min.js', '*min.js.map'],
                  dest: 'src/client/assets/js/angular/angular-animate'
                },{
                  expand: true,
                  dot: true,
                  cwd: 'node_modules/angular-route',
                  src: ['*.min.js', '*min.js.map'],
                  dest: 'src/client/assets/js/angular/angular-route'
                },{
                  expand: true,
                  dot: true,
                  cwd: 'node_modules/angular-ui-router',
                  src: ['release/*.min.js', 'release/*.min.js.map'],
                  dest: 'src/client/assets/js/angular/angular-ui-router'
                },{
                  expand: true,
                  dot: true,
                  cwd: 'node_modules/ui-select',
                  src: ['dist/*.min.js', 'dist/*.min.js.map'],
                  dest: 'src/client/assets/js/angular/ui-select'
                },{
                  expand: true,
                  dot: true,
                  cwd: 'node_modules/ui-select',
                  src: ['dist/*.min.css', 'dist/*.min.css.map'],
                  dest: 'src/client/assets/styles/angular/ui-select'
                },{
                  expand: true,
                  dot: true,
                  cwd: 'node_modules/jquery/dist',
                  src: ['*.min.js', '*.min.map'],
                  dest: 'src/client/assets/js/vendor'
                },{
                  expand: true,
                  dot: true,
                  cwd: 'node_modules/papaparse',
                  src: ['papaparse.min.js'],
                  dest: 'src/client/assets/js/vendor'
                },{
                  expand: true,
                  dot: true,
                  cwd: 'node_modules/clipboard/dist',
                  src: ['*.min.js'],
                  dest: 'src/client/assets/js/vendor'
              }]
          }
      }
    };

    // Initialize configuration
    grunt.initConfig(config);

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('build', ['uglify', 'copy']);
    grunt.registerTask('lint', ['eslint', 'scsslint']);
    grunt.registerTask('coverage', ['mocha_istanbul']);
    grunt.registerTask('default', ['uglify', 'copy', 'eslint', 'mochaTest:server', 'karma', 'watch']);
    grunt.registerTask('test', ['eslint', 'mochaTest:server', 'karma']);
    grunt.registerTask('debug_test', ['mochaTest:debugServer']);
};
