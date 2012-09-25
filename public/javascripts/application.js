function isTouchDevice() {
  return !!('ontouchstart' in window);
}

$(function() {
	if(isTouchDevice()) {
		$("[rel=touch-sprite]").each(function(){
			var selector = $(this).data('selector');
			if(selector){
				$(this).addClass(selector + "-hover");
			}
		});
	}

  /* Scroll to Top Link Effect */
  if(!isTouchDevice()) {
    /* set variables locally for increased performance */
    var scroll_timer;
    var displayed = false;
    var $message = $('#top-scroll');
    var $window = $(window);
    var top = $(document.body).children(0).position().top;

    /* react to scroll event on window */
    $window.scroll(function () {
      window.clearTimeout(scroll_timer);
      scroll_timer = window.setTimeout(function () { // use a timer for performance
        if($window.scrollTop() <= top) { // hide if at the top of the page
          displayed = false;
          $message.fadeOut(500);
        } else if(displayed == false) { // show if scrolling down
          displayed = true;
          $message.css({ marginLeft : 0 });
          $message.stop(true, true).show().animate({ marginLeft : "-150px" }).click(function () { $message.fadeOut(500); });
        }
      }, 100);
    });
  }
});

// Fix bootstrap rotation bug on ipad (portrait => landscape)
var addEvent = 'addEventListener',
    type = 'gesturestart',
    qsa = 'querySelectorAll',
    scales = [1, 1],
    meta = document[qsa] ? document[qsa]('meta[name=viewport]') : [];

function fix(){
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    document.removeEventListener(type, fix, !0);
}

if((meta = meta[meta.length - 1]) && document[addEvent]) {
  fix();
  scales = [.25, 1.6];
  document[addEvent](type, fix, true);
}