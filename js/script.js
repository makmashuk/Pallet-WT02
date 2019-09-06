
var breakpoint = {
  refreshValue: function() {
    this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
  }
};

$(window).resize(function() {
  breakpoint.refreshValue();
}).resize();


// $(function() {
//   // make dropdown behaviour like select element
//   $('[data-select]').each(function() {
//     var This     = $(this);
//     var Select   = $('#'+This.data('select'));
//     var Toggle   = This.parent().find('.dropdown-toggle');
//     var Item     = This.find('.dropdown-item');
//     var Selected = This.find('[data-value="'+Select.val()+'"]');
  
//     Toggle.html(Selected.html()); // set dropdown toggle based on selected value
  
//     Item.click(function(){
//       if ($(this).data('value') != Select.val()) {
//         Toggle.html($(this).html()); // update dropdown-toggle content
//         Select.val($(this).data('value')).trigger('change'); // update value, trigger change event
//       }
//       Toggle.focus(); // Keep focused
//     });
  
//     // Focused selected item when dropdown shown
//     This.parent().on('shown.bs.dropdown', function () {
//       This.find('[data-value="'+Select.val()+'"]').trigger('focus');
//     });
//   });
  // make header 'sticky' using fixed position for cross browser compatibility
  var header  = $('.middle-header');
  var wrapper = $('<div id="wrapper"></div>'); header.before(wrapper);
  var ost     = wrapper.offset().top;
  var fixtop  = 'fixed-top';
  var last    = $(window).scrollTop();
  
  $(window).on('load scroll resize', function() {
    var headerHeight = header.outerHeight(), scrollTop = $(this).scrollTop();
    if (scrollTop < last) {
      if (scrollTop <= ost) {
        header.hasClass(fixtop) && header.removeClass(fixtop);
        wrapper.height(0);
      }
    } else {
      if (scrollTop >= ost + headerHeight + 20) {
        header.addClass(fixtop);
        wrapper.height(headerHeight);
      };
    };
    last = scrollTop;
  });
//   // Show dropdown on hover
//   $('.main-nav .nav-item.dropdown').hover(function() {
//     $(this).addClass('show').find('> .dropdown-menu').addClass('show');
//   }, function() {
//     $(this).removeClass('show').find('> .dropdown-menu').removeClass('show');
//   });
  toggleSearch = function() {
    $('.input-search-wrapper').toggleClass('invisible');
    $('#input-search').typeahead('val', '').focus();
  }
  
  $('.toggle-search').click(function(e) {
    toggleSearch();
    e.preventDefault();
    e.stopPropagation();
  });
  
  $('#input-search').keyup(function(e) {
    if (e.keyCode === 27) {
      toggleSearch(); // close with esc key
    }
  });
  
  // Setup for responsive image height
  var swiperCover = function() {
    $('[data-cover]').each(function() {
      var swiperCover = $(this);
      swiperCover.css('background-image', 'url(' + decodeURIComponent(swiperCover.data('cover')) + ')');
      swiperCover.attr('data-height') && swiperCover.css('height', swiperCover.data('height'));
      switch (breakpoint.value) {
        case 'xs': swiperCover.attr('data-xs-height') && swiperCover.css('height', swiperCover.data('xs-height')); break;
        case 'sm': swiperCover.attr('data-sm-height') && swiperCover.css('height', swiperCover.data('sm-height')); break;
        case 'md': swiperCover.attr('data-md-height') && swiperCover.css('height', swiperCover.data('md-height')); break;
        case 'lg': swiperCover.attr('data-lg-height') && swiperCover.css('height', swiperCover.data('lg-height')); break;
        case 'xl': swiperCover.attr('data-xl-height') && swiperCover.css('height', swiperCover.data('xl-height')); break;
      }
    });
  }
  $(window).resize(function() {
    swiperCover();
  });
  swiperCover();
  
  
  // Home Slider
  if ($('.home-slider').length && typeof Swiper !== 'undefined') {
    var homeSlider = new Swiper ('.home-slider', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '#home-slider-prev',
        nextEl: '#home-slider-next',
      },
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      },
      on: {
        init: function() {
          setTimeout(function() {
            $('.home-slider').find('.swiper-slide-active .animate').each(function() {
              $(this).addClass($(this).data('animate')).addClass('visible');
            });
          }, 100);
        },
      }
    });
    homeSlider.on('slideChange', function() {
      homeSlider.slides.find('.animate').each(function() {
        $(this).removeClass($(this).data('animate')).removeClass('visible');
      });
      $(homeSlider.slides[homeSlider.activeIndex]).find('.animate').each(function() {
        $(this).addClass($(this).data('animate')).addClass('visible');
      });
    });
  }
  
//});