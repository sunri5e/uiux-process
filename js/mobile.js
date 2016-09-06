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
    $('nav').fadeOut();
  } else {
    // Scroll Up
    if(st + $(window).height() < $(document).height()) {
      $('nav').fadeIn();
    }
  }
  lastScrollTop = st;
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

$(document).ready(function() {
  $('[data-toggle-footer-nav]').click(function(event) {
    toggleNav('footer');
  });
  $('[data-toggle-main-nav]').click(function(event) {
    toggleNav('main');
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