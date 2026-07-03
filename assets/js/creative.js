/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {

    "use strict"; // Start of use strict

    // Closes the Responsive Menu on Menu Item Click
    $('#navbar-links ul li a').click(function() {
      $('#navbar-links').collapse('hide')
    });

    $('.docsearchBottom').click(function() {
      $('#navbar-links').collapse('hide')
    });

    //Swiper slider
    const swiper = new Swiper('.swiper', {
      loop: true,
      slidesPerView: 1,
      centeredSlides: false,
      // Disable preloading of all images
      preloadImages: false,
      // Enable lazy loading
      lazy: true,

      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },

      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // On the Home, Feature section: scroll to the top of the tab-content
    // everytime tab switches.
    
    $('button[data-toggle="tab"]').on('shown.bs.tab', function (e) {
 
      // Find the container holding your tab content
      const tabContent = document.querySelector('.tab-content');
      
      if (tabContent) {
        // Scroll the top of the tab content into view smoothly
        setTimeout(function() {
          tabContent.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        });
      }
    });
    
})(jQuery); // End of use strict
