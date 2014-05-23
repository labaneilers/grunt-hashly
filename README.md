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

Optionally specify the format of the manifest file. Supports 'json' or 'tab'.

#### processCss
Type: `Boolean`
Default: `false`

If true, image paths in CSS files are rewritten to point to the hashed versions of the images. This ensures that when images change,
the url of the CSS that references them also changes.

#### exclude
Type: `String`

Optionally specify a comma-delimited list of globbing patterns to use to exclude files from being hashed/copied.

#### include
Type: `String`

Optionally specify a comma-delimited list of globbing patterns to use to include files to be hashed/copied.

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