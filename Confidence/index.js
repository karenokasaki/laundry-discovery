$(document).ready(function () {
   initSlick();

   $(window).on("resize", function () {
      clearTimeout(window.resizedFinished);
      window.resizedFinished = setTimeout(function () {
         $(".confidence-carousel").slick("unslick");
         initSlick();
      }, 100);
   });

   function initSlick() {
      $(".confidence-carousel").slick({
         dots: true,
         arrows: true,
         infinite: false,
         speed: 300,
         slidesToShow: 1.2,
         slidesToScroll: 1,
         mobileFirst: true,
         adaptiveHeight: true,
         variableWidth: false,
         responsive: [
            {
               breakpoint: 760, // >= 768px (tablet)
               settings: "unslick",
            },
         ],
      });
   }
});
