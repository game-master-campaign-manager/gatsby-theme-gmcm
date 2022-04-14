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

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type MdxFrontmatter @infer {
      monsters: [Monster]
      areas: [Area]
      spells: [Spell]
      setting: String
      levels: String
      playernum: String
      map: Map
    }
    type Map {
      image: File @fileByRelativePath
      width: Int
      height: Int
      padding: String
    }
    type Spell {
      name: String
      source: String
      castingtime: String
      classes: [String]
      components: String
      description: String
      duration: String
      level: String
      range: String
      ritual: Boolean
      school: String
      attacksave: String
      damage: String
    }
    type Area {
      id: ID
      name: String
      x: Int
      y: Int
      flags: [String]
      flavor: String
      callout: String
      content: String
      traps: [Trap]
    }
    type Trap {
      x: Int
      y: Int
      w: Int
      h: Int
    }
    type Monster {
      ac: Stat
      hp: Stat
      speed: [String]
      type: String
      name: String
      abilities: AbilityList
      skills: [Buff]
      saves: [Buff]
      senses: [String]
      languages: [String]
      source: String
      description: String
      lgdyactions: [Definition]
      reactions: [Definition]
      actions: [Definition]
      traits: [Definition]
      cdnimmunities: [String]
      dmgvulnerabilities: [String]
      dmgresistances: [String]
      dmgimmunities: [String]
      challenge: String
    }
    type Stat {
      value: String
      notes: String
    }
    type AbilityList {
      str: Int
      dex: Int
      con: Int
      int: Int
      wis: Int
      cha: Int
    }
    type Buff {
      name: String
      modifier: String
    }
    type Definition {
      name: String
      content: String
    }
    type Mdx implements Node @infer {
      frontmatter: MdxFrontmatter
    }
  `);
};

exports.createPages = async ({ graphql, actions, reporter }, options) => {
  const basePath = options.basePath || '/';

  // Home Page
  // actions.createPage({
  //   path: basePath,
  //   component: require.resolve('./pages/index.js'),
  // });

  // Adventures Listing Page
  // actions.createPage({
  //   path: `${basePath}adventures`,
  //   component: require.resolve('./pages/adventures.js'),
  // });

  // Search Page
  // actions.createPage({
  //   path: `${basePath}search`,
  //   component: require.resolve('./pages/search.js'),
  // });

  // Reference Page
  // actions.createPage({
  //   path: `${basePath}reference`,
  //   component: require.resolve('./src/pages/reference.js'),
  // });

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
      template = 'adventure';
    }
    if (locationRegex.test(node.slug)) {
      template = 'location';
    }
    if (locationRegex.test(node.slug) || adventureRegex.test(node.slug)) {
      actions.createPage({
        path: `${basePath}${node.slug}`,
        component: require.resolve(`./src/components/${template}-page-layout.js`),
        context: {
          id: node.id,
          locations: template === 'adventure' && `${node.slug}locations/`,
          npcs: template === 'adventure' && `${node.slug}npcs/`,
        },
      });
    }
  });
};
