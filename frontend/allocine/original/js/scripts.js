$(document).ready(function() {

	console.log("-- Document Ready !");

	var gotoSection = function(section) {
		console.log("go to :", section);
		$('body,html').animate({
			scrollTop: $('#'+section).offset().top
		}, 'slow');
	}

	$('.menu li').click(function() {
		var section = $(this).attr('data-section');
		gotoSection(section);
	});

	var isMenuOpen = false;

	var menuSize = $('.menu').height();

	function initMenu() {
		if ($(window).width() < 1000) {
			$('.menu').css('top', '-'+menuSize+'px');
		}
	}

	function openMenu() {
		console.log("close menu");
		$('.menu').animate({
			'top': '60px'
		}, 'slow');
		isMenuOpen = true;
	}

	function closeMenu() {
		console.log("close menu");
		$('.menu').animate({
			top: '-'+menuSize+'px'
		}, 'slow');
		isMenuOpen = false;
	}

	function menuOpenClose() {
		$('.menu').stop();
		if (isMenuOpen) {
			closeMenu();
		} else {
			openMenu();
		}
	}

	$('.menu-button').click(function() {
		menuOpenClose();
	});

	$('#btnSend').click(function() {
		var name = $('input[name="firstname"]').val();
		var email = $('input[name="email"]').val();
		$('#firstname').html(name);
		$('#email').text(email);
	});

	$('.button-trailer').on({
	  mouseenter: function() {
	    $(this).html("<i class=\"fa fa-rocket\"></i> Allez go !");
	  },
	  mouseleave: function() {
	    $(this).html("<i class=\"fa fa-play-circle\"></i> Voir le trailer");
	  }
	});

	initMenu();

});
