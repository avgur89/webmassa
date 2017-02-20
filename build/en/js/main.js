var mainModule = (function() {

  // DOM cache
  var $sliders = $('.cta-image'),
      slidersCount = $('.cta-image').length,
      currentSlide = slidersCount - 1,
      $svgIco = $('.svg-ico'),
      $designForm = $('.design-form'),
      $devForm = $('.development-form'),
      $designChoice = $('.design-choice'),
      $devChoice = $('.development-choice'),
      $contactUs = $('.contact-us'),
      $svgDesign = $('.design-ico'),
      $svgDev = $('.dev-ico'),
      $iconMenu = $('.menu-ico'),
      $nav = $('.header-nav'),
      $closeBtn = $('.close-menu-btn-ico'),
      pathname = window.location.pathname;

  // Main slider
  function ctaSlider() {
    if (currentSlide === 0) {
      currentSlide = slidersCount - 1;
      $sliders.fadeIn(400);
    } else {
      $sliders.eq(currentSlide).fadeOut(400);
      currentSlide--;
    }
  }

  // Run main slider
  function runCtaSlider() {
    setInterval(ctaSlider, 5000);
  }

  // Change language
  function changeLanguage() {
    var rusFlag = $('#rus-flag'),
        engFlag = $('#eng-flag'),
        spainFlag = $('#spain-flag');

    // rusFlag.on('click', function() {
    //   var pathArray = window.location.pathname.split('/');
    //   var removeItem = 'en';

    //   pathArray.splice( $.inArray(removeItem, pathArray), 1 );

    //   location.pathname = pathArray[1];
    //   rusFlag.attr('class', 'rus-flag-active');
    //   engFlag.attr('class', '');
    //   spainFlag.attr('class', '');
    // });

    rusFlag.on('click', function() {
      var pathArray = window.location.pathname.split('/');
      var removeItem = 'en';
      var index = pathArray.indexOf(removeItem);

      for (var i = 0; i < pathArray.length; i++) {
        var item = pathArray[i];
        if (pathArray[i] === removeItem) {
          pathArray.splice(index, 1);
        }
      }

      location.pathname = pathArray.join('/');
      rusFlag.attr('class', 'rus-flag-active');
      engFlag.attr('class', '');
      spainFlag.attr('class', '');
    });
  }

  // Mobile navigation menu
  function adaptiveMenu() {
    $iconMenu.on('click', function(e) {
      $nav.toggleClass('active');
  	});

    $closeBtn.on('click', function() {
      $nav.toggleClass('active');
    });
  }

  // SVG hover effects on services.html
  function svgHover() {
    $svgIco.on('mouseenter', function() {
      var data = $(this).data('svg');
      $(this).attr('src', '../img/SVG/Services/' + data + '_hover.svg');
    });
    $svgIco.on('mouseleave', function() {
      var data = $(this).data('svg');
      $(this).attr('src', '../img/SVG/Services/' + data + '.svg');
    });
  }

  // Show Design or Development contact forms
  function showForm() {
    $designChoice.on('click', function() {
      $svgDesign.attr('src', '../img/SVG/Services/Design_hover.svg');
      $svgDev.attr('src', '../img/SVG/Services/Development.svg');
      $devForm.removeClass('active-form');
      $designForm.addClass('active-form');
      $contactUs.hide();
    });

    $devChoice.on('click', function() {
      $svgDev.attr('src', '../img/SVG/Services/Development_hover.svg');
      $svgDesign.attr('src', '../img/SVG/Services/Design.svg');
      $designForm.removeClass('active-form');
      $devForm.addClass('active-form');
      $contactUs.hide();
    });
  }

  function other() {
    $("a[href=#]").click(function() { return false; });
  }

  return {
    init: function() {
      runCtaSlider();
      changeLanguage();
      adaptiveMenu();
      svgHover();
      showForm();
      other();
    }
  };

}());

$(document).ready(mainModule.init);
