const common = {
  'Rares': {
    2: '★3',
    3: '★4',
    4: '★5',
  },
  'Classes': {
    '-1': 'Default',
    0: 'Fighter',
    1: 'Magician',
    2: 'Priest',
    3: 'Knight',
    4: 'Alchemist',
  },
  'Elements': {
    '-1': 'Default',
    0: 'Fire',
    1: 'Water',
    2: 'Earth',
    3: 'Wind',
    4: 'Moon',
    5: 'Sun',
  },
  'Abnormals': {
    'All': 'all abnormals',
    0: 'Confusion',
    1: 'Paralysis',
    2: 'Hunger',
    3: 'Bearish',
    4: 'Sleep',
    5: 'Unhappy',
    6: 'Silence',
    7: 'Isolation',
  },
  'Statuses': {
    'All': 'all statuses',
    0: 'ATK',
    1: 'MAT',
    2: 'DEF',
    3: 'MDF',
    4: 'SPD',
    5: 'LUK',
  },

  'comma': ', ',
  'dot': '. ',
  'divider': ', ',

  'Probability': 'Prob.',
  'Input': {
    'Filter': 'Enter filters..',
  }
};

const home = {
  'KiraFan.Moe': 'KiraFan.Moe',
  'KiraFan Wiki': 'Kirara Fantasia Analysis Wiki',
  'Day Count': '{0} days since Kirara Fantasia released',

  'Version': 'Version',
  'Version Info': '',

  'Summon Text': {
    'Failure': '次回もがんばりますっ！<br>またいつでも来てくださいね！',
    'Success': 'す、す、すごかったです！<br>次回もがんばりますっ！',
  }
};

const character = {
  'Arousal': 'Awaken',
  'Distributed Weaken': 'Distributed-',

  'Gift Types': {
    1000: 'Level Up Materials',
    2000: 'Weapon Materials',
    3000: 'Coins',
  },

  'Flavor Condition Types': {
    1: 'Start',
    2: 'End',
  },

  'Same Rare Class Element': '{class}s of {rare} in {element} element',
  'Same Event': 'Active in event {event}',
  'Same Named': 'Cards of {name}',
};

const named = {
  'Character Voice Type': {
    0: 'System',
    1: 'Scenarios',
    2: 'Town',
    3: 'Battle',
  },
  'Character Voice Category': {
    '000': 'Title Call',
    '001': 'Greeting - Common',
    '002': 'Greeting - Morning',
    '003': 'Greeting - Evening',
    '006': 'Level Up',
    '008': 'Evolution',
    '009': 'Training Start',
    '010': 'Training Accomplished',
    '012': 'Mission',
    '013': 'Mission Accomplished',

    '400': 'Quest Departure',
    '401': 'Battle Start',
    '403': 'Crispy Attack',
    '405': 'Clearly Attack',
    '406': 'Powerful Skills',
    '409': 'Auxiliary Skills',
    '411': 'Support Skills',
    '412': 'Special Skills',
    '413': 'Damage',
    '415': 'Abnormal',
    '416': 'Dead',
    '417': 'Battle Win',
    '419': 'Battle Loss',
    '420': 'Touch Voice',

    'Room1': 'Room Conversation 1',
    'Room2': 'Room Conversation 2',
    'RoomAction': 'Room Action',
    'Town1': 'Town Visit 1',
    'Town2': 'Town Visit 2',
    'TownAction': 'Town Action',
    'Home': 'Home Conversation',

    'Default': 'Default',
  },

  'Same Title': 'From {title}',
  'Same CV': 'Characters of CV {name}',
  'Cross Adv': 'Friends sharing cross scenarios',
};

const skill = {
  'Skill Targets': {
    0: 'self',
    1: 'a single enemy',
    2: 'all enemies',
    3: 'a single ally',
    4: 'all allies',
  },

  'Skill Damage Types': {
    0: 'physical',
    1: 'magical',
  },

  'Skill Signs': {
    '-1': 'down',
    0: 'change',
    1: 'up',
  },

  'Skill Verbs': {
    '-1': 'decrease',
    0: 'change',
    1: 'increase',
  },

  'Skill Turn Types': {
    0: 'rounds',
    1: 'turns',
  },

  'Skill Types': {
    0: 'Attack',
    1: 'Recover',
    2: 'Status Change',
    3: 'Status Change Reset',
    4: 'Abnormal',
    5: 'Abnormal Recover',
    6: 'Abnormal Disable',
    7: 'Abnormal Additional Probability',
    8: 'Element Resist',
    9: 'Element Change',
    10: 'Weak Element Bonus',
    11: 'Next Attack Up',
    12: 'Next Attack Critical',
    13: 'Barrier',
    14: 'Recast Change',
    15: 'Kirara Jump Gauge Change',
    16: 'Kirara Jump Gauge Coef',
    17: 'Order Change',
    18: 'Hate Change',
    19: 'Charge Change',
    20: 'Chain Coef Change',
    21: 'Card',
    22: 'Stun Recover',
    23: 'Regene',
    24: 'No Operation',
    25: 'Load Factor Reduce',
    26: 'Critical Damage Change',
    27: 'Attack Self',
    28: 'Random Status Change',
    29: 'Kirara Jump Gauge Up On Damage',
    30: 'Status Change Disable',
  },

  'Skill Details': {
    0: '{amount} {damageType} damage ({power}) to {target}',
    1: 'Heal {target} {amount} ({power})',
    2: '{amount} {status} {sign} ({power}) on {target} for {turn} {turnType}',
    3: 'Clear all {sign}s of {status} from {target}',
    4: '{abnormal} on {target} {amount} ({power})',
    5: 'Clear {abnormal} from {target}',
    6: 'Disable abnormals on {target} for {turn} {turnType}',
    7: 'Abnormal resist {sign} ({power}) on {target} for {turn} {turnType}',
    8: '{amount} {element} resist {sign} ({power}) on {target} for {turn} {turnType}',
    9: 'Change element of {target} to {element}',
    10: 'Elemental advantage damage up ({power}) on {target} for {turn} {turnType}',
    11: '{amount} {damageType} damage up ({power}) on the next attack of {target}',
    12: 'Critical on the next attack of {target}',
    13: 'Barrier to {target} blocking damage {amount} ({power}) for {turn} times',
    14: '{verb} the recast of {target} {amount} ({power})',
    15: '{verb} the totteoki gauge {amount} ({power})',
    16: 'Kirara Jump Gauge Coef',
    17: 'Order Change',
    18: '{amount} hate {sign} ({power}) on {target} for {turn} {turnType}',
    19: '{verb} the charge count of {target} ({power})',
    20: 'Chain Coef Change',
    21: 'Place {turn} skill cards as: "{extra}"',
    22: 'Stun Recover',
    23: 'Recovery ({power}) on {target} for {turn} turns',
    24: 'No Operation',
    25: 'Quick Draw (-{power}) on {target} for {turn} {turnType} <small><br>Decrease load factors of skills</small>',
    26: 'Critical damage {sign} ({power}) on {target} for {turn} {turnType}',
    27: 'Decrease HP of {target} ({power})',
    28: 'A specific random status {sign} on {target} for {turn} {turnType}',
    29: 'Endurance ({power}) on {target} for {turn} {turnType} <small><br>Increase totteoki charge on damage</small>',
    30: 'Disable status downs on {target} for {turn} {turnType}',
  },

  'Skill Amount Sign': '{amount} {sign}',
  'Skill Amounts': {
    0: { 0: 'special', 1: 'small', 2: 'medium', '3-': 'medium large', 3: 'large', 4: 'extra large', 5: 'super large' },
    1: { 1: 'for a small amount', 2: 'for a medium amount', 3: 'for a large amount', 4: 'for an extra large amount' },
    2: { 1: 'small', 2: 'medium', 3: 'large', 4: 'extra large' },
    4: { 1: 'by a low chance', 2: 'by a medium chance', 3: 'by a high chance', 4: '' },
    8: { 1: 'small', 2: 'medium', 3: 'large' },
    11: { 1: 'small', 2: 'medium', 3: 'large', 4: 'extra large' },
    13: { 1: 'slightly', 2: '', 3: 'greatly', 4: 'fully' },
    14: { 1: 'slightly', 2: '', 3: 'greatly' },
    15: { 1: 'slightly', 2: '', 3: 'greatly' },
    18: { 1: 'small', 2: 'medium', 3: 'large' },
    26: { 1: 'small', 2: 'medium', 3: 'large' },
  },

  'Skill Powers': {
    0: {
      0: '{power}%',
      1: '{power}% / {power2}% to targets in abnormal',
      2: '{power}% of max HP',
      3: '{power}% of current HP',
      4: '{power} points',
      5: '{powerA}% / {powerB}% / {powerC}%',
      100: '{power}% / {power2}% to targets in {abnormal}',
    },
    27: {
      0: '{power}% of max HP',
      1: '{power}% of current HP',
      2: '{power} points',
    },
    28: {
      'Power': '{prob}%: {power}',
      'Status Change': '{amount} {status} {sign} ({power})',
    }
  },

  'Passive Triggers': {
    0: '',
    1: 'Every time self is damaged, ',
    2: 'Every time self kills an enemy, ',
  },

  'Passive Details': {
    0: '{amount} {status} {sign} ({power}) on self',
    1: '{amount} hate {sign} ({power}) on self',
    2: 'Disable abnormals on self',
    3: 'Disable stun on self',
    4: 'Stun amount up ({power}) on self\'s attacks <br><small>Attacks increase enemy\'s stun gauge for an extra amount</small>',
    5: '{verb} the totteoki gauge {amount} ({power})',
    6: 'Totteoki gauge coef {sign} ({power}) on self <br><small>Actions increase totteoki gauge for an extra amount</small>',
    7: 'Critical damage {sign} ({power}) on {target}',
    8: 'Self\'s skills change',
    9: 'Self can heal over max HP ({power})',
    10: 'Recover HP based on damage dealt to enemies',
    11: 'Self can revive ({power}) <br><small>Recover for only once when HP drops to 0</small>',
    12: '{verb} turns of skill cards of self ({power})',
    13: '{status} change on self based on HP',
    14: '{amount} {status} {sign} ({power}) on {target} for {turn} {turnType}',
  },

  'Passive Powers': {
    10: {
      0: 'Normal Attacks',
      1: 'Class Skills',
      2: 'Weapon Skills',
      3: 'Totteoki',
    },
    11: {
      0: '{0}% of HP',
      1: '{0} points',
    },
    13: {
      'Status Change': '{amount} {status} {sign} ({power})',
    }
  }
};

