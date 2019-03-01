const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const bable = require('gulp-babel');

sass.compiler = require('node-sass');

function styles(){
	return gulp.src('./src/sass/**/*.scss')
				.pipe(sass({includePaths: require('node-normalize-scss').includePaths}))
				.pipe(sass().on('error', sass.logError))
				.pipe(concat('all.css'))
				.pipe(autoprefixer({
            		browsers: ['> 0.1%'],
            		cascade: false
        		}))
    			.pipe(cleanCSS({
    				level: 2
    			}))
				.pipe(gulp.dest('./build/css'));
}

function scripts(){
	return gulp.src('./src/scripts/**/*.js')
				.pipe(concat('all.js'))
				.pipe(babel({
            		presets: ['@babel/env']
        		}))
				.pipe(uglify({
					toplevel: true
				}))
				.pipe(gulp.dest('./build/js'));
}

function watch(){
	gulp.watch('./src/sass/**/*.scss', styles);
	gulp.watch('./src/scripts/**/*.js', scripts);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('default', watch);