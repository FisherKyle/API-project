# **JS BUILD TOOLS SETUP**
#
----
----
## [   PROJECT SKELETON   ]
----
----

### 1. If working on personal computer or new non-Epicodus machine:
##### $ brew install node
##### $ npm install bower -g
##### $ npm install gulp -g
#
_Further Reading (re: '$ brew install node'): https://www.learnhowtoprogram.com/javascript/getting-started-with-javascript-2f9a73dc-b7f5-4a22-9101-e69d49f552ac/installing-node-js_

#### When you already have an existing gulpfile.js, you can avoid individually installing each package. You’ll need the following:
- gulpfile.js
- package.json -> keeps track of back-end dependencies (gulp packages)
- bower.json -> keeps track of bower packages (front-end)
- .gitignore
- js/ (folder) with an -interface.js file (so that we can create a tmp folder and not have errors)
- README.md (remember to link to gh-pages)
- index.html

_Note: if you do not have an existing package.json or bower.json, you can run ‘npm init’ or ‘bower init’ to create those respective files._

### 2. Once you have all of the above-ingredients, RUN:
##### $ npm install
##### $ bower install
##### $ gulp build
##### $ gulp serve
#
_Reference: https://github.com/FisherKyle/API-project.git_

----
----
## [   NPM & GULP SETUP (if starting from scratch without skeleton)   ]
----
----
_Reference: https://www.learnhowtoprogram.com/javascript/introduction-to-javascript/introducing-npm-and-gulp_
##### $ npm init
#
---
_hit enter multiple times :_

    {
      "name": "YOUR-APP-NAME",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "directories": {
        "test": "test"
      },
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
    -------------------
##### $ npm install gulp --save-dev
#
-------------------
##### $ npm install gulp -g
_(only run this command if this is the first time you are using gulp on your machine)_

-------------------
##### $ npm install browserify --save-dev
#
-------------------
#### Modify .gitignore:

    node_modules/
    .DS_Store
    tmp/
    build/
    .env
    bower_components/

-------------------
##### $ touch gulpfile.js
#
-------------------
#### Modify gulpfile.js:

    var gulp = require('gulp');
-------------------
##### $ npm install vinyl-source-stream --save-dev
_(this is an npm package used for placing browserified source code into a new file.)_

-------------------
#### Modify gulpfile.js:

    var browserify = require('browserify');
    var source = require('vinyl-source-stream');
-------------------

#### Modify gulpfile.js:

    gulp.task('jsBrowserify', function() {
      return browserify({ entries: ['./js/YOURAPPNAME-interface.js'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./build/js'));
    });

-------------------
### Generate the 'build' folder:

##### $ gulp jsBrowserify
#
-------------------

##### Update <script> tags:
#
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script type="text/javascript" src="build/js/app.js"></script>
-------------------
##### $ npm install gulp-concat --save-dev
#
-------------------
### Modify gulpfile.js:

    ...

    var concat = require('gulp-concat');

    ...

    gulp.task('concatInterface', function() {
      return gulp.src(['./js/pingpong-interface.js', './js/signup-interface.js'])
        .pipe(concat('allConcat.js'))
        .pipe(gulp.dest('./tmp'));
    });

    ...

-------------------
### Modify browserify task:
    ...
    gulp.task('jsBrowserify', ['concatInterface'], function() {
      return browserify({ entries: ['./tmp/allConcat.js'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./build/js'));
    });
    ...
-------------------

### Run new version of browserify task:

##### $ gulp jsBrowserify
#
-------------------

#### Modify concatInterface task
_- We can shorten our new concatenation task even more by using a globbing pattern using *_ :

    ...
    gulp.task('concatInterface', function() {
      return gulp.src(['./js/*-interface.js'])
        .pipe(concat('allConcat.js'))
        .pipe(gulp.dest('./tmp'));
    });
    ...
-------------------

### MINIFY:
##### $ npm install gulp-uglify --save-dev
#

-------------------

        MODIFY gulpfile.js so we can use Minify:
        var uglify = require('gulp-uglify');

-------------------

        CREATE task to minify:

        gulp.task("minifyScripts", ["jsBrowserify"], function(){
          return gulp.src("./build/js/app.js")
            .pipe(uglify())
            .pipe(gulp.dest("./build/js"));
        });

-------------------

##### $ gulp minifyScripts
#

-------------------

##### $ npm install gulp-util --save-dev
#

-------------------

### Modify gulpfile.js so we can use our new package:

    var utilities = require('gulp-util');

-------------------

##### $ gulp build --production
#
-------------------

##### $ gulp build
#
-------------------
### Modify gulpfile.js so we can use our new package:

    var buildProduction = utilities.env.production;

-------------------
### Add our build task (place at the end of our gulpfile.js since it is using all of our other tasks.):

    ...
    gulp.task("build", function(){
      if (buildProduction) {
        gulp.start('minifyScripts');
      } else {
        gulp.start('jsBrowserify');
      }
    });
    ...

-------------------

##### $ npm install del --save-dev
#
-------------------

### Modify gulpfile.js so we can use our new package:

    var del = require('del');

-------------------

### Add our clean task:
    ...
    gulp.task("clean", function(){
      return del(['build', 'tmp']);
    });
    ...

-------------------
### Modify existing build task to include 'clean':

    gulp.task("build", ['clean'], function(){
      if (buildProduction) {
        gulp.start('minifyScripts');
      } else {
        gulp.start('jsBrowserify');
      }
    });

-------------------

##### $ gulp build
#
####   _- or -_
##### $ gulp build --production
#
-------------------

##### $ npm install jshint --save-dev
##### $ npm install gulp-jshint --save-dev
#
-------------------

### Modify gulpfile.js so we can use our new linter/jshint package:

    var jshint = require('gulp-jshint');

-------------------

### Add our jshint task:

    gulp.task('jshint', function(){
      return gulp.src(['js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    });

-------------------

##### $ gulp jshint
#
#
#
#
----
----
## [   BOWER SETUP   ]
----
----

##### _https://www.learnhowtoprogram.com/javascript/modern-js-apps/introducing-bower_
#
-------------------
##### $ npm install bower -g
#
-------------------
##### $ bower init
#
-------------------

_hit enter multiple times :_

    {
        "name": "YOUR-APP-NAME",
        "description": "",
        "main": "index.js",
        "license": "ISC",
        "moduleType": [],
        "homepage": "",
        "ignore": [
        "*/.",
        "node_modules",
        "bower_components",
        "test",
        "tests"
      ]
    }

-------------------

##### $ bower install jquery --save
#
-------------------

##### $ bower install
#
-------------------

### Update <script> tag by replacing:
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>

with:

    <script src="bower_components/jquery/dist/jquery.min.js"></script>

-------------------

##### $ bower install bootstrap --save
#
-------------------

##### Here is what the final index.html <head> should look like:
#

    <head>
      <script src="bower_components/jquery/dist/jquery.min.js"></script>
      <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
      <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
      <script type="text/javascript" src="build/js/app.js"></script>
      <title>YOUR APP TITLE</title>
    </head>

-------------------

##### $ npm install bower-files --save-dev
#
-------------------

### Modify gulpfile.js so we can use bower packages:

    var lib = require('bower-files')();

-------------------

### Add our bowerJS task:

    gulp.task('bowerJS', function () {
      return gulp.src(lib.ext('js').files)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
    });

-------------------

### Our <head> section should look like this now:

    <head>
      <script src="build/js/vendor.min.js"></script>
      <script type="text/javascript" src="build/js/app.js"></script>
      <title>Ping Pong</title>
    </head>

-------------------

### Run this every time we add a new JaveScript front-end dependency:

##### $ gulp bowerJS
#
-------------------
### Update .gitignore by adding build and tmp folders:
#
    node_modules/
    .DS_Store
    build/
    tmp/

-------------------

#### Let's add a similar task to load all of our CSS dependencies into a single file:

### 1. mkdir css inside of build folder
### 2. touch vendor.css inside of build/css/
### 3. include reference to it in our index.html file:
    <link rel="stylesheet" href="build/css/vendor.css">

-------------------

### Add this new task to gulpfile.js:

    gulp.task('bowerCSS', function () {
      return gulp.src(lib.ext('css').files)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./build/css'));
    });

-------------------

### Modify existing-->
    var lib = require('bower-files')();

### Change to-->
    var lib = require('bower-files')({
      "overrides":{
        "bootstrap" : {
          "main": [
            "less/bootstrap.less",
            "dist/css/bootstrap.css",
            "dist/js/bootstrap.js"
          ]
        }
      }
    });

-------------------

#### Finally, let's combine both these 2 Bower tasks into one, since they can run in parallel.
#### Let's add this task to the gulpfile after our two Bower tasks:
#
    gulp.task('bower', ['bowerJS', 'bowerCSS']);

-------------------
#
    gulp.task('build', ['clean'], function(){
      if (buildProduction) {
        gulp.start('minifyScripts');
      } else {
        gulp.start('jsBrowserify');
      }
      gulp.start('bower'); ***** ADD THIS LINE AT THE END OF OUR BUILD TASK *****
    });

-------------------

##### $ npm install browser-sync --save-dev
#
-------------------
### Add to gulpfile.js:

    var browserSync = require('browser-sync').create();

    gulp.task('serve', function() {
      browserSync.init({
        server: {
          baseDir: "./",
          index: "index.html"
        }
      });
    });
-------------------
### Modify gulpfile serve

    gulp.task('serve', function() {
      browserSync.init({
        server: {
          baseDir: "./",
          index: "index.html"
        }
      });

      gulp.watch(['js/*.js'], ['jsBuild']); ***** ADD THIS LINE *****
    });
-------------------
### Add to gulpfile.js:

    gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
      browserSync.reload();
    });


-------------------
####  Modify gulpfile serve:
#
        gulp.task('serve', function() {
          browserSync.init({
            server: {
              baseDir: "./",
              index: "index.html"
            }
        });

      gulp.watch(['js/*.js'], ['jsBuild']);
      gulp.watch(['bower.json'], ['bowerBuild']); ***** ADD THIS LINE *****

    });


-------------------
### Add to gulpfile.js:

    gulp.task('bowerBuild', ['bower'], function(){
      browserSync.reload();
    });

-------------------
### Modify gulpfile serve:

    gulp.task('serve', function() {
      browserSync.init({
        server: {
          baseDir: "./",
          index: "index.html"
        }
    });

      gulp.watch(['js/*.js'], ['jsBuild']);
      gulp.watch(['bower.json'], ['bowerBuild']);
      gulp.watch(['*.html'], ['htmlBuild']); ***** ADD THIS LINE *****

    });

-------------------
### Add to gulpfile.js:

    gulp.task('htmlBuild', function() {
      browserSync.reload();
    });
#
___
___
###### **_Guide Created By: [Lisa MacCarrigan](https://github.com/lisamaccarrigan) & [Kyle Fisher](https://github.com/fisherkyle)_**
