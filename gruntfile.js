/* globals module */

module.exports = function (grunt) {
    var config = {
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            uses_defaults: ["gruntfile.js", "./lib/**/*.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        hashly: {
            basePathMissing: {},
            basePathDoesntExist: {
                basePath: "./assets-doesnt-exist"
            },
            basePathIsFile: {
                basePath: "./assets/alreadyBusted.css"
            },
            inPlace: {
                basePath: "./assets/"
            },
            inPlaceExcludeJs: {
                basePath: "./assets/",
                options: {
                    exclude: "*.js"
                }
            },
            inPlaceIncludeCss: {
                basePath: "./assets/",
                options: {
                    include: "*.css"
                }
            },
            inPlaceExplicit: {
                files: "./assets/**/*",
                basePath: "./assets/"
            },
            inPlaceFilter: {
                files: "./assets/**/*.js",
                basePath: "./assets/"
            },
            inPlaceManifestTab: {
                basePath: "./assets/",
                options: {
                    manifestFormat: "tab"
                }
            },
            clean: {
                basePath: "./assets/",
                clean: true
            },
            altDist: {
                files: "./assets/**/*",
                basePath: "./assets/",
                targetPath: "./assetsDist/"
            }
        },
        clean: {
            assetsDist: ["./assetsDist/"],
            manifestTab: ["./assets/manifest.tab"]
        }
    };

    // Project configuration.
    grunt.initConfig(config);

    // NPM tasks
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.loadTasks("./tasks/");

    grunt.registerTask("travis", "default");

    grunt.registerTask("default", ["jshint"]);

    grunt.registerTask("beautify", ["jsbeautifier", "lineending"]);

    grunt.registerTask("cleanall", ["hashly:clean", "clean"]);

    var origWarn = grunt.fail.warn;

    grunt.registerTask("setupExpectedError", function () {
        var expectedMessage = this.args[0];

        var report = function (ex) {
            if (ex.message.indexOf(expectedMessage) < 0) {
                throw ex;
            }
            grunt.log.writeln("Caught error: " + ex);
        };

        grunt.fail.warn = report;
    });

    grunt.registerTask("restoreWarning", function () {
        grunt.fail.warn = function () {
            origWarn.apply(this, arguments);
        };
    });

    grunt.registerTask("verifyInPlace", function () {
        var file = "./assets/alreadyBusted-hc3a2235f433dd3f09b20af8e3f773ee6c.css";
        if (this.args.length > 0) {
            file = this.args[0];
        }

        if (!grunt.file.exists(file)) {
            throw new Error("Output file: " + file + " missing");
        }
    });

    grunt.registerTask("h-basePathMissing", ["setupExpectedError:Config must specify 'basePath' property", "hashly:basePathMissing"]);
    grunt.registerTask("h-basePathDoesntExist", ["setupExpectedError:assets-doesnt-exist doesn't exist", "hashly:basePathDoesntExist"]);
    grunt.registerTask("h-basePathIsFile", ["setupExpectedError:alreadyBusted.css is not a directory", "hashly:basePathIsFile"]);
    grunt.registerTask("h-inPlace", ["restoreWarning", "hashly:inPlace", "verifyInPlace", "hashly:clean"]);
    grunt.registerTask("h-inPlaceExplicit", ["restoreWarning", "hashly:inPlaceExplicit", "verifyInPlace", "hashly:clean"]);
    grunt.registerTask("h-inPlaceExcludeJs", ["restoreWarning", "hashly:inPlaceExcludeJs", "verifyInPlace", "hashly:clean"]);
    grunt.registerTask("h-inPlaceIncludeCss", ["restoreWarning", "hashly:inPlaceIncludeCss", "verifyInPlace", "hashly:clean"]);
    grunt.registerTask("h-inPlaceFilter", ["restoreWarning", "hashly:inPlaceFilter", "verifyInPlace:./assets/alreadyBusted-hcc2b92966bfe56f10073f2fc8a69a9e2d.js", "hashly:clean"]);
    grunt.registerTask("h-inPlaceManifestTab", ["restoreWarning", "hashly:inPlaceManifestTab", "verifyInPlace:./assets/manifest.tab", "hashly:clean", "clean:manifestTab"]);
    grunt.registerTask("h-altDist", ["restoreWarning", "hashly:altDist", "verifyInPlace:./assetsDist/alreadyBusted-hc3a2235f433dd3f09b20af8e3f773ee6c.css", "clean"]);

    grunt.registerTask("default", ["h-basePathMissing", "h-basePathDoesntExist", "h-basePathIsFile", "h-inPlace", "h-inPlaceExcludeJs", "h-inPlaceIncludeCss", "h-inPlaceExplicit", "h-inPlaceFilter", "h-altDist"]);

    grunt.registerTask("travis", ["default"]);
};