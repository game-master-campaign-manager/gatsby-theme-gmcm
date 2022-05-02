/* eslint-disable prefer-regex-literals */
const fs = require('fs');

exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || 'src/content';

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath, { recursive: true });
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
      },
    },
  });
};

exports.createPages = async ({ graphql, actions, reporter }, options) => {
  const basePath = options.basePath || '/';

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('🚨  ERROR: Loading "createPages" query', reporter.errors);
    return;
  }

  // Adventure Landing Pages & Location Pages
  const posts = result.data.allMdx.edges;
  // eslint-disable-next-line no-unused-vars
  posts.forEach(({ node }, index) => {
    const adventureRegex = new RegExp('adventures/\\w+/$');
    const locationRegex = new RegExp('adventures/\\w+/locations/');
    let template = 'foo';
    if (adventureRegex.test(node.slug)) {
      template = 'AdventureLandingPage';
    }
    if (locationRegex.test(node.slug)) {
      template = 'LocationPageLayout';
    }
    if (locationRegex.test(node.slug) || adventureRegex.test(node.slug)) {
      actions.createPage({
        path: `${basePath}${node.slug}`,
        component: require.resolve(`./src/components/${template}/${template}.js`),
        context: {
          id: node.id,
          locations: template === 'AdventureLandingPage' && `${node.slug}locations/`,
          npcs: template === 'AdventureLandingPage' && `${node.slug}npcs/`,
        },
      });
    }
  });
};
