// Review Component JavaScript

$(document).ready(function () {
   initSlick();

   $(window).on("resize", function () {
      clearTimeout(window.resizedFinished);
      window.resizedFinished = setTimeout(function () {
         $(".review-carousel").slick("unslick");
         initSlick();
      }, 100);
   });

   function initSlick() {
      $(".review-carousel").slick({
         dots: true,
         arrows: true,
         infinite: false,
         speed: 300,
         slidesToShow: 1,
         slidesToScroll: 1,
         mobileFirst: true,
         adaptiveHeight: false,
         variableWidth: false,
         responsive: [
            {
               breakpoint: 760, // >= 768px (tablet)
               settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
               },
            },
            {
               breakpoint: 1020,
               settings: "unslick",
            },
         ],
      });
   }
});
