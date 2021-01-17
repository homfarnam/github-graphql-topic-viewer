const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");
const withSass = require("@zeit/next-sass");
const withTM = require("next-transpile-modules");

const withBabelMinify = require("next-babel-minify")({
  comments: false,
});

module.exports = withBabelMinify({
  webpack(config, options) {
    return config;
  },
});

module.exports = withCss(
  {
    env: {
      NEXT_PUBLIC_REACT_APP_GITHUB_TOKEN:
        process.env.NEXT_PUBLIC_REACT_APP_GITHUB_TOKEN,
    },
  },
  withPurgeCss({
    purgeCssPaths: [
      "pages/**/*",
      "components/**/*", // also scan other-components folder
    ],
  })
);

module.exports = withCss(
  withSass(
    withTM({
      transpileModules: ["react-bulma-components"],
      sassLoaderOptions: {
        includePaths: ["./components"],
      },
      exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
      ) {
        return {
          "/": { page: "/" },
        };
      },
    })
  )
);

module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
    };
  },
};

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    // Important: return the modified config
    return config;
  },
};
