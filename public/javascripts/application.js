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