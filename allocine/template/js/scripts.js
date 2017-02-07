$(document).ready(function(){

	const API_KEY = 'e0f058cb785cac4e6585086b67da86f4';

	console.log("-- document ready");
	
	function moviePopular() {

		$.get({
			url: 'https://api.themoviedb.org/3/movie/popular',
			dataType: 'jsonp'
		}, {
			api_key: API_KEY,
			language: 'fr-FR',
			page: 1
		}, function(data) {
			var results = data.results;
			console.log(results);
			var movies = [];
			$.each(results, function(i, movie) {
				var vote = Math.round(movie.vote_average/2);
				var rest = 5 - vote;
				var starsFull = "";
				for (i=0; i<vote; i++) {
					starsFull+= "<i class=\"fa fa-star\"></i>";
				}
				var starsEmpty = "";
				for (i=0; i<rest; i++) {
					starsEmpty+= "<i class=\"fa fa-star-o\"></i>";
				}
				var movieObj = {
					title: movie.title,
					poster: "https://image.tmdb.org/t/p/w500/" + movie.poster_path,
					description: movie.overview,
					stars: starsFull + starsEmpty
				};
				movies.push(movieObj);
			})
			$('.movies').loadTemplate("../templates/movie.html", movies);
		});

	}

	function initMenu() {
		var width = $(window).width();
		if (width < 1000) {
			$('.menu').css('top', '-400px')
		}
	}

	// DEBUT DE MES SCRIPTS

	function goToSection(section) {
		var position = $('section#'+section).offset().top-84;
		$('body').animate({
			scrollTop: position
		});
		closeMenu();
	}

	var isMenuOpen = false;

	function openMenu() {
		$('.menu').animate({
			top: '60px'
		}, 'slow');
		isMenuOpen = true;
		console.log("open menu");
	}


	function closeMenu() {
		$('.menu').animate({
			top: '-1000px'
		}, 'slow');
		isMenuOpen = false;
		console.log("close menu");
	}

	function openCloseMenu() {
		$('.menu').stop();

		if (isMenuOpen) {
			closeMenu();
		} else {
			openMenu();
		}

	}

	// $(window).scroll(function() {
	// 	console.log("-- window scroll");
	// 	var action = $('section#action').offset().top;
	// 	var adventure = $('section#adventure').offset().top;
	// 	console.log('action', action);
	// 	console.log('adventure', adventure);
	// });

	// $(window).on('scroll', function() {

	// 	if ($(window).scrollTop() > $(window).height()) {
	// 		console.log("dépassé");
	// 	}

	// })

	$(window).resize(function() {
		var width = $(this).width();
		var height = $(this).height();
		console.log("-- window resize");
		console.log("-- window width", width);
		console.log("-- window height", height);
		//
		initMenu();
		closeMenu();
	});

	$('.menu-button').click(function() {
		// $('.menu').toggleClass('hidden');
		//$('.menu').css('top', '60px');
		openCloseMenu();
	});

	$('.menu li').click(function() {
		var section = $(this).attr('data-section');
		goToSection(section);
	});

	initMenu();

	moviePopular();

});