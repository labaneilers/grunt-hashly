"use strict";

//var chalk = require("chalk");
var path = require("path");

module.exports = function (grunt) {

    grunt.registerMultiTask("hashly", "Cache bust with hashly.", function () {

        var hashly = require("hashly");

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            manifestFormat: "json",
            logger: grunt.verbose.writeln,
            logError: grunt.log.error,
        });

        if (!this.data.basePath) {
            throw new Error("Config must specify 'basePath' property.");
        }

        var basePath = path.resolve(this.data.basePath);
        var targetPath = path.resolve(this.data.targetPath || this.data.basePath);

        if (!grunt.file.exists(basePath)) {
            throw new Error("basePath: " + basePath + " doesn't exist.");
        }

        if (!grunt.file.isDir(basePath)) {
            throw new Error("basePath: " + basePath + " is not a directory.");
        }

        var files;
        if (this.data.files) {
            files = grunt.file.expand(this.data.files)
                .map(function (f) {
                    // Map full paths
                    return path.resolve(f);
                })
                .filter(function (f) {
                    // Include only files, not directories
                    return grunt.file.isFile(f);
                });
        } else {
            files = [];
            grunt.file.recurse(basePath, function (f) {
                files.push(f);
            });
        }

        if (this.data.clean) {
            hashly.clean(basePath, options);
            return;
        }

        hashly.processFiles(files, basePath, targetPath, options);
    });
};