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

    //Animate scroll to FeaturesMenu when switching sticky menu
    $('a[data-toggle="pill"]').on('show.bs.tab', function (e) {
      
      const offset = -40;
      const target = $("#Features").offset().top + offset;
      
      $('html, body').animate({
        scrollTop: (target) 
      }, 1000, "easeOutExpo");
    })

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
        tabContent.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    });

    // Features Page:

    const spyTarget = '#features-menu';
    const midScreenOffset = 450;
    let finalDestinationId = null;
    let isNavClick = false;

    // 1. Add scrollspy to Body
    $('body').scrollspy({ target: spyTarget, offset: midScreenOffset });

    // 2. Listen for clicks on the Bootstrap Nav links
    $(`${spyTarget} .nav-link`).on('click', function () {
      // Save the exact ID the user clicked on (e.g., "#services")
      finalDestinationId = this.hash;
      isNavClick = true;

      $('body').scrollspy('dispose');
      window.location.hash = finalDestinationId;
      
      // Visually lock the active class onto this clicked item immediately
      $(`${spyTarget} .nav-link`).removeClass('active');
      $(this).addClass('active');
    });

    window.addEventListener('scrollend', function () {
    // Only run this logic if the scroll came from clicking a nav item
    if (!isNavClick) return; 
    
    isNavClick = false;

    // 6. ARRIVAL! The native browser scroll is done. 
    // Re-initialize ScrollSpy so it tracks normal manual mouse wheel scrolling again.
    $('body').scrollspy({ target: spyTarget, offset: midScreenOffset });
    $('body').scrollspy('refresh');
  });
    
})(jQuery); // End of use strict
