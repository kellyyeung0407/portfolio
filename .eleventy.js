module.exports = function(config) {
  // Ensure admin (Netlify CMS) assets are included in the build output
  config.addPassthroughCopy("admin");
  // Map 'base' layout to the _layouts/base.njk file (robust alias)
  if (typeof config.addLayoutAlias === 'function') {
    config.addLayoutAlias("base", "_layouts/base.njk");
  }
  // Content collections
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
