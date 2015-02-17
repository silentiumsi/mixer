var gulp = require('gulp'),
	sass = require('gulp-sass'),
	include = require('gulp-file-include'),
	del = require('del'),
	connect = require('gulp-connect'),
	deploy = require('gulp-gh-pages'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	uncss = require('gulp-uncss'),
	csso = require('gulp-csso');

gulp.task('css:dev', ['html'], function () {
	gulp.src('src/main.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('dest'));
});

gulp.task('css:prod', ['html'], function () {
	gulp.src('src/main.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(uncss({
			html: ['dest/index.html']
		}))
		.pipe(autoprefixer())
		.pipe(csso())
		.pipe(gulp.dest('dest'));
});

gulp.task('html', function () {
	gulp.src('src/index.html')
		.pipe(include({
			prefix: '@@',
			basepath: 'src/partials/'
		}))
		.pipe(gulp.dest('dest'));
});

gulp.task('clean', function () {
	del(['dest']);
});

gulp.task('serve', function () {
	connect.server({
		root: 'dest',
		livereload: true
	});
});

gulp.task('deploy', function () {
	return gulp.src('./dest/**/*')
		.pipe(deploy());
})

gulp.task('watch', function () {
	gulp.watch(['**/*.scss', '**/*.html'], ['css:dev', 'html']);
});

gulp.task('default', ['dev']);
gulp.task('dev', ['clean', 'html', 'css:dev', 'serve', 'watch']);
gulp.task('prod', ['clean', 'html', 'css:prod']);