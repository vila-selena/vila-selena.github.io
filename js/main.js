$(document).ready(function(){

    // panorama on 1st page
    if ( $('#panorama-banner').length ) {
        $('#panorama-banner').spritespin({
            source: '/images/banner/panorama.jpg',
            // this sets the width of the display. The panorama image must be larger
            responsive: true,
            width: 750,
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
    };

    // image zoom for about
    if ( $('#about-popup-container').length ) {
        $('#about-popup-container').magnificPopup({
                delegate: 'a', // child items selector, by clicking on it popup will open
                type: 'image',
                gallery: {
                        enabled: true,
                        tCounter: ''
                },
                closeOnContentClick: true,
                closeBtnInside: false,
                fixedContentPos: true,
                mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                image: {
                        verticalFit: true
                },
                zoom: {
                        enabled: true,
                        duration: 300 // don't foget to change the duration also in CSS
                }
        });
    }
    
    // image zoom for about
    if ( $('#gallery-popup-container').length ) {
        $('#gallery-popup-container').magnificPopup({
                delegate: 'a', // child items selector, by clicking on it popup will open
                type: 'image',
                gallery: {
                        enabled: true,
                        tCounter: ''
                },
                closeOnContentClick: true,
                closeBtnInside: false,
                fixedContentPos: true,
                mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                image: {
                        verticalFit: true
                },
                zoom: {
                        enabled: true,
                        duration: 300 // don't foget to change the duration also in CSS
                }
        });
    }
    
    // socials icons in footer
    $("#social-share").jsSocials({
        showLabel: false,
        showCount: false,
        shares: ["twitter", "facebook", "linkedin", "pinterest", "stumbleupon"]
    });
});


/*
    // handles the carousel thumbnails
    $('[id^=carousel-selector-]').click( function(){
        var id_selector = $(this).attr("id");
        var id = id_selector.substr(id_selector.lastIndexOf('-') + 1);
        id = parseInt(id);
        $('#rsmm-gallery-carousel').carousel(id);
        $('[id^=carousel-selector-]').removeClass('selected');
        $(this).addClass('selected');
    });

    // when the carousel slides, auto update
    $('#rsmm-gallery-carousel').on('slid.bs.carousel', function (e) {
        var id = $('.item.active').data('slide-number');
        id = parseInt(id);
        $('[id^=carousel-selector-]').removeClass('selected');
        $('[id=carousel-selector-'+id+']').addClass('selected');
    });
*/
