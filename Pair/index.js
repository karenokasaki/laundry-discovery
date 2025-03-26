$(document).ready(function () {
   initSlick();

   $(window).on("resize", function () {
      clearTimeout(window.resizedFinished);
      window.resizedFinished = setTimeout(function () {
         $(".pair-carousel").slick("unslick");
         initSlick();
      }, 100);
   });

   function initSlick() {
      $(".pair-carousel").slick({
         dots: true,
         arrows: true,
         infinite: false,
         autoplay: true,
         speed: 300,
         autoplaySpeed: 3000,
         slidesToShow: 1,
         slidesToScroll: 1,
         adaptiveHeight: false,
         variableWidth: false,
         responsive: [
            /*  {
               breakpoint: 760, // >= 768px (tablet)
               settings: "unslick",
            }, */
         ],
      });
   }
});
