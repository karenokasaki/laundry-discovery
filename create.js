/**
 * Component Folder Generator
 *
 * This script creates a new component folder with the necessary
 * boilerplate files (HTML, CSS, JS, and assets directory).
 *
 * Usage: node create-component.js ComponentName
 */

const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

// HTML template for the new component
const htmlTemplate = (componentName) => {
   const componentId = componentName.toLowerCase();
   return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <!-- carousel -->
      <link
         rel="stylesheet"
         href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
      />
      <link
         rel="stylesheet"
         href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
      />

      <link rel="stylesheet" href="/public/LG/css/hsad-style.css" />
      <link rel="stylesheet" href="/global.css" />
      <link rel="stylesheet" href="style.css" />
      <script src="index.js" defer></script>
      <title>${componentName}</title>
   </head>
   <body>
      <div id="${componentId}">
         <div class="${componentId}-wrapper">
          
         </div>
      </div>

       <!-- carousel -->
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script
         type="text/javascript"
         src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
      ></script>
   </body>
</html>`;
};

// CSS template for the new component
const cssTemplate = (componentName) => {
   const componentId = componentName.toLowerCase();
   return `/* ${componentName} Component Styles */

#${componentId} {
}

.${componentId}-wrapper {
}

/* tablet */
@media (min-width: 760px) {
}

/* desktop */
@media (min-width: 1024px) {
}

`;
};

// JS template for the new component
const jsTemplate = (componentName) => {
   const componentId = componentName.toLowerCase();
   return `// ${componentName} Component JavaScript

$(document).ready(function () {
   initSlick();

   $(window).on("resize", function () {
      clearTimeout(window.resizedFinished);
      window.resizedFinished = setTimeout(function () {
         $(".${componentId}-carousel").slick("unslick");
         initSlick();
      }, 100);
   });

   function initSlick() {
      $(".${componentId}-carousel").slick({
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

`;
};

/**
 * Creates a new component folder with boilerplate files
 */
function createComponentFolder() {
   // Get component name from command line arguments
   const componentName = process.argv[2];

   if (!componentName) {
      console.error("Error: Component name is required");
      console.log("Usage: node create-component.js ComponentName");
      process.exit(1);
   }

   // Project root directory
   const rootDir = process.cwd();

   // Component directory path
   const componentDir = path.join(rootDir, componentName);

   // Check if component directory already exists
   if (fs.existsSync(componentDir)) {
      console.error(`Error: Component "${componentName}" already exists`);
      process.exit(1);
   }

   try {
      // Create component directory
      fs.mkdirSync(componentDir);
      console.log(`Created component directory: ${componentName}`);

      // Create assets directory
      const assetsDir = path.join(componentDir, "assets");
      fs.mkdirSync(assetsDir);
      console.log(`Created assets directory for ${componentName}`);

      // Create HTML file
      fs.writeFileSync(
         path.join(componentDir, "index.html"),
         htmlTemplate(componentName)
      );
      console.log(`Created index.html for ${componentName}`);

      // Create CSS file
      fs.writeFileSync(
         path.join(componentDir, "style.css"),
         cssTemplate(componentName)
      );
      console.log(`Created style.css for ${componentName}`);

      // Create JS file
      fs.writeFileSync(
         path.join(componentDir, "index.js"),
         jsTemplate(componentName)
      );
      console.log(`Created index.js for ${componentName}`);

      console.log(`\nComponent "${componentName}" successfully created!`);
      console.log(
         `\nTo add this component to your page, include it in your config.json file.`
      );
   } catch (error) {
      console.error("Error:", error);
   }
}

// Execute main function
createComponentFolder();
