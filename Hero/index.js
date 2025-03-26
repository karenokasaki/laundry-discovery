document.addEventListener("DOMContentLoaded", function () {
   const video = document.querySelector(".hero-video-wrapper video");
   const videoSource = document.querySelector(
      ".hero-video-wrapper video source"
   );

   // Definir os caminhos para os diferentes vídeos
   const videoSources = {
      mobile: "./_assets/hero-mobile.mp4",
      tablet: "./_assets/hero-tablet.mp4",
      desktop: "./_assets/hero-desktop.mp4",
   };

   async function setVideoSource() {
      let newSource;

      if (window.matchMedia("(min-width: 1023px)").matches) {
         newSource = videoSources.desktop;
      } else if (window.matchMedia("(min-width: 500px)").matches) {
         newSource = videoSources.tablet;
      } else {
         newSource = videoSources.mobile;
      }

      if (videoSource.src !== newSource) {
         videoSource.src = newSource;

         try {
            await new Promise((resolve, reject) => {
               video.addEventListener("loadeddata", resolve, { once: true });
               video.addEventListener("error", reject, { once: true });
               video.load();
            });

            await video.play();
         } catch (error) {
            console.error("Erro ao carregar ou reproduzir o vídeo:", error);
         }
      }
   }

   window.addEventListener("resize", setVideoSource);

   setVideoSource();
});
