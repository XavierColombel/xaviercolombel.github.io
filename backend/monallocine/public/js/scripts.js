$(document).ready(function() {

    //$('#trailerModal').modal('show');

});

var youtube = 'https://www.youtube.com/embed/';

$('.addMovieBtn').click(function() {
    var button = $(this);
    var id = $(this).attr('data-id');
    $.post('/add-to-favorites', {id: id}, function(res) {
        if (res) {
            button.addClass('hidden');
            button.next().removeClass('hidden');
            var value = parseInt($('#badge').text());
            $('#badge').text(value+1);
            if (value+1) {
                $('#badge').addClass('badgeFull');
            }
        }
    });
});

$('.removeMovieBtn').click(function() {
    var button = $(this);
    var id = $(this).attr('data-id');
    $.post('/remove-from-favorites', {id: id}, function(res) {
        if (res) {
            button.addClass('hidden');
            button.prev().removeClass('hidden');
            var value = parseInt($('#badge').text());
            $('#badge').text(value-1);
            if (!(value-1)) {
                $('#badge').removeClass('badgeFull');
            }
        }
    });
});

$('.play-button').click(function() {
    var id = $(this).attr('data-id');
    $.get('/trailer/'+id, function(trailers) {
        var id_trailer = trailers[0].key;
        $('.modal-iframe').attr('src', youtube + id_trailer);
        $('#trailerModal').modal('show');
    });
    return false;
});

