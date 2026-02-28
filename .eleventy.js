module.exports = function(config) {
  // Ensure admin (Netlify CMS) assets are included in the build output
  config.addPassthroughCopy("admin");
  // Artworks and pages collections
  config.addCollection("artworks", function(collection) {
    return collection.getFilteredByGlob("content/artworks/*.md").sort((a,b)=> new Date(b.data.date) - new Date(a.data.date));
  });
  config.addCollection("pages", function(collection) {
    return collection.getFilteredByGlob("content/pages/*.md");
  });
  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}
