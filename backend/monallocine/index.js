var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

var request = require('request');

var menu = '';

const TMD_API_KEY = 'e0f058cb785cac4e6585086b67da86f4';

var language = 'fr-FR';

var movies = [];

var favorites = [];

var getMovies = function(type, page, callback) {

    request('https://api.themoviedb.org/3/movie/'+type+'?api_key='+TMD_API_KEY+'&language='+language+'&page='+page, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);
            callback(body.results, body.total_pages, body.total_results);
        }
    });

}

var getTrailer = function(id, callback) {

    request('https://api.themoviedb.org/3/movie/'+id+'/videos?api_key='+TMD_API_KEY+'&language='+language, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);
            callback(body.results);
        }
    });

}

var getFavorites = function(page, callback) {

    var favoritesDetails = [];

    for (var i = 0; i < favorites.length; i++) {

        request('https://api.themoviedb.org/3/movie/'+favorites[i]+'?api_key='+TMD_API_KEY+'&language='+language, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var body = JSON.parse(body);
                favoritesDetails.push(body);
                if (favoritesDetails.length === favorites.length) {
                    callback(favoritesDetails, Math.ceil(favorites.length/20), favorites.length);
                }
            }
        });

    }

}

app.get('/', function (req, res) {
    menu = '';
    getMovies('now_playing', 1, function(movies, totalPages, totalResults) {
        res.render('index', {favorites: favorites, menu: menu, movies, totalPages: totalPages, totalResults: totalResults, page: 1});
    });
});

app.get('/page/:pageNumber', function (req, res) {
    var page = req.params.pageNumber;
    menu = '';
    getMovies('now_playing', page, function(movies, totalPages, totalResults) {
        res.render('index', {favorites: favorites, menu: menu, movies, totalPages: totalPages, totalResults: totalResults, page: page});
    });
});

app.get('/prochainement', function (req, res) {
    menu = 'prochainement';
    getMovies('upcoming', 1, function(movies, totalPages, totalResults) {
        res.render('prochainement', {favorites: favorites, menu: menu, movies, totalPages: totalPages, totalResults: totalResults, page: 1});
    });
});

app.get('/prochainement/page/:pageNumber', function (req, res) {
    var page = req.params.pageNumber;
    menu = '';
    getMovies('upcoming', page, function(movies, totalPages, totalResults) {
        res.render('index', {favorites: favorites, menu: menu, movies, totalPages: totalPages, totalResults: totalResults, page: page});
    });
});

app.get('/populaires', function (req, res) {
    menu = 'populaires';
    getMovies('popular', 1, function(movies, totalPages, totalResults) {
        res.render('populaires', {favorites: favorites, menu: menu, movies, totalPages: totalPages, totalResults: totalResults, page: 1});
    });
});

app.get('/populaires/page/:pageNumber', function (req, res) {
    var page = req.params.pageNumber;
    menu = '';
    getMovies('popular', page, function(movies, totalPages, totalResults) {
        res.render('index', {favorites: favorites, menu: menu, movies, totalPages: totalPages, totalResults: totalResults, page: page});
    });
});

app.post('/add-to-favorites', function (req, res) {
    var id = req.body.id;
    if (favorites.indexOf(id) === -1) {
        favorites.push(id);
        res.send(true);
    } else {
        res.send(false);
    }
    console.log(Date(), favorites);
});

app.post('/remove-from-favorites', function (req, res) {
    var id = req.body.id;
    if (favorites.indexOf(id) >= 0) {
        var index = favorites.indexOf(id);
        favorites.splice(index,1);
        res.send(true);
    } else {
        res.send(false);
    }
    console.log(Date(), favorites);
});

app.get('/favoris', function (req, res) {
    menu = 'favoris';
    if (favorites.length) {
        getFavorites(1, function(movies, totalPages, totalResults) {
            res.render('favoris', {favorites: favorites, menu: menu, movies, totalPages, totalResults, page: 1});
        });
    } else {
        res.render('favoris', {favorites: favorites, menu: menu, movies, totalPages: 1, totalResults: 0, page: 1});
    }
    
});

app.get('/trailer/:id', function(req, res) {
    var id = req.params.id;                                                                                                                                                                             
    getTrailer(id, function(trailers) {
        res.send(trailers)
    });
});

app.listen(3000, function() {
    console.log("Le serveur a démarré !");
});