coverSlider
===========

coverSlider.js - a slider that fits any size content

Changelog
---------

Version 1.0 - Initial commit


Usage
-----

coverSlider was designed to fit the content area it is contained in. This is done by instead of cycling image, it cycles div's with the image as its background-image set in CSS with the background-cover property. This can then be easily used in both fixed and fluid containers, as the slider will fit its container with the images fit via backgound-cover, and can be used from full screen to a 300x50 pixel div (or lower, 300x50 used as an example). To create a basic coverSlider, the HTML content must be set in an unordered list:
```
<ul id="my_slider">
	<li><img src="images/image1.jpg" alt="" /></li>
	<li><img src="images/image2.jpg" alt="" /></li>
	<li><img src="images/image3.jpg" alt="" /></li>
	<li><img src="images/image4.jpg" alt="" /></li>
	<li><img src="images/image5.jpg" alt="" /></li>
</ul>
```

Then initialize by the the .coverSlider() method.
```
$('#my_slider').coverSlider();
```

Adding a link inside the list item will add a link to the background image inside the slider.

```
<li>
	<a href="http://www.getpixelated.net"></a>
	<img src="images/image2.jpg" alt="" />
</li>
```

There is also the option to add HTML content over the image. This is done by adding a div tag within the list item:

```
<li>
	<div> This content is above the image. </div>
	<img src="images/image1.jpg" alt="" />
</li>
```


To create a slider inside the  with a 5 second delay between content:

	$('#my_slider').coverSlider({
		interval	: 5000
	});


The full list of options available using the method above, and the defaults set, are as follows:

 	xposition	: 'center',   //CSS background positioning for horizontal/x-centering
	yposition	: 'top',      //CSS background positioning for vertical/y-centering
	transition	: 2000,       //Time taken to transition between content
	interval	: 5500,       //Time showing content before transitioning 
	auto		: true,       //Auto-start content looping
	pauseonhover: false,      //Pause on hovering over content
	overlay		: ''          //Image overlay over background image, under cover content


Future updates
--------------

The following options are set within coverSlider.js by default, but not linked to available content

    action		: 'fade', 
    bullets		: true,
    navposition	: 'bottom-left',
    thumbnails	: false
	

More info

    action    : 'fade'
  
The "action" option will be used as expanded transitions and uses are built. At the initial 1.0 commit, coverSlider.js only supports fading between content.

    bullets   : true,
    navposition	: 'bottom-left'
	
Bullets and navposition are markers to jump between content via bullets. Navposition will allow the bullets to be placed in multiple positions.

	thumbnails	: false
	
Thumbnails may also be added in future releases for navigation below the slider. 


Other future updates include themes for next/previous navigation links
		
