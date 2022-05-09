const searchStrings = {
  title: 'Search',
  categories: ['monsters', 'spells'],
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
  spell: 'spell',
  ritual: 'ritual',
  unknown: 'Unknown',
  spellLevelLabel: 'Level',
  ritualText: 'A ritual spell can be cast following the normal rules for spellcasting, or the spell can be cast as a ritual. The ritual version of a spell takes 10 minutes longer to cast than normal. It also doesn\'t expend a spell slot, which means the ritual version of a spell can\'t be cast at a higher level.',
  addCombatTracker: 'Add monster to Combat Tracker',
};

export default searchStrings;
