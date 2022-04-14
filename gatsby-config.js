// eslint-disable-next-line no-unused-vars
module.exports = ({ contentPath = 'src/content', basePath = '/' }) => ({
  plugins: [
    'gatsby-transformer-sharp', 'gatsby-plugin-sharp', 'gatsby-plugin-image', 'gatsby-plugin-react-helmet', 'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: contentPath,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        // Served from theme directly.
        name: 'dummyContent',
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        // Served from theme directly.
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        // Served from theme directly.
        icon: `${__dirname}/src/images/icon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
  ],
});
