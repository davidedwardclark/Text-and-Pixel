module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy HTML files into the build except for micro sites
        copy: {
            main: {
                files: [
                    {expand: true, src: ['*.html'], dest: 'build/'}
                ]
            }
        },

        // CSS Concatenate & Minify
        cssmin: {
            combine: {
                files: {
                    'build/css/screen.css': ['css/screen.css'],
                    'build/css/normalize.css': ['css/normalize.css']
                }
            }
        },

        // Image Optimization
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img'
                }]
            }
        },

        // Cache Bust
        hashres: {
            options: {
                encoding: 'utf8',
                fileNameFormat: '${name}.${hash}.cache.${ext}',
                renameFiles: true
            },
            images: {
                options: {},
                src: [
                    'build/img/**/*.{png,jpg,gif}'
                ],
                dest: ['build/**/*.html', 'build/css/screen.css']
            },
            css: {
                options: {},
                src: [
                    'build/css/screen.css',
                    'build/css/normalize.css'
                ],
                dest: 'build/**/*.html'
            }
        },

        // Deploy to S3
        aws: grunt.file.readJSON(process.env.HOME+'/.grunt_aws'),
        s3: {
            options: {
                key: '<%= aws.key %>',
                secret: '<%= aws.secret %>',
                bucket: 'www.textandpixel.com',
                access: 'public-read'
            },
            dev: {
                options: {
                    maxOperations: 20
                },
                sync: [
                    {
                        options: {
                            verify: true,
                            headers: {
                                "Content-Type": "image/x-icon",
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: '*.ico',
                        dest: ''
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "text/html",
                                "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
                                "Expires": "Fri, 01 Jan 1990 00:00:00 GMT"
                            }
                        },
                        src: 'build/*.html',
                        dest: ''
                    },
                    {
                        options: {
                            verify: true,
                            gzip: true,
                            headers: {
                                "Content-Encoding": "gzip",
                                "Content-Type": "text/css",
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: 'build/css/*.css',
                        dest: 'css/'
                    },
                    {
                        options: {
                            verify: true,
                            headers: {
                                "Cache-Control": "max-age=630720000, public",
                                "Expires": new Date(Date.now() + 63072000000).toUTCString()
                            }
                        },
                        src: 'build/img/**/*',
                        dest: 'img/',
                        rel: 'build/img/'
                    }
                ]
            }
        },

        // Cleanup
        clean: ['build']
    });

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-hashres');
    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // On run
    grunt.registerTask('default', ['copy', 'cssmin', 'imagemin', 'hashres', 's3', 'clean']);

};
