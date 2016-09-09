// Hide Header on on scroll down
var didScroll,
    lastScrollTop = 0,
    delta = 5,
    navbarHeight = $('nav').outerHeight(),
    mainNavOpen = false,
    bottomNavOpen = false;

function hasScrolled() {
  var st = $(this).scrollTop();
  if(Math.abs(lastScrollTop - st) <= delta)
    return;
  if (st > lastScrollTop && st > navbarHeight){
    // Scroll Down
    $('body').addClass('nav-hidden');
  } else {
    // Scroll Up
    if(st + $(window).height() < $(document).height()) {
      $('body').removeClass('nav-hidden');
    }
  }
  lastScrollTop = st;
}

function hidePagination() {
  var top = 0;
  var bot = $(window).height()/2;
  var scrolled = $(document).scrollTop();
  if ( scrolled >= top &&  scrolled <= bot) {
    $('.mini-nav').fadeOut();
  } else {
    $('.mini-nav').fadeIn();
  };
};

function paginationControlls() {
  var offTopRes = $(window).scrollTop();
  $('.mini-nav--dropdown li').each(function(){
    var controller = $(this),
        id = controller.attr('data-scroll-to'),
        el = $("[data-section='"+id+"']");
    if (offTopRes >= (el.offset().top - (el.height()/2)) && offTopRes <= (el.offset().top + el.height()) ) {
      var elNiceTitle = controller.attr('data-nice-title');
      controller.addClass('active').siblings('li').removeClass('active');
      $('.mini-nav--toggler').text(elNiceTitle);
    }
  });
}

function toggleNav(nav) {
  var body = $('body'),
      selectedNav = nav == 'footer' ? $('#footer') : $('#main-nav');
  if (bottomNavOpen == false) {
    body.addClass('scroll-blocked');
    selectedNav.addClass('is-open');
    bottomNavOpen = true;
  } else {
    body.removeClass('scroll-blocked');
    selectedNav.removeClass('is-open');
    bottomNavOpen = false;
  }
}

// Animate scroll
$('[data-scroll-to]').click(function(){ 
    var el = $(this).attr('data-scroll-to'),
        offsetTop = $('[data-section="'+el+'"]').offset().top;
    $('html,body').animate({ scrollTop: offsetTop }, 'slow');
    return false; 
});

// Section class
$(window).on("resize scroll", function () {
  hidePagination();
  paginationControlls();
});
// ready
$(document).ready(function() {
  hidePagination();
  $('[data-toggle-footer-nav]').click(function(event) {
    toggleNav('footer');
  });
  $('[data-toggle-main-nav]').click(function(event) {
    toggleNav('main');
  });
  // Sliders
  $('[data-slider]').each(function() {
    $(this).bxSlider({
      auto: true,
      mode: 'fade',
      infiniteLoop: true,
      controls: false,
      useCSS: false,
      pause: 2000
    });
  });
});

$(window).scroll(function(event){
  didScroll = true;
});

setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);