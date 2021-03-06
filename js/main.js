function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

$(document).ready(function(){

    // panorama on 1st page
    /*
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
    */
   
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
    
    // image zoom for gallery
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
    
    // image zoom for apartments
    if ( $('#apartment-popup-container').length ) {
        $('#apartment-popup-container').magnificPopup({
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
    $("#socials").jsSocials({
        showLabel: false,
        showCount: false,
        shares: ["twitter", "facebook", "email", "linkedin", "pinterest", "stumbleupon", "whatsapp"]
    });
});