const item = {
  'Sale Amount': 'Ask Price',

  'Item Type': {
    0: 'Level Up Materials',
    1: 'Evolution Materials',
    2: 'Limit Break Materials',
    3: 'Weapon Materials',
    4: 'Others',
    10: 'Event Materials',
  },

  'Item Category Event': 'Items from event {event}',
  'Item Category': {
    0: 'Small Seeds',
    1: 'Seeds',
    2: 'Large Seeds',
    3: 'Sprout',
    4: 'Star Flowers by titles',

    100: 'Small Evolution Beads',
    101: 'Evolution Beads',
    102: 'Large Evolution Beads',
    103: 'Extra Large Evolution Beads',
    104: 'Super Evolution Beads',
    112: 'Bronze Statues',
    113: 'Silver Statues',
    114: 'Golden Statues',
    124: 'Super Evolution Beads by titles',

    202: 'Buds',
    203: 'Fruits',
    204: 'Star Crystals',
    214: 'Star Crystals by titles',

    300: 'Symbols',
    301: 'Crests',
    311: 'Weapon Materials in Chapter 1',
    312: 'Weapon Materials in Chapter 2',
    313: 'Weapon Materials in Chapter 3',
    314: 'Weapon Materials in Chapter 4',
    315: 'Weapon Materials in Chapter 5',
    316: 'Weapon Materials in Chapter 6',
    317: 'Weapon Materials in Chapter 7',
    318: 'Weapon Materials in Chapter 8',

    404: 'Special',
    405: 'Summon Tickets',
    406: 'Exchange Items',
    407: 'Stamina Recovery Items',
    408: 'Etoilium',
    409: 'Chance Up Key Holder',
    410: 'Skill Up Powder',
  },
};

const weapon = {
  'Star 5 Special Weapon': '★5 {0}\'s Special {1}',
};

const master = {
  'Master Skill Type': '{class}\'s Orb',
};

const quest = {
  'Section': 'Section {0}',

  'Quest Library Categories': {
    0: 'Main Quests',
    1: 'Event Quests',
    2: 'Writer Quests',
    3: 'Daily Quests',
    4: 'Challenge Quests',
    5: 'Memorial Quests',
    6: 'Craft Quests',
  },
};

const scenario = {
  'Scenario Library Categories': {
    5: 'Characters\' Scenario',
    1: 'Main Scenario',
    2: 'Event Scenario',
    3: 'Writers\' Scenario',
  },
};

const title = {};

const enemy = {
  'AI Conditions': {
    num: 'This condition was executed less than {num} times',
    0: 'Self\'s HP in range {min}% ~ {max}%',
    1: {
      0: [
        'Number of enemies with {abnormal} {op} {num}',
        'Number of enemies without {abnormal} {op} {num}',
      ],
      1: [
        'Number of other enemies with {abnormal} {op} {num}',
        'Number of other enemies without {abnormal} {op} {num}',
      ],
      2: [
        'Self with {abnormal}',
        'Self without {abnormal}',
      ],
    },
    2: {
      0: [
        'Number of enemies with {statusChange} {op} {num}',
        'Number of enemies without {statusChange} {op} {num}',
      ],
      1: [
        'Number of other enemies with {statusChange} {op} {num}',
        'Number of other enemies without {statusChange} {op} {num}',
      ],
      2: [
        'Self with {statusChange}',
        'Self without {statusChange}',
      ],
    },
    3: 'Self\'s charge count {op} {num}',
    21: 'Number of enemies {op} {num}',
    42: 'Number of crea-mates {op} {num}',
    43: [
      'Number of crea-mates with {abnormal} {op} {num}',
      'Number of crea-mates without {abnormal} {op} {num}',
    ],
    44: 'Every time when normal attacks used for {num} times',
    45: 'Every time when skills used for {num} times',
    46: 'Every time when totteoki used for {num} times',
    47: 'Every time when character changed for {num} times',
    48: 'Number of crea-mates of {extra} {class} {op} {num}',
    49: 'Number of crea-mates with {statusChange} {op} {num}',
    68: {
      0: 'Self\'s switch {num} is on',
      1: 'Self\'s switch {num} is off',
    },
  },

  'AI Condition Status Changes': {
    0: 'ATK up',
    1: 'MAT up',
    2: 'DEF up',
    3: 'MDF up',
    4: 'SPD up',
    5: 'LUK up',
    6: 'ATK down',
    7: 'MAT down',
    8: 'DEF down',
    9: 'MDF down',
    10: 'SPD down',
    11: 'LUK down',
    12: 'status up',
    13: 'status down',
  },

  'AI Condition Ops': {
    0: '≥',
    1: '≤',
    2: '=',
  },

  'AI Flags': {
    0: 'Turn on self\'s switch {num}',
    1: 'Turn off self\'s switch {num}',
  },

  'AI Single Condition': 'Target selection: {target} in {sign} priority ({power})',
  'AI Single Condition Signs': {
    '-1': 'low',
    1: 'high',
  },
  'AI Single Conditions': {
    0: 'Targets whose HP < 20%',
    1: '{element} targets',
    2: '{class}s',
    3: [
      'Targets with {abnormal}',
      'Targets without {abnormal}',
    ],
    4: 'Targets of weak element',
    5: 'Targets with {statusChange}',
    6: 'Self',
  },
};

const roomObject = {
  'Buy Amount': 'Bid Price',
  'Sell Amount': 'Ask Price',

  'Search Points Hint': 'The position where the character can act or talk around the room object.',
  'Room Object Action Conditions': {
    0: 'All characters',
    1: 'Limited character cards',
    2: 'Limited characters',
    3: 'Limited title',
  },

  'Room Object Categories': {
    0: 'Desk',
    1: 'Chair',
    2: 'Storage',
    3: 'Bedding',
    4: 'Appliances',
    5: 'Goods',
    6: 'Hobby',
    7: 'Wall Decoration',
    8: 'Carpet',
    9: 'Screen',
    10: 'Floor',
    11: 'Wall',
    12: 'Background',
  },
};

const help = {
  'Page Helps': {
    'Room Object': 'Special thanks to Kousuke (コースケ) for helping to analyze data of room objects. Contact us if you have any questions or advice about room objects.',
  },
};

const navigation = {
  'Calculator': { Title: 'Calculator', Subtitle: 'Data and values computing' },
  'Assets': { Title: 'Assets Browser', Subtitle: 'View & download illusts and voices' },
  'Card Maker': { Title: 'Card Maker', Subtitle: 'A tool for DIY cards' },
  'Yarudesu': { Title: 'Kirarafan (Yarudesu)', Subtitle: 'A Japanese KiraFan forum' },
  'Wikiwiki': { Title: 'Wikiwiki JP', Subtitle: 'A Japanese KiraFan Wiki' },
  'Moegirl': { Title: 'MoeGirl', Subtitle: 'A Chinese KiraFan Wiki' },
  'Miraheze': { Title: 'Miraheze', Subtitle: 'An English KiraFan Wiki' },
  'Timers': { Title: 'Timer', Subtitle: 'Event calendar and countdown' },
};

const settings = {
  'Character Show Max Status': 'Show max status in list',
  'Character Show Max Status Hint': 'Excluding awaken bonus',
  'Character Talent Show Luck': 'Show Luck in talent',
  'Character Icon Framed': 'Use framed icon',
  'Quest Drops Grouped': 'Show drops by number of groups',
  'App Title Show ID': 'Show ID in app title',
  'Enemy AI Pattern': 'Show enemy AI pattern',
  'Advanced Filter': 'Advanced filter',
  'Database Fetch Time': 'Database fetch time',
  'Reload Database': 'Reload database',
  'Reload Application': 'Reload application',
  'Always Show Japanese': 'Always show Japanese',
  'Package Fetch Time': 'Package fetch time',
  'Reload Language Package': 'Reload English translation package',
  'Help Translate Names': 'Help translate names',

  'Show Clea On Start': 'Clea\'s Live2D',
  'Show Clea On Start Hint': 'High energy consumption',
  'Show Clea In Detail Page': 'Permanent in detail page',
  'Show Clea In Detail Page Hint': 'Clea-chan KAWAII ( ´▽｀)',

  'Themes': {
    0: 'Red',
    1: 'Blue',
    2: 'Orange',
    3: 'Green',
    4: 'Purple',
    5: 'Yellow',
    6: 'Pink',
    7: 'Dynamic',
  },

  'Updated': {
    'Database': 'Database updated',
    'Application': 'Application updated',
  },
};

const clea = {
  'Clea Conversation': {
    'TalkGroupA':
      [
        '元気が出ない時は、声を出すといいですよ。えいえい、おー！',
        'みなさんを召喚するために必要な\n『鍵』の管理を任せていただいています。',
        'ポルカとコルクちゃんは、\nわたしの大切なお友達です。',
        '元気が出ない時は、声を出すといいですよ。\nえいえい、おー！'
      ]
  }
};

module.exports = Object.assign({},
  common, home,
  character, weapon, quest, enemy, master,
  item, roomObject,
  scenario, title, named,
  skill, help, navigation, settings,
  clea);
