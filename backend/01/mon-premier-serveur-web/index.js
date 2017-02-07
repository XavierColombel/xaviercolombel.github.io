var express = require('express');
var app = express();

var useragent = require('useragent');
useragent(true);

const util = require('util');

const _ = require('underscore');

/* TEXT TO SPEECH */
const say = require('say');

/*
POKEMONS SOUNDS
*/
const scream = require('./json/scream.json');

/* 
POKEMONS NAMES
*/
const names = require('./json/names.json');

/*
POKEMONS SPECIES*/
const species = require('./json/species.json');

/*
ACCEPTED LANGUAGES
*/
var languages = ['fr', 'en'];

/*
CONVERT LANG STRING TO NUMBER
*/
var langToNumber = function(lang) {

    switch (lang) {
        case 'fr':
            var langNumber = 5;
            break;
        case 'en':
            var langNumber = 9;
            break;
    }

    return langNumber.toString();

}

/*
GET POKEMON DESCRIPTION FUNCTION
*/
var getPokemonDescription = function(id, lang) {

    var pokemon = _.findWhere(species, {species_id: id, language_id: langToNumber(lang)});
    return pokemon.flavor_text;

}

/*
GET ALL POKEMONS FUNCTION
*/
var getPokemons = function(lang) {

    var pokemons = [];
    for (var i in names) {
        var pokemon = names[i];
        if (pokemon.local_language_id === langToNumber(lang)) {
            var obj = {
                "id": pokemon.pokemon_species_id,
                "name": pokemon.name,
                "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokemon.pokemon_species_id+".png"
            };
            pokemons.push(obj);
        }
    }
    return pokemons;

}

/*
GET POKEMON FUNCTION
*/
var getPokemon = function(id, lang) {

    var pokemon = _.find(getPokemons(lang), function(item){ return item.id === id; });
        pokemon.description = getPokemonDescription(id, lang);
    return pokemon;

}

app.get('/', function(req, res) {
    res.send('Bonjour Le Reacteur');
});

app.get('/contact', function(req, res) {
    res.send('Coucou');
});

app.get('/ip', function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.send(ip);
});

app.get('/user-agent', function(req, res) {
    var agent = useragent.parse(req.headers['user-agent']);
    res.send('Votre User Agent est : ' + agent);
});

app.get('/speak/:name', function(req, res) {
    var name = req.params.name;
    var sound = scream[name] + ' ';
    var screamString = sound + name;
        screamString = screamString.toLowerCase();
    if (name in scream) {
        res.send(name + ' : ' + screamString.charAt(0).toUpperCase() + screamString.slice(1));
    } else {
        say.speak("I didn't see any pokemon here!", 'Victoria');
        res.send("Ce Pokemon n'existe pas !");
    }
});

app.get('/speak/:name/:repeat', function(req, res) {
    var name = req.params.name;
    if (name in scream) {
        var repeat = parseInt(req.params.repeat);
        var sound = scream[name] + ' ';
        var soundMultiple = "";
        if (Number.isInteger(repeat)) {
            for (i=0; i<repeat; i++) {
                soundMultiple+= sound;
            }
        }
        var screamString = soundMultiple + name;
            screamString = screamString.toLowerCase();
        var string = screamString.charAt(0).toUpperCase() + screamString.slice(1);
        /*say.export(screamString, 'Alex  ', 1.4, 'scream.wav', function(err) {
            if (err) {
                console.error(err);
            }
        });*/
        say.speak(string, 'Victoria', 1.6);
        res.send(name + ' : ' + string);
    } else {
        say.speak("This Pokemon doesn't exist!", 'Victoria');
        res.send("Ce Pokemon n'existe pas !");
    }
});

/*
GET ALL POKEMONS
*/
app.get('/:lang/pokemons', function(req, res) {
    var lang = req.params.lang;
    if (_.contains(languages, lang)) {
        res.send(getPokemons(lang));
    } else {
        say.speak("I didn't see any pokemon here!", 'Victoria');
        res.send("Aucun Pokemons à lister.");
    }
});

/*
GET POKEMON
*/
app.get('/:lang/pokemon/:id', function(req, res) {
    var lang = req.params.lang;
    var id = req.params.id;
    var type = 'json';
    if (id.includes('.xml')) {
        id = id.replace('.xml', '');
        type = 'xml';
    }
    id = parseInt(id);
    if (Number.isInteger(id)) {
        if (lang == 'fr' || lang == 'en') {
            var pokemon = getPokemon(id.toString(), lang);
            if (type === 'xml') {
                var xml = jstoxml.toXML(pokemon, {header: true, indent: '  '});
                res.send(xml);
            } else {
                res.send(pokemon);
            }
            
        } else {
            say.speak("I didn't see any pokemon here!", 'Victoria');
            res.send("Aucune description à afficher.");
        }
    } else {
        say.speak("I didn't see any pokemon here!", 'Victoria');
        res.send("Aucune description à afficher.");
    }
});

app.get('*', function(req, res) {
    res.send('Page not found');
});

app.listen(3000);