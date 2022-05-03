const indexStrings = {
  title: 'Hail fellow well met.',
  text: 'The GMCM is a React-based campaign manager for your favorite 5E TTRPG.',
  documentation: {
    label: 'Documentation',
    links: [
      {
        title: 'GitHub Repository',
        url: 'https://github.com/game-master-campaign-manager/gatsby-theme-gmcm',
      },
      {
        title: 'Wiki',
        url: 'https://github.com/game-master-campaign-manager/gatsby-theme-gmcm/wiki',
      },
      {
        title: 'Demo Site',
        url: 'https://game-master-campaign-manager.github.io/',
      },
    ],
  },
  news: {
    label: 'What\'s New',
    version: '0.1.4',
    content: '',
    // * FEATURE: Search has been consolidated into one page.
    // * BUGFIX: When a monster lacks monster.hp.notes for calculating HP in the Combat Tracker, it will now default to monster.hp.value instead.
  },
};

export default indexStrings;
