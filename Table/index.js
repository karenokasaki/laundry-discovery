$(document).ready(function () {
   // Inicializar tudo
   initAllCarousels();

   // Função para inicializar todos os carousels
   function initAllCarousels() {
      initProductCarousels();
      initTabEvents();
      // Garantir que o estado inicial está correto
      updateNavigationControls();
      initTooltips();
      compareTab();
      // Inicializar tabs carousel se estiver em mobile
      const windowWidth = $(window).width();
      if (windowWidth <= 580) {
         initTabsCarousel();
      }
   }

   // Inicializar carousels de produtos
   function initProductCarousels() {
      // Esconder todos os controles de navegação inicialmente
      $(".custom-dots, .custom-arrows").hide();

      // Mostrar apenas os controles do tab ativo
      const activeTabId = $(".tab-btn.active").data("tab");
      $(`#custom-dots-${activeTabId}, #custom-arrows-${activeTabId}`).show();

      $("#carousel1").slick({
         dots: true,
         arrows: true,
         infinite: false,
         speed: 300,
         slidesToShow: 6,
         slidesToScroll: 1,
         appendDots: $("#custom-dots-tab1"),
         appendArrows: $("#custom-arrows-tab1"),
         responsive: [
            {
               breakpoint: 1200,
               settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
               },
            },
            {
               breakpoint: 900,
               settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
               },
            },
            {
               breakpoint: 650,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
               },
            },
         ],
      });

      $("#carousel2").slick({
         dots: true,
         arrows: true,
         infinite: false,
         speed: 300,
         slidesToShow: 6,
         slidesToScroll: 1,
         appendDots: $("#custom-dots-tab2"),
         appendArrows: $("#custom-arrows-tab2"),
         responsive: [
            {
               breakpoint: 1200,
               settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
               },
            },
            {
               breakpoint: 900,
               settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
               },
            },
            {
               breakpoint: 650,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
               },
            },
         ],
      });
   }

   // Inicializar carousel de tabs
   function initTabsCarousel() {
      $(".tabs-container").slick({
         arrows: true,
         dots: false,
         infinite: false,
         speed: 300,
         slidesToShow: 1,
         slidesToScroll: 1,
         centerMode: false,
         variableWidth: false,
      });

      // Adicionar evento para quando o slide muda
      $(".tabs-container").on(
         "afterChange",
         function (event, slick, currentSlide) {
            // Encontrar o elemento tab-btn no slide atual
            const currentSlideEl = $(
               ".tabs-container .slick-slide[data-slick-index='" +
                  currentSlide +
                  "']"
            );

            if (currentSlideEl.length) {
               const tabId = currentSlideEl.data("tab");

               // Usar a função existente para mudar a tab, mas desativando
               // o retorno para o slider para evitar loop infinito
               changeTab(tabId, false);
            }
         }
      );
   }

   function initTabEvents() {
      // Quando uma tab é clicada diretamente
      $(document).on("click", ".tab-btn", function (e) {
         e.preventDefault();
         const tabId = $(this).data("tab");
         changeTab(tabId);
      });
   }

   // Função para mudar de tab
   function changeTab(tabId, updateSlider = true) {
      // Atualizar botão ativo
      $(".tab-btn").removeClass("active");
      $('.tab-btn[data-tab="' + tabId + '"]').addClass("active");

      // Mostrar tabela correspondente
      $(".comparison-table").removeClass("active");
      $('.comparison-table[data-table="' + tabId + '"]').addClass("active");

      // Atualizar controles de navegação
      updateNavigationControls();

      // Atualizar carousel de produtos
      $(".products-carousel").slick("setPosition");

      // Se o carousel de tabs estiver ativo e updateSlider for true, mover para a tab correta
      if (updateSlider && $(".tabs-container").hasClass("slick-initialized")) {
         // Encontrar o índice do slide que contém a tab
         let slideIndex = -1;
         $(".tabs-container .slick-slide").each(function (index) {
            if ($(this).find(`.tab-btn[data-tab="${tabId}"]`).length > 0) {
               slideIndex = index;
               return false; // Sair do loop
            }
         });

         if (slideIndex >= 0) {
            $(".tabs-container").slick("slickGoTo", slideIndex);
         }
      }
   }

   // Função para atualizar os controles de navegação
   function updateNavigationControls() {
      const activeTabId = $(".tab-btn.active").data("tab");

      // Esconder todos os controles
      $(".custom-dots, .custom-arrows").hide();

      // Mostrar apenas os controles da tab ativa
      $(`#custom-dots-${activeTabId}, #custom-arrows-${activeTabId}`).show();
   }

   function initTooltips() {
      // Variável para rastrear se o dispositivo é touch
      const isTouchDevice =
         "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // Tooltip para elementos na coluna fixa
      $(".fixed-column div span img").each(function () {
         const $img = $(this);
         const $tooltip = $img.parent().siblings(".tooltip");

         if (isTouchDevice) {
            // Em dispositivos touch, toggle no clique
            $img.on("click", function (e) {
               e.stopPropagation(); // Impede propagação do clique

               // Fecha todos os outros tooltips abertos
               $(".tooltip").not($tooltip).fadeOut(200);

               // Toggle do tooltip atual
               $tooltip.fadeToggle(200);
            });
         } else {
            // Em desktop, comportamento de hover normal
            $img.on("mouseenter", function () {
               $tooltip.fadeIn(200);
            });

            $img.on("mouseleave", function () {
               $tooltip.fadeOut(200);
            });
         }
      });

      // Tooltip para elementos nas colunas de produtos
      $(".product-column div span img").each(function () {
         const $img = $(this);
         const $tooltip = $img.parent().siblings(".tooltip");

         if (isTouchDevice) {
            // Em dispositivos touch, toggle no clique
            $img.on("click", function (e) {
               e.stopPropagation(); // Impede propagação do clique

               // Fecha todos os outros tooltips abertos
               $(".tooltip").not($tooltip).fadeOut(200);

               // Toggle do tooltip atual
               $tooltip.fadeToggle(200);
            });
         } else {
            // Em desktop, comportamento de hover normal
            $img.on("mouseenter", function () {
               $tooltip.fadeIn(200);
            });

            $img.on("mouseleave", function () {
               $tooltip.fadeOut(200);
            });
         }
      });

      // Clicar em qualquer outro lugar na página fecha os tooltips
      $(document).on("click touchstart", function () {
         $(".tooltip").fadeOut(200);
      });
   }

   function compareTab() {
      let isComparisonVisible = true;

      // Adicionar evento de clique na tab de comparação
      $(".compare-tab img").on("click", function () {
         // Toggle da visibilidade da comparison-wrapper
         if (isComparisonVisible) {
            $(".comparison-wrapper").slideUp(500);
            $(".compare-tab img").attr("src", "/_assets/compare-models-down.png");
         } else {
            $(".comparison-wrapper").slideDown(500);
            $(".compare-tab img").attr("src", "/_assets/compare-models.png");
         }

         // Inverter o estado
         isComparisonVisible = !isComparisonVisible;
      });
   }

   // Manipulador de redimensionamento
   let resizeTimer;
   $(window).on("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
         // Destruir carousels existentes
         if ($(".tabs-container").hasClass("slick-initialized")) {
            $(".tabs-container").slick("unslick");
         }
         $(".products-carousel").slick("unslick");

         // Reinicializar tudo
         initAllCarousels();
      }, 250);
   });
});
