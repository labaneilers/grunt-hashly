"use strict";

var chalk = require("chalk");

module.exports = function (grunt) {

    grunt.log.writeln("heay");

    var hashly = require("hashly");

    grunt.log.writeln("heay2");

    grunt.registerMultiTask("hashly", "Cache bust with hashly.", function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            manifestFormat: "json",
            logger: grunt.log.writeln
        });

        // Iterate over all src-dest file pairs.
        this.files.forEach(function (f) {
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn("Source file " + chalk.cyan(filepath) + " not found.");
                    return false;
                } else {
                    return true;
                }
            });

            // Minify files, warn and fail on error.
            var result;
            try {
                result = hashly.process(src, f.dest, options);
            } catch (e) {
                console.log(e);
                var err = new Error("Hashly failed.");
                if (e.message) {
                    err.message += "\n" + e.message + ". \n";
                    if (e.line) {
                        err.message += "Line " + e.line + " in " + src + "\n";
                    }
                }
                err.origError = e;
                grunt.log.warn("Hashly " + chalk.cyan(src) + " failed.");
                grunt.fail.warn(err);
            }

            // Write the destination file.
            grunt.file.write(f.dest, result);

            grunt.log.writeln("File " + chalk.cyan(f.dest) + " created: ");
        });
    });
};