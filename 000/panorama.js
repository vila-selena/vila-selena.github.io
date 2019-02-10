$(function(){
  $('#spritespin').spritespin({
    source: 'images/panorama.jpg',
    // this sets the width of the display. The panorama image must be larger
    responsive: true,
    width: 600,
    height: 300,
    // select the modules
    plugins: [
      // change frame on mouse drag
      'drag',
      // enable the easing module. this will ease out the animation
      // after mouse release, instead of a hard stop
      'ease',
      // the panorama display module
      'panorama'
    ]
  });
});

