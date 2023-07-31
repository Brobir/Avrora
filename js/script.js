$(document).ready(function() {

	// Шапка
	let header = $("header.box");
	let scrollPrev = 0;
	let checkSliderFinal = false;

  if ($(window).scrollTop() > 120) {
    header.addClass("scrollElem");
  }

	$(window).scroll(function() {
		let scrolled = $(window).scrollTop();
		let firstScrollUp = false;
		let firstScrollDown = false;

		if ( scrolled > 0 ) {

      if (scrolled > 120) {
        header.addClass("scrollElem");
      }
      else{
        header.removeClass("scrollElem");
      }


			if ( scrolled > scrollPrev ) {
				firstScrollUp = false;

				if ( scrolled < header.height() + header.offset().top ) {

					if ( firstScrollDown === false ) {
						let topPosition = header.offset().top;
						header.css({
							"top": topPosition + "px"
						});
						firstScrollDown = true;
					}

					header.css({
						"position": "absolute"
					});

				}
        else {
					header.css({
						"position": "fixed",
						"top": "-" + header.height() + "px"
					});
				}

			}
      else {
				firstScrollDown = false;

				if ( scrolled > header.offset().top ) {

					if ( firstScrollUp === false ) {
						let topPosition = header.offset().top;
						header.css({
							"top": topPosition + "px"
						});
						firstScrollUp = true;
					}

					header.css({
						"position": "absolute"
					});

				}
        else {
					header.removeAttr("style");
				}
			}

			scrollPrev = scrolled;
		}

	});

	// Таймер
	let austDay = new Date();
	austDay = new Date(2021, 06, 30);
	$('.timeLaouts').countdown({until: austDay});

	// Плавная прокрутка
	$('a[href^="#"]').click(function(){
		let anchor = $(this).attr('href');

		$('html, body').animate({
			scrollTop:  $(anchor).offset().top
		}, 600);
	});
});
