$(document).ready(function () {
   let isInitialized = false;

   handleCarousel();

   let resizeTimer;
   $(window).on("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
         handleCarousel();
      }, 250); // Slightly longer debounce for stability
   });

   function handleCarousel() {
      const windowWidth = $(window).width();

      // Desktop (900px and above): No carousel
      if (windowWidth >= 900) {
         if (isInitialized) {
            $(".banner-carousel").slick("unslick");
            isInitialized = false;
            console.log("Desktop mode: Carousel disabled");
         }
      }
      // Tablet (between 768px and 899px): 3 slides
      else if (windowWidth >= 768 && windowWidth < 900) {
         if (isInitialized) {
            $(".banner-carousel").slick("unslick");
         }
         $(".banner-carousel").slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: false,
            adaptiveHeight: true,
         });
         isInitialized = true;
         console.log("Tablet mode: 3 slides");
      }
      // Mobile (below 768px): 1.5 slides with variable width
      else {
         if (isInitialized) {
            $(".banner-carousel").slick("unslick");
         }
         $(".banner-carousel").slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1.5,
            slidesToScroll: 1,
            adaptiveHeight: true,
            variableWidth: true,
         });
         isInitialized = true;
         console.log("Mobile mode: 1.5 slides with variable width");
      }
   }
});
