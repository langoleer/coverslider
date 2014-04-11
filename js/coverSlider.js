(function($) {

    $.fn.coverSlider = function( options ) {

        // Establish default settings
        var settings = $.extend({
			action		: 'fade', 
			xposition	: 'center',
			yposition	: 'top', 
			transition	: 2000,
			interval	: 5500,
			bullets		: false,
			thumbnails	: false,
			navposition	: 'bottom-left',
			auto		: true,
			pauseonhover: false,
			overlay		: '',
        }, options);
		
		var container = $(this);
		container.wrap('<div class="coverSlide-wrapper"></div>');
		var wrapper = $(this).parent();

		/* Previous & next buttons
		-----------------------------------------------*/
		wrapper.append('<a href="#" class="prev">Prev</a><a href="#" class="next">Next</a>');
		
		/* Navigation & captions
		-----------------------------------------------*/
		switch (settings.navposition) { // Navigation position
				case 'bottom-left': wrapper.append('<div class="nav bottom-left"/>'); break;
				case 'bottom-right': wrapper.append('<div class="nav bottom-right"/>'); break;
		}
		var nav = wrapper.find('.nav');
			
		container.find('li').each(function(i){
		 
			i += 1; // Start numbers at 1
			if (settings.bullets === true) { // Bullet navigation	
				nav.append('<a href="#">'+ i +'</a>');
			}
		 
			// if (opt.thumbs === true) { // Thumbnail navigation
					// nav.addClass('thumbs').append(
						// '<img class="thumb" src="'+
						// $(this).attr('src') +'" alt=""/>');
			// }
		 
			imglink = $(this).find('a:first').attr('href');
			imgbackground = 'background:url(' + $(this).find('img:first').attr('src') + ') ' + settings.xposition + " " + settings.yposition + ' no-repeat; background-size:cover;';
			coverinfo = $(this).find('div:first').html();
			if(imglink){
				if(coverinfo){
					$(this).html('<div class="coverinfo">' + coverinfo + '</div>' +
								'<a href="' + imglink + '"><img src="images/trans.png" class="trans-link"></a>' + 
								'<div class="background-overlay" style="background:url('+settings.overlay+');"></div>' +
								'<div class="slide" style="' + imgbackground + '"></div>');
				} else {
					$(this).html('<a href="' + imglink + '"><img src="images/trans.png" class="trans-link"></a>' + 
								'<div class="background-overlay" style="background:url('+settings.overlay+');"></div>' +
								'<div class="slide" style="' + imgbackground + '"></div>');
				}
			} else {
				if(coverinfo){
					$(this).html('<div class="coverinfo">' + coverinfo + '</div>' +
								'<div class="background-overlay" style="background:url('+settings.overlay+');"></div>' +
								'<div class="slide" style="' + imgbackground + '"></div>');
				} else {
					$(this).html('<div class="background-overlay" style="background:url('+settings.overlay+');"></div>' +
								'<div class="slide" style="' + imgbackground + '"></div>');	
				}
			}
		});   
		
		/* coverSlider Object
		-----------------------------------------------*/		
		var coverSlider = function(){

		this.slides = wrapper.find('li');
		this.slideCount = (this.slides.length) - 1; // Match index
		this.navPrev = wrapper.find('a.prev');
		this.navNext = wrapper.find('a.next');
		this.bullets = wrapper.find('.nav a');
		this.thumbs = wrapper.find('.nav img.thumb');
		this.cover = this.slides.find('div');

		this.getCurrentIndex = function(){ // Index
				return this.slides.filter('.current').index();
		};

		this.go = function(index){ // Rotate images
				var startindex = this.getCurrentIndex();
				this.slides
					.eq(index)
					.fadeIn(10)					// The transition is halved due to the kicked delay, 
					.addClass('current');			// letting behind image fade in fully first, then fading the top image out,
				this.slides							// instead of both at the same time. This resolves the container background
					.eq(startindex)					// color being visible inbetween pictures.
					.removeClass('current')
					.delay(settings.transition/2)
					.fadeOut(settings.transition/2);
				
				this.bullets
					.removeClass('current')
					.eq(index)
					.addClass('current');
				this.thumbs
					.removeClass('current')
					.eq(index)
					.addClass('current');
		};
		
		this.go = function(index){ // Rotate images
				var startindex = this.getCurrentIndex();
				this.slides
					.eq(index)
					.stop(true, true)
					.css('z-index', '1')
					.fadeIn(settings.transition/2)	// The transition is halved due to the kicked delay, 
					.addClass('current');			// letting the one image fade in fully first, then fading the second out,
				this.slides			
					.css('z-index', '0')						// instead of both at the same time. This resolves the container background
					.eq(startindex)	
					.stop(true, true)	
					.delay(settings.transition/2)	// color being visible inbetween pictures.
					.removeClass('current')
					.fadeOut(settings.transition/2);
				
				this.bullets
					.removeClass('current')
					.eq(index)
					.addClass('current');
				this.thumbs
					.removeClass('current')
					.eq(index)
					.addClass('current');
		};

		this.next = function(){
				var index = this.getCurrentIndex();
				if (index < this.slideCount) {
					this.go(index + 1); // Go next
				} else {
					this.go(0); // If last go first
				}
		};

		this.prev = function(){
				var index = this.getCurrentIndex();
				if (index > 0) {
					this.go(index - 1); // Go previous
				} else {
					this.go(this.slideCount); // If first go last
				}
		};	

		this.init = function(){ // Init
			/* wrapper
				.width(settings.width)
				.height(settings.height); /* Set width and height */
			 
			this.slides.hide().first().addClass('current').show(); /* Set current image */
			this.bullets.first().addClass('current');
			this.thumbs.first().addClass('current');
			
			/* // Dimensions for thumbnails and captions
			var padding = wrapper.css('padding-left').replace('px', '');
			var captionsPadding = this.captions.css('padding-left').replace('px', '');
			nav.width(opt.width);
			if (opt.thumbs === true) { // thumbs
				var thumbBorder = this.thumbs.css('border-left-width').replace('px', '');
				var thumbMargin = this.thumbs.css('margin-right').replace('px', '');
				var thumbMaxWidth = opt.width/opt.row;
				this.thumbs.width( (thumbMaxWidth - (thumbMargin * 2)) - (thumbBorder * 2) );
			}
			this.captions // captions
				.width(opt.width - (captionsPadding * 2) + 'px')
				.css('margin-bottom', padding + 'px');
			this.navNext.css('margin-right', padding + 'px'); */

		};

		};
		
		var cslider = new coverSlider();
		cslider.init();		
	
		/* Mouse Events
		-----------------------------------------------*/
		wrapper.hover(function(){ // Hover image wrapper
			cslider.bullets.stop(true, true).fadeToggle();
			cslider.navNext.stop(true, true).fadeToggle();
			cslider.navPrev.stop(true, true).fadeToggle();
		});
		
		cslider.navNext.click(function(e){ // Click next button
			e.preventDefault();
			cslider.next(); 
		});
		cslider.navPrev.click(function(e){ // Click previous button
			e.preventDefault();
			cslider.prev();
		});
		cslider.bullets.click(function(e){  // Click numbered bullet
			e.preventDefault(); 
			cslider.go($(this).index());
		});
		cslider.thumbs.click(function(){ // Click thumbnail
			cslider.go($(this).index());
		});
		
		
		
		/* Auto Rotate	
		-----------------------------------------------*/			
		if (settings.auto === true) {

			var timer = function(){
				cslider.next();
			};
			var interval = setInterval(timer, settings.interval);

			// Pause when hovering image
			if(settings.pauseonhover){
				container.hover(function(){clearInterval(interval);}, function(){interval=setInterval(timer, settings.interval);});
			}
			
			// Reset timer when clicking thumbnail or bullet
			cslider.thumbs.click(function(){clearInterval(interval); interval=setInterval(timer, settings.interval);});
			cslider.navPrev.click(function(){clearInterval(interval); interval=setInterval(timer, settings.interval);});	
			cslider.navNext.click(function(){clearInterval(interval); interval=setInterval(timer, settings.interval);});	
			cslider.bullets.click(function(){clearInterval(interval); interval=setInterval(timer, settings.interval);});	
		}
    }
}(jQuery));
