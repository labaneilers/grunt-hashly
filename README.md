grunt-hashly
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

This task primarily delegates to [hashly](http://github.com/labaneilers/hashly), so please consider the documentation as required reading for advanced configuration.

#### basePath
Type: `String`  (required)

Sets the base path to use (from which all paths will be root-relative) when generating the hashly manifest file.

#### targetPath
Type: `String`
Default: `basePath`

Optionally specify a target directory to which hashed files and the manifest should be copied. If not specified, files are hashed in-place.

### Usage examples

#### Basic usage

This configuration will output all hashed files and the manifest in place.

```js
// Project configuration.
grunt.initConfig({
  hashly: {
    my_target: {
      basePath: "./staticFiles"
    }
  }
});
```