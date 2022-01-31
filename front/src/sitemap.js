require("babel-register")({
  presets: ["es2015", "react"]
});

const router = require("./components/Routing/routesSitemap").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return (
    new Sitemap(router)
    .build("https://www.dsp-archiwebo20-db-od-sn-bm.fr/")
    .save("./public/sitemap.xml")
  );
}

generateSitemap();