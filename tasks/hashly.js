"use strict";

//var chalk = require("chalk");
var path = require("path");
var fs = require("fs");

module.exports = function (grunt) {

    grunt.registerMultiTask("hashly", "Cache bust with hashly.", function () {

        var hashly = require("hashly");

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            manifestFormat: "json",
            logger: grunt.verbose.writeln,
            logError: grunt.log.error,

        });

        var files = grunt.file.expand(this.data.files)
            .map(function (f) {
                // Map full paths
                return path.resolve(f);
            })
            .filter(function (f) {
                // Include only files, not directories
                return fs.lstatSync(f).isFile();
            });

        var basePath = path.resolve(this.data.basePath);
        var targetPath = path.resolve(this.data.targetPath);

        hashly.processFiles(files, basePath, targetPath, options);
    });
};