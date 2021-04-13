const {src, dest, parallel, series, watch} = require('gulp');

// sass/scss
const sass = require('gulp-sass'),
	sassBulk = require('gulp-sass-bulk-import'),
	autoprefixer = require('gulp-autoprefixer'),
	cleancss = require('gulp-clean-css'),
	concat = require('gulp-concat'),
	svgSprite = require('gulp-svg-sprite'),
	glob = require('glob'),
	browserSync = require('browser-sync').create();

// image
const imagemin = require('gulp-imagemin'),
	newer = require('gulp-newer'),
	del = require('del');

// Определяем логику работы Browsersync
function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: { baseDir: 'app/' }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true, // Режим работы: true или false
		host: '192.168.10.107', // внешний адрес сервера
	})
}

exports.browsersync = browsersync;

function styles() {
	return src('app/scss/style.scss')
		.pipe(sassBulk()) 	//обработка для возможности применять * в директиве @import
		.pipe(sass())		//препроцессор
		.pipe(concat('style.min.css'))	//отправляем в файл
		.pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions, >1%, IE 11'], grid: true }))	//добавляем префиксы
		.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
		.pipe(dest('app/css'))		//директория назначения
		.pipe(browserSync.stream()); // Сделаем инъекцию в браузер для автоматического обновления
}

exports.styles = styles;

function images() {
	return src('app/img_src/**/*') // берем все изображения из этой папки
		.pipe(newer('app/img/')) // проверяем, было ли сжато ранее
		.pipe(imagemin([
		    imagemin.gifsicle(),
		    imagemin.mozjpeg(),
		    imagemin.optipng(),
		    imagemin.svgo({
		        plugins: [
		            {removeViewBox: false},
		            {cleanupIDs: false},
		        ]
		    })
			],{
		    	verbose: true,
			}))				// сжимаем и оптимизируем
		.pipe(dest('app/img/')) // выгружаем оптимизированные изображения
}

exports.images = images;

// создание svg спрайтов
// Спрайты помещаются в inpDirectory
// в отдельные папки. Название спрайта будет соответствовать
// названию папки
function createSvgSprite() {
	// объект настроек
	let inpDirectory = 'app/img_sprite/';
	let outDirectory = 'app/img_src/sprites/';
	let Config = function (name){
		this.mode = {
			"symbol": {
				"dest": ".",
				"sprite": name,
			}
		}
	}
	// читаем папки в inpDirectory
	let array = glob.sync(inpDirectory + '*');
	let stream = null;
	for (let i = 0; i < array.length; i++) {
		// пути к svg в каждой папке
		let path = array[i] + '/**/*.svg';
		// имя результирующего файла
		let name = array[i].lastIndexOf('/');
		name = array[i].substring(name + 1);
		if (stream === null)
			stream = src(path);
		else
			stream = stream.pipe(src(path));
		// создаем новый конфиг
		let config = new Config(name + '.svg');
		// создаем спрайт
		stream = stream.pipe(svgSprite(config));
		stream = stream.pipe(dest(outDirectory));
	}
	return stream;
}

exports.svgSprite = createSvgSprite;

function startwatch() {
	// Мониторим файлы scss на изменения
	watch('app/scss/**/*.scss', styles);
	// Мониторим папку-источник изображений и выполняем images(), если есть изменения
	watch('app/img_src/**/*', images);
	// Мониторим файлы HTML на изменения
	watch('app/**/*.html').on('change', browserSync.reload);
}

exports.watch = parallel(startwatch, browsersync);
