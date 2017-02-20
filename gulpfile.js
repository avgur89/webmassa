// Gulp.js configuration

// include gulp and plugins
var
  gulp = require('gulp'),
  newer = require('gulp-newer'),
  concat = require('gulp-concat'),
  preprocess = require('gulp-preprocess'),
  htmlclean = require('gulp-htmlclean'),
  imagemin = require('gulp-imagemin'),
  sass = require('gulp-sass'),
  csscomb = require('gulp-csscomb'),
  pleeease = require('gulp-pleeease'),
  jshint = require('gulp-jshint'),
  deporder = require('gulp-deporder'),            // Dependency Management (// requires: scrollTo.js tweetForm.js) at the top of fontloader.js. Will load first scrollTo then tweetForm
  stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  size = require('gulp-size'),
  del = require('del'),
  browsersync = require('browser-sync'),
  pkg = require('./package.json');

// file locations
var
  devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),   // echo $NODE_ENV, export NODE_ENV=production (or development)

  source = 'source/',
  dest = 'build/',

  html = {
    in: source + '*.html',
    watch: [source + '*.html', source + '_html_inc/**/*'],
    out: dest,
    context: {
      devBuild: devBuild,
      author: pkg.author,
      version: pkg.version
    }
  },

  htmlPortfolio = {
    in: source + 'portfolio/**/*.html',
    watch: [source + 'portfolio/**/*.html', source + 'portfolio/_html_inc/**/*'],
    out: dest + 'portfolio/',
    context: {
      devBuild: devBuild,
      author: pkg.author,
      version: pkg.version
    }
  },

  htmlPortfolioEn = {
    in: source + 'en/portfolio/**/*.html',
    watch: [source + 'en/portfolio/**/*.html', source + 'en/portfolio/_html_inc/**/*'],
    out: dest + 'en/portfolio/',
    context: {
      devBuild: devBuild,
      author: pkg.author,
      version: pkg.version
    }
  },

  htmlEn = {
    in: source + 'en/*.html',
    watch: [source + 'en/*.html', source + 'en/_html_inc/**/*'],
    out: dest + 'en/',
    context: {
      devBuild: devBuild,
      author: pkg.author,
      version: pkg.version
    }
  },

  images = {
    in: source + 'img/**/*.{gif,jpg,png,ico}',
    out: dest + 'img/'
  },

  svg = {
    in: source + 'img/SVG/**/*.svg',
    out: dest + 'img/SVG/'
  },

  css = {
    in: source + 'scss/main.scss',
    watch: [source + 'scss/**/*'],
    out: dest + 'css/',
    sassOpts: {
      outputStyle: 'nested',
      imagePath: '../img',
      precision: 3,
      errLogToConsole: true
    },
    pleeeaseOpts: {
      autoprefixer: { browsers: ['last 2 versions', '> 2%'] },
      pseudoElements: true,
      mqpacker: true,
      minifier: !devBuild
    }
  },

  fonts = {
		in: source + 'fonts/**/*',
		out: dest + 'fonts/'
	},

  libs = {
    in: source + 'libs/**/*',
		out: dest + 'libs/'
  },

  js = {
    in: source + 'js/**/*',
    out: dest + 'js/',
    filename: 'main.js'
  },

  jsEn = {
    in: source + 'en/js/**/*',
    out: dest + 'en/js/',
    filename: 'main.js'
  },

  syncOpts = {
    server: {
      baseDir: dest,
      index: 'index.html'
    },
    open: true,
    notify: true
  };

// show build type
console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');

// clean the build folder
gulp.task('clean', function() {
  del([
    dest + '*'
  ]);
});

// build HTML files
gulp.task('html', function() {
  var page = gulp.src(html.in).pipe(preprocess({ context: html.context }));
  if (!devBuild) {
    page = page
      .pipe(size({ title: 'HTML in' }))
      .pipe(htmlclean())
      .pipe(size({ title: 'HTML out' }));
  }
  return page.pipe(gulp.dest(html.out));
});

gulp.task('htmlEn', function() {
  var page = gulp.src(htmlEn.in).pipe(preprocess({ context: htmlEn.context }));
  if (!devBuild) {
    page = page
      .pipe(size({ title: 'HTML in' }))
      .pipe(htmlclean())
      .pipe(size({ title: 'HTML out' }));
  }
  return page.pipe(gulp.dest(htmlEn.out));
});

gulp.task('htmlPortfolio', function() {
  var page = gulp.src(htmlPortfolio.in).pipe(preprocess({ context: htmlPortfolio.context }));
  if (!devBuild) {
    page = page
      .pipe(size({ title: 'HTML in' }))
      .pipe(htmlclean())
      .pipe(size({ title: 'HTML out' }));
  }
  return page.pipe(gulp.dest(htmlPortfolio.out));
});

gulp.task('htmlPortfolioEn', function() {
  var page = gulp.src(htmlPortfolioEn.in).pipe(preprocess({ context: htmlPortfolioEn.context }));
  if (!devBuild) {
    page = page
      .pipe(size({ title: 'HTML in' }))
      .pipe(htmlclean())
      .pipe(size({ title: 'HTML out' }));
  }
  return page.pipe(gulp.dest(htmlPortfolioEn.out));
});

// manage images
gulp.task('images', function() {
  return gulp.src(images.in)
    .pipe(newer(images.out))
    .pipe(imagemin())
    .pipe(gulp.dest(images.out));
});

gulp.task('svg', function() {
  return gulp.src(svg.in)
    .pipe(newer(svg.out))
    .pipe(gulp.dest(svg.out));
});

// copy fonts
gulp.task('fonts', function() {
	return gulp.src(fonts.in)
		.pipe(newer(fonts.out))
		.pipe(gulp.dest(fonts.out));
});

// copy libs
gulp.task('libs', function() {
  return gulp.src(libs.in)
		.pipe(newer(libs.out))
		.pipe(gulp.dest(libs.out));
});

// compile Sass
gulp.task('sass', function() {
  return gulp.src(css.in)
    .pipe(sass(css.sassOpts))
    .pipe(size({ title: 'CSS in '}))
    .pipe(pleeease(css.pleeeaseOpts))
    .pipe(size({ title: 'CSS out '}))
    .pipe(csscomb())
    .pipe(gulp.dest(css.out))
    .pipe(browsersync.reload({ stream: true }));
});

// copy and minify js
gulp.task('js', function() {
  if (devBuild) {
    return gulp.src(js.in)
      .pipe(newer(js.out))
      .pipe(gulp.dest(js.out));
  } else {
    del([
      dest + 'js/*'
    ]);
    return gulp.src(js.in)
      .pipe(deporder())
      .pipe(concat(js.filename))
      .pipe(size({ title: 'JS in ' }))
      .pipe(stripdebug())
      .pipe(uglify())
      .pipe(size({ title: 'JS out ' }))
      .pipe(gulp.dest(js.out));
  }
});

gulp.task('jsEn', function() {
  return gulp.src(jsEn.in)
    .pipe(newer(jsEn.out))
    .pipe(gulp.dest(jsEn.out));
});

// browser sync
gulp.task('browsersync', function() {
  browsersync(syncOpts);
});

// default tasks
gulp.task('default', ['html', 'htmlEn', 'htmlPortfolio', 'htmlPortfolioEn', 'images', 'svg', 'fonts', 'libs', 'sass', 'js', 'jsEn', 'browsersync'], function() {

  // html changes
  gulp.watch(html.watch, ['html', browsersync.reload]);
  gulp.watch(htmlEn.watch, ['htmlEn', browsersync.reload]);
  gulp.watch(htmlPortfolio.watch, ['htmlPortfolio', browsersync.reload]);
  gulp.watch(htmlPortfolio.watch, ['htmlPortfolioEn', browsersync.reload]);

  // image changes
  gulp.watch(images.in, ['images']);
  gulp.watch(svg.in, ['svg']);

  // font changes
	gulp.watch(fonts.in, ['fonts']);

  // libs changes
	gulp.watch(libs.in, ['libs']);

  // sass changes
  gulp.watch(css.watch, ['sass']);

  // javascript changes
  gulp.watch(js.in, ['js', browsersync.reload]);
  gulp.watch(jsEn.in, ['jsEn', browsersync.reload]);
});
