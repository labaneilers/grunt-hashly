grunt-hashly [![Build Status](https://secure.travis-ci.org/labaneilers/grunt-hashly.png?branch=master)](http://travis-ci.org/labaneilers/grunt-hashly)
======

grunt-hashly is a [grunt](http://gruntjs.com) binding for [hashly](https://github.com/labaneilers/hashly), which is a build-time tool that enables cache-busting for static files (images, JavaScript, CSS, etc). 
 
## Getting Started
This plugin requires Grunt `^0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hashly --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hashly');
```

## hashly task
_Run this task with the `grunt hashly` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

This task offers all the same options as the [hashly command line interface](http://github.com/labaneilers/hashly), so please refer to the documentation for advanced configuration.

#### basePath
Type: `String`  (required)

Sets the base path to use (from which all paths will be root-relative) when generating the hashly manifest file.

#### targetPath
Type: `String`
Default: `basePath`

Optionally specify a target directory to which hashed files and the manifest should be copied. If not specified, files are hashed in-place.

#### manifestFormat
Type: `String`
Default: `json`

Optionally specify the format of the manifest file. Currently supports "json", "json-object" (json with original path as key) or "tab" (tab delimited). Default is "json".

#### manifestPath
Type: `String`
Default: `json`

Specifies a path for the manifest file. If not specified, the manifest is named "manifest.{ext}" and is placed in the destination directory root.

#### processCss
Type: `Boolean`
Default: `false`

If true, image paths in CSS files are rewritten to point to the hashed versions of the images. This ensures that when images change,
the url of the CSS that references them also changes.

#### include
Type: `String`

Optionally specify a comma-delimited list of globbing patterns to use to include files to be hashed/copied.

#### exclude
Type: `String`

Optionally specify a comma-delimited list of globbing patterns to use to exclude files from being hashed/copied.

#### passthrough
Type `Boolean`
Default `false`

A globbing expression. Any matching files will be copied as-is to the destination folder. Has no effect if the destination is the same as the source.

#### amend
Type `Boolean`
Default `False`

Instructs hashly to amend an existing manifest, where it would normally delete and recreate it from scratch. This is useful for incrementally adding to a large filesystem.

#### quickhash
Type `Boolean`
Default `False`

Use the file size for binary files instead of the file contents. This makes processing large binary files extremely quick, though at a (extremely slight) risk that a hashcode will not change when a file is updated.

#### hashLength
Type `Integer`
Default `32`

Specifies the length of the hash used when renaming files. Default is 32 characters.

#### renameFormat
Type: `String`

Specifies the format to use when renaming files. Variables are specified using curly brackets (e.g., {variable}). Any other characters are directly included in the output.

Available variables include:
* {basename}: the base filename without extension
* {hash}: the hash value
* {extname}: the file extension

Default is "{basename}-hc{hash}{extname}".

#### continueOnError
Type `Boolean`
Default `False`

Ignore errors. Otherwise, hashly will abort on the first error.

#### continueOnPluginError
Type `Boolean`
Default `False`

Ignore errors from plugins. Takes precedence over continueOnError.

#### disabledPlugins
Type: `String`

Semicolon-delimited list of plugin names that should be disabled.

#### cleanOldDays
Type `Integer`
Default `0`

Deletes files that aren't in the manifest and are older than the specified number

#### sourcemapIncludePath
Type: `Boolean`
Default: `True`

Include the absolute path to the source map in the JS/CSS source, relative to base-dir.

#### sourcemapURLPrefix
Type: `String`

A URL prefix to apply to the source map tag, if it is not in the same location as the source.


### Usage examples

#### Basic usage

This configuration will output all hashed files and the manifest in place.

```js
grunt.initConfig({
  hashly: {
    my_target: {
      basePath: "./staticFiles"
    }
  }
});
```

#### Setting a targetPath

This configuration will output all hashed files and the manifest in the specified target directory.

```js
grunt.initConfig({
  hashly: {
    my_target: {
      basePath: "./staticFiles",
      targetPath: "./staticFilesProcessed"
    }
  }
});
```

#### Setting the manifest format to 'tab'

This configuration will output all hashed files and the manifest in place, with the manifest in tab-delimited format.

```js
grunt.initConfig({
  hashly: {
    my_target: {
      basePath: "./staticFiles",
      options: {
        manifestFormat: "tab"
      }
    }
  }
});
```

#### Setting an exclusion pattern

This configuration will exclude any *.pdf files from being hashed.

```js
grunt.initConfig({
  hashly: {
    my_target: {
      basePath: "./staticFiles",
      options: {
        exclude: "*.pdf"
      }
    }
  }
});
```