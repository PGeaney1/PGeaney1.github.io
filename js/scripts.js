jQuery(document).ready(function ($) {


    $(window).stellar();

    var links = $('.navigation').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');


    slide.waypoint(function (event, direction) {

        dataslide = $(this).attr('data-slide');

        if (direction === 'down') {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
        }
        else {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }

    });
 
    

	 


    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });


});

$(function(){
  $('#nav').click(function() {
    $(this).toggleClass('open');
  });
});

$.stellar({
 
  verticalScrolling: true,

  // Set the global alignment offsets
  horizontalOffset: 0,
  verticalOffset: 0,

  // Refreshes parallax content on window load and resize
  responsive: true,

  // Select which property is used to calculate scroll.
  // Choose 'scroll', 'position', 'margin' or 'transform',
  // or write your own 'scrollProperty' plugin.
  scrollProperty: 'scroll',

  // Select which property is used to position elements.
  // Choose between 'position' or 'transform',
  // or write your own 'positionProperty' plugin.
  positionProperty: 'position',

  // Enable or disable the two types of parallax
  parallaxBackgrounds: true,
  parallaxElements: true,

  // Hide parallax elements that move outside the viewport
  hideDistantElements: true,

});

var setSkrollr = function($el, data) {
    for (var i = 0, l = data.length; i < l; i++) {
        var d = data[i],
            px = d[0];
            css = d[1];
        $el.attr('data-' + px, css);
    }
}

jQuery(function($) {
	
	setSkrollr($('#ufo2'), [[0, 'transform:translateX(-100%)'], [750, 'transform:translateX(200%)'], [1500, 'transform:translateX(-100%)']]);
	
	setSkrollr($('#plane'), [[0, 'transform:translateX(-100%)'], [1750, 'transform:translateX(120%)'], [500, 'transform:translateX(-100%)']]);
    
	setSkrollr($('#helicopter'), [[0, 'transform:translateX(-100%)'], [2000, 'transform:translateX(100%)'], [0, 'transform:translateX(-100%)']]);
    setSkrollr($('#ufo1'), [[0, 'transform:translateX(-100%)'], [750, 'transform:translateX(100%)'], [1500, 'transform:translateX(-100%)']]);
    
	setSkrollr($('#asset3'), [[100, 'transform:translateX(-100%)'], [2000, 'transform:translateX(100%)'], [0, 'transform:translateX(-100%)']]);
    
  skrollr.init({
        smoothScrolling: true,
    });
});


//function
$(function skrollrInit() {

    //initialize skrollr
    skrollr.init({
        smoothScrolling: false
    });

    // disable skrollr if using handheld device
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        skrollr.init().destroy();
    }

});

$('a#openHelp').click(function() {
				$.fancybox.open('images/ineedhelp.png');
			});

$("#fancybox-manual-a").click(function() {
				$.fancybox.open('images/self-esteem.png');
			});
			
$("#fancybox-manual-b").click(function() {
				$.fancybox.open('images/asset4.png');
			});
			
$("#fancybox-manual-c").click(function() {
				$.fancybox.open('images/depression.png');
			});
			
$("#fancybox-manual-d").click(function() {
				$.fancybox.open('images/bulling.png');
			});
			
$("#fancybox-manual-e").click(function() {
				$.fancybox.open('images/goodmentalhealth.png');
			});
$("#fancybox-manual-f").click(function() {
				$.fancybox.open('images/badmentalhealth.png');
			});
$("#fancybox-manual-g").click(function() {
				$.fancybox.open('images/ineedhelp.png');
			});


