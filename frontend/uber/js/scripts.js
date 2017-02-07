$(document).ready(function() {

	/* WOW */
	new WOW().init();

	/* SMOOTH SCROLL */
	$('.js-scrollTo').on('click', function() {
		var page = $(this).attr('href');
		var speed = 750;
		$('html, body').animate( { scrollTop: $(page).offset().top }, speed );
		return false;
	});

	/* RANDOM BACKGROUND */
	var id = Math.floor(Math.random() * 6) + 1;
	$('.hero').css({
		'background-image': 'url(img/hero-bg-'+id+'.jpg)'
	});

	/* ACTIVE MENU COLOR */
	function initNavbar() {
		if ($(window).width() > 992 && $(window).scrollTop() < 80) {
			$('.navbar').addClass("navbar-transparent");
			$('.logo-black').addClass('hidden');
			$('.logo-white').removeClass('hidden');
		} else {
			$('.navbar').removeClass("navbar-transparent");
			$('.logo-white').addClass('hidden');
			$('.logo-black').removeClass('hidden');
		}
	}
	$(window).scroll(function() {
		var sections = [
			{"name":"accueil",
			"position":$('#accueil').offset().top},
			{"name":"fonctionnement",
			"position":$('#fonctionnement').offset().top},
			{"name":"application",
			"position":$('#application').offset().top},
			{"name":"temoignages",
			"position":$('#temoignages').offset().top}
		];
		var name = sections[0].name;
		$.each(sections, function(index, section) {
			var pos = $(window).scrollTop();
			if (pos >= section.position-$('.nav').height()) {
				name = section.name;
				var position = section.position;
				return;
			}
		});
		$('.nav a').parents('li').removeClass('active');
		$('.nav a[href="#'+name+'"]').closest('li').addClass('active');
		initNavbar();
	})
	initNavbar();

	/* VIDEO MODAL */
	function resizeModal() {
		$('.modal-dialog').css({
			'height': '70hv',
			'margin-top': ($(window).height()-$('.modal-dialog').height())/2 + 'px'
		})
	}

	resizeModal();

	$(window).resize(function() {
		resizeModal();
		initNavbar(name);
	})

	$('#btn-video').on('click', function() {
		$('#video').modal('show');
	})

	$('#video').on('hidden.bs.modal', function (e) {
		$('#video iframe').attr('src', $('#video iframe').attr('src'));
	})

	/* NEWSLETTER */
	$('#btn-newsletter').on('click', function() {
		return false;
	})

	/* LOADER */
	loader();

})

function loader() {
	$('.loader > i').animate({
		'opacity': 0
	}, 1000, function() {
		$('.loader').fadeOut('slow', function() {
			$('.loader').css({
				'z-index': '-2'
			});
		});
	});
}