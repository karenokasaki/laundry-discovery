/**
 * Component Combiner with Embedded CSS and JS
 *
 * This script combines individual HTML/JS/CSS components into a single HTML file.
 * CSS and JS are embedded directly in the HTML file rather than linked externally.
 * It processes components based on a configuration file, extracts the relevant HTML elements,
 * adjusts asset paths, and generates a complete HTML document.
 *
 * Usage: node combine-components-embedded.js
 */

const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const mkdirp = require("mkdirp");

/**
 * Main function to combine components
 */
async function combineComponents() {
   try {
      // Read configuration file
      const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
      const { title, description, components } = config;

      // Project root directory
      const rootDir = process.cwd();

      // Create dist directory if it doesn't exist
      const distDir = path.join(rootDir, "dist");
      if (!fs.existsSync(distDir)) {
         mkdirp.sync(distDir);
         console.log("Created dist directory in project root");
      }

      // Create public directory in root if it doesn't exist
      const publicDir = path.join(rootDir, "public");
      if (!fs.existsSync(publicDir)) {
         mkdirp.sync(publicDir);
         console.log("Created public directory in project root");
      }

      // Create assets directory in public if it doesn't exist
      const assetsDir = path.join(publicDir, "assets");
      if (!fs.existsSync(assetsDir)) {
         mkdirp.sync(assetsDir);
         console.log("Created assets directory in public folder");
      }

      // Arrays to store component content and styles/scripts
      const componentsHtml = [];
      const cssContents = [];
      const jsContents = [];

      // Read global CSS if it exists
      const globalCssPath = path.join(rootDir, "global.css");
      if (fs.existsSync(globalCssPath)) {
         const globalCss = fs.readFileSync(globalCssPath, "utf8");
         cssContents.push(`/* global.css */\n${globalCss}`);
      }

      // Process each component listed in config
      for (const componentName of components) {
         console.log(`Processing component: ${componentName}`);

         const componentDir = path.join(rootDir, componentName);
         const htmlPath = path.join(componentDir, "index.html");
         const cssPath = path.join(componentDir, "style.css");
         const jsPath = path.join(componentDir, "index.js");

         // Copy component assets to public/assets directory
         const componentAssetsDir = path.join(componentDir, "assets");
         if (fs.existsSync(componentAssetsDir)) {
            const files = fs.readdirSync(componentAssetsDir);
            for (const file of files) {
               const sourcePath = path.join(componentAssetsDir, file);
               const destPath = path.join(assetsDir, file);
               fs.copyFileSync(sourcePath, destPath);
               console.log(`Copied asset: ${file} to public/assets`);
            }
         }

         // Add CSS content to array if it exists
         if (fs.existsSync(cssPath)) {
            const cssContent = fs.readFileSync(cssPath, "utf8");
            cssContents.push(`/* ${componentName}/style.css */\n${cssContent}`);
         }

         // Add JS content to array if it exists
         if (fs.existsSync(jsPath)) {
            const jsContent = fs.readFileSync(jsPath, "utf8");
            jsContents.push(`// ${componentName}/index.js\n${jsContent}`);
         }

         // Process HTML if it exists
         if (fs.existsSync(htmlPath)) {
            const htmlContent = fs.readFileSync(htmlPath, "utf8");
            const $ = cheerio.load(htmlContent);

            // Find div with ID equal to lowercase component name
            const componentId = componentName.toLowerCase();
            const componentDiv = $(`#${componentId}`);

            if (componentDiv.length > 0) {
               // Adjust asset paths - change ./assets/ and /_assets/ to /assets/
               componentDiv.find("[src]").each((i, elem) => {
                  const src = $(elem).attr("src");
                  if (src && src.startsWith("./assets/")) {
                     const newSrc = src.replace("./assets/", "/public/assets/");
                     $(elem).attr("src", newSrc);
                  } else if (src && src.startsWith("/_assets/")) {
                     const newSrc = src.replace("/_assets/", "/public/assets/");
                     $(elem).attr("src", newSrc);
                  }
               });

               componentDiv.find("[srcset]").each((i, elem) => {
                  const src = $(elem).attr("srcset");
                  if (src && src.startsWith("./assets/")) {
                     const newSrc = src.replace("./assets/", "/public/assets/");
                     $(elem).attr("srcset", newSrc);
                  } else if (src && src.startsWith("/_assets/")) {
                     const newSrc = src.replace("/_assets/", "/public/assets/");
                     $(elem).attr("srcset", newSrc);
                  }
               });

               // Handle video source tags
               componentDiv.find("source[src]").each((i, elem) => {
                  const src = $(elem).attr("src");
                  if (src && src.startsWith("./assets/")) {
                     const newSrc = src.replace("./assets/", "/public/assets/");
                     $(elem).attr("src", newSrc);
                  } else if (src && src.startsWith("/_assets/")) {
                     const newSrc = src.replace("/_assets/", "/public/assets/");
                     $(elem).attr("src", newSrc);
                  }
               });

               // Add processed HTML to array
               componentsHtml.push($.html(componentDiv));
            } else {
               console.warn(
                  `Warning: No div with id="${componentId}" found in component ${componentName}`
               );
            }
         } else {
            console.warn(
               `Warning: HTML file not found for component ${componentName}`
            );
         }
      }

      // Combine all CSS and JS content
      const combinedCss = cssContents.join("\n\n");
      const combinedJs = jsContents.join("\n\n");

      // Create final HTML document with embedded CSS and JS
      const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>${title}</title>
   <meta name="description" content="${description}" />

   <!-- carousel -->
   <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
   />
   <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
   />

   <link rel="stylesheet" href="/LG/css/hsad-style.css" />

   <!-- Embedded CSS -->
   <style>
${combinedCss}
   </style>
</head>
<body>
   ${componentsHtml.join("\n   ")}

   <!-- External libraries -->
   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
   <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
   ></script>

   <!-- Embedded JavaScript -->
   <script>
${combinedJs}
   </script>
</body>
</html>`;

      // Save final HTML to index.html in dist directory
      fs.writeFileSync(path.join(distDir, "index.html"), finalHtml);

      // Também copie o arquivo index.html para a raiz do projeto para fácil acesso
      fs.copyFileSync(
         path.join(distDir, "index.html"),
         path.join(rootDir, "index.html")
      );

      console.log(
         "Successfully generated index.html with embedded CSS and JS!"
      );

      // Create vercel.json in root if it doesn't exist
      const vercelJsonPath = path.join(rootDir, "vercel.json");
      const vercelConfig = {
         version: 2,
         buildCommand: false,
         devCommand: false,
         installCommand: false,
         public: true,
         outputDirectory: "dist",
      };

      fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelConfig, null, 2));
      console.log("Created vercel.json configuration file");
   } catch (error) {
      console.error("Error:", error);
   }
}

// Execute main function
combineComponents();
