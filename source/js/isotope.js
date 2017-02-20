var isotopeModule = (function() {

  // DOM cache
  var $filterBtn = $('.portfolio-filter'),
      $buttons = $('.button-group'),
      $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
          columnWidth: '.grid-sizer',
          gutter: '.gutter-sizer'
        }
      });

  // Layout Isotope after each image loads
  function layout() {
    $grid.imagesLoaded().progress(function() {
      $grid.isotope('layout');
    });
  }

  // filter items on button click
  function itemsFilter() {
    $filterBtn.on('click', 'span', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });
  }

  // Change .is-checked class on buttons
  function isChecked() {
    $buttons.each(function(i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);

      $buttonGroup.on('click', 'span', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
      });
    });
  }

  return {
    init: function() {
      layout();
      itemsFilter();
      isChecked();
    }
  };

}());

$(document).ready(isotopeModule.init);
