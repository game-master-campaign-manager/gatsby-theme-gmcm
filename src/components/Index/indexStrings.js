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
    version: '0.1.3',
    bullets: [
      'FEATURE: Attack Buttons: Now in Search and Location pages, you can use `<Attack />` in your `.mdx` files to create a button to roll an attack. It also tracks if the attack is a critical hit/miss and adjusts damage roles accordingly. Full documentation in the Wiki.',
      'FEATURE: All SRD Spells are added to the "Spellbook" search page.',
      'QOL: Separated data and presentation in files so that it is now easier to shadow a component in the GMCM. This will also help localization in the future. More functionality for both of these to come in future releases.',
      'QOL: Various UI improvements to the Combat Tracker',
      'BUGFIX: Fixed "Goblin" monster with bad value in HP, which caused the site to crash when selecting it.',
    ],
  },
};

export default indexStrings;
