const searchStrings = {
  title: 'Search',
  toggle: {
    aria: 'search category',
    buttons: [
      {
        label: 'monsters',
        aria: 'search monsters',
      },
      {
        label: 'spells',
        aria: 'search spells',
      },
    ],
  },
  categories: [
    {
      title: 'Bestiary',
      shortName: 'monsters',
    },
    {
      title: 'Spellbook',
      shortName: 'spells',
    },
    {
      title: 'Storehouse',
      shortName: 'items',
    },
  ],
  stats: {
    monsters: {
      simple: ['Damage Vulnerabilities', 'Damage Resistances', 'Damage Immunities', 'Condition Immunities', 'Languages', 'Challenge'],
      table: [
        {
          title: 'Speed',
          columns: ['Type', 'Distance'],
        },
        {
          title: 'Saving Throws',
          columns: ['Ability', 'Modifier'],
        },
        {
          title: 'Skills',
          columns: ['Skill', 'Modifier'],
        },
        {
          title: 'Senses',
          columns: ['Sense', 'Sensitivity'],
        },
      ],
      life: ['Armor Class', 'Hit Points'],
      info: ['Traits', 'Actions', 'Reactions', 'Legendary Actions'],
    },
    spells: ['Casting Time', 'Range', 'Components', 'Duration', 'Attack/Save', 'Damage'],
  },
  spellLevelLabel: 'Level',
  ritualText: 'A ritual spell can be cast following the normal rules for spellcasting, or the spell can be cast as a ritual. The ritual version of a spell takes 10 minutes longer to cast than normal. It also doesn\'t expend a spell slot, which means the ritual version of a spell can\'t be cast at a higher level.',
};

export default searchStrings;
