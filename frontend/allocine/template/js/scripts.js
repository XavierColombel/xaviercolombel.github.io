$(document).ready(function(){

	console.log("-- document ready");
	
	getMovies('now_playing');

});

const API_KEY = 'YOUR_API_KEY_HERE';

function getMovies(type) {

	$.get({
		url: 'https://api.themoviedb.org/3/movie/' + type,
		dataType: 'jsonp'
	}, {
		api_key: API_KEY,
		language: 'fr-FR',
		page: 1,
		region: 'FR'
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
		$('.movies').stop();
		$('.movies').fadeOut('fast', function() {
			$('.movies').loadTemplate("../templates/movie.html", movies).fadeIn(1000);
		});
	});

}
