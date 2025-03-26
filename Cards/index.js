$(document).ready(function () {
   initSlick();

   $(window).on("resize", function () {
      clearTimeout(window.resizedFinished);
      window.resizedFinished = setTimeout(function () {
         $(".cards-carousel").slick("unslick");
         initSlick();
      }, 250);
   });

   function initSlick() {
      $(".cards-carousel").slick({
         dots: true,
         arrows: true,
         infinite: false,
         speed: 300,
         slidesToShow: 1.5,
         slidesToScroll: 1,
         adaptiveHeight: true,
         mobileFirst: true,
         variableWidth: false,
         responsive: [
            {
               breakpoint: 480,
               settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  variableWidth: false,
               },
            },
            {
               breakpoint: 760, // >= 768px (tablet)
               settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  variableWidth: false,
               },
            },
            {
               breakpoint: 899, // >= 900px (desktop)
               settings: "unslick",
            },
         ],
      });
   }
});
