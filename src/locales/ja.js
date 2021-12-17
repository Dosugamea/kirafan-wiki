const common = {
  'Common': '一般',

  'Back': '戻る',
  'Cancel': 'キャンセル',

  'Select All': 'すべてを選択',
  'Select Reverse': '選択範囲を反転',

  'All': 'すべて',

  'Rare': 'レア',
  'Star 3': ' ★3 ',
  'Star 4': ' ★4 ',
  'Star 5': ' ★5 ',
  'Rares': {
    2: ' ★3 ',
    3: ' ★4 ',
    4: ' ★5 ',
  },

  'Class': 'クラス',
  'Fighter': 'せんし',
  'Magician': 'まほうつかい',
  'Priest': 'そうりょ',
  'Knight': 'ナイト',
  'Alchemist': 'アルケミスト',
  'Classes': {
    '-1': 'デフォルト',
    0: 'せんし',
    1: 'まほうつかい',
    2: 'そうりょ',
    3: 'ナイト',
    4: 'アルケミスト',
  },

  'Element': '属性',
  'Fire': '炎',
  'Water': '水',
  'Earth': '土',
  'Wind': '風',
  'Moon': '月',
  'Sun': '陽',
  'Elements': {
    '-1': 'デフォルト',
    0: '炎',
    1: '水',
    2: '土',
    3: '風',
    4: '月',
    5: '陽',
  },

  'Abnormal': '状態異常',
  'Abnormals': {
    'All': 'すべての状態異常',
    0: '混乱',
    1: '金縛り',
    2: '腹ぺこ',
    3: '弱気',
    4: '眠り',
    5: '不幸',
    6: '沈黙',
    7: '孤立',
  },

  'Status': 'ステータス',
  'Statuses': {
    'All': 'すべてのステータス',
    0: ' ATK ',
    1: ' MAT ',
    2: ' DEF ',
    3: ' MDF ',
    4: ' SPD ',
    5: ' LUK ',
  },

  'Default': 'デフォルト',

  'comma': '、',
  'dot': '。',
  'divider': '・',

  'Condition': '条件',
  'Probability': '確率',
  'Filter': 'フィルター',
  'Input': {
    'Filter': 'フィルターを入力..',
  },
  'Sort': 'ソート',
  'Reverse': '逆順',


  'WIP': '作業中'
};

const home = {
  'Home': 'ホーム',
  'KiraFan.Moe': 'KiraFan.Moe',
  'KiraFan Wiki': 'きらファン解析 Wiki',
  'Day Count': 'きららファンタジアリリースからの {0} 日目',

  'Version': 'バージョン',
  'Version Info': '当バージョン解析 Wiki はメディアが『聖典』を模写したものです',

  'Events': 'イベント',
  'Summon': '召喚',
  'Summon 10 Times': '10 回召喚',
};

const chatacter = {
  'Characters': 'キャラクター',
  'Character': 'キャラクター',
  'No Character': 'キャラクターはありません',

  'Obtainability': '入手方法',
  'Normal': '普通',
  'Distributed Weaken': '配布-',
  'Distributed': '配布',
  'Period Limited': '期間限定',
  'Year': '年',

  'Level': 'レベル',
  'Arousal': '覚醒',
  'Facilities': '施設',
  'Friendship': '仲良し度',
  'Title Facility': '作品施設',
  'Class Facility': 'クラス訓練所',
  'Orb': 'オーブ',

  'Illust': 'イラスト',
  'Weapons': '武器',
  'Flavor Text': '召喚セリフ',
  'Creamate Commu Text': 'クリエメイトコミュセリフ',
  'Achievements': '称号',

  'Related Characters': '関連するキャラクター',
  'Same Rare Class Element': '同じく{rare}{element}属性の{class}たち',
  'Same Event': '{event}イベントで大活躍',
  'Same Named': '{name}のほかのカード',
};

const named = {
  'Names': 'キャラクター',
  'Named': 'キャラクター',
  'No Named': 'キャラクターはありません',

  'Profile': 'プロフィール',
  'Nick Name': 'ニックネーム',
  'Full Name': 'フルネーム',
  'Gift Type': 'お土産タイプ',
  'Gift Types': {
    1000: '強化素材',
    2000: '武器強化素材',
    3000: 'コイン',
  },

  'Voice': 'ボイス',
  'CV': ' CV ',
  'Character Voice Type': {
    0: 'システム',
    1: 'シナリオ',
    2: '里',
    3: 'バトル',
    4: 'カード',
  },
  'Character Voice Category': {
    '000': 'タイトルコール',
    '001': '起動時挨拶・共通',
    '002': '起動時挨拶・朝',
    '003': '起動時挨拶・夜',
    '006': '強化',
    '008': '進化',
    '009': 'トレーニング出発',
    '010': 'トレーニング完了',
    '012': 'ミッション',
    '013': 'ミッション完了',

    '400': 'クエスト出発',
    '401': 'バトル開始時',
    '403': 'サクッと攻撃',
    '405': 'ガッキリ攻撃',
    '406': '攻撃スキル',
    '409': '補助スキル',
    '411': '応援スキル',
    '412': 'とっておき発動',
    '413': 'ダメージ',
    '415': '状態異常',
    '416': '戦闘不能',
    '417': 'バトル勝利',
    '419': 'バトル敗北',
    '420': 'タッチボイス',

    'Room1': 'ルーム会話１',
    'Room2': 'ルーム会話２',
    'RoomAction': 'ルームアクション',
    'Town1': '里訪問１',
    'Town2': '里訪問２',
    'TownAction': '里アクション',
    'Home': 'ホーム画面会話',

    'Default': 'デフォルト',
  },
  'Hint:Download audio files directly': '直接音声ファイルをダウンロードしています<br>この処理には時間がかかります',
  'failed download audio data': '音声データのダウンロードに失敗しました',

  'Talent': 'タレント',
  'Adv Standpic': 'シナリオ立ち絵',

  'Related Names': '関連するキャラクター',
  'Same Title': '『{title}』より',
  'Same CV': '{name}さんのキャラクター',
  'Cross Adv': 'クロスシナリオに登場した仲間',

  'Original Character': 'オリジナルキャラクター',
  'Illustrator': 'イラスト',
};

const skill = {
  Skills: 'スキル',
  Skill: 'スキル',
  'Skill Name': 'スキル名',
  Load: '硬直',
  Recast: 'ﾘｷｬｽﾄ',
  Charge: 'ﾁｬｰｼﾞ',
  Level: 'レベル',
  'Stun Gauge': 'スタンゲージ',

  'Passive Skill': '自動発動スキル',
  'No Skill': 'スキルはありません',
  'No Passive Skill': '自動発動スキルはありません',

  'Skill Selector': 'スキルセレクター',

  'Skill Target': 'ターゲット',
  'Skill Targets': {
    0: '自身',
    1: '敵単体',
    2: '敵全体',
    3: '味方単体',
    4: '味方全体',
  },

  'Skill Damage Types': {
    0: '物理',
    1: '魔法',
  },

  'Skill Signs': {
    '-1': 'ダウン',
    0: '変化',
    1: 'アップ',
  },

  'Skill Signs2': {
    0: 'ダウン',
    1: 'アップ',
  },

  'Skill Verbs': {
    '-1': '減らす',
    0: '変化',
    1: '増やす',
  },

  'Skill Turn Types': {
    0: 'ラウンド',
    1: 'ターン',
  },

  'Skill Type': 'スキルタイプ',
  'Skill Types': {
    0: '攻撃',
    1: '回復',
    2: 'ステータス変化',
    3: 'ステータス変化リセット',
    4: '状態異常',
    5: '状態異常回復',
    6: '状態異常無効',
    7: '状態異常付与確率補正',
    8: '属性耐性',
    9: '属性変化',
    10: '有利属性ボーナス',
    11: '次回の攻撃威力アップ',
    12: '次回の攻撃絶対クリティカル',
    13: 'バリア',
    14: 'リキャスト変化',
    15: 'きららジャンプゲージ量変化',
    16: 'きららジャンプゲージ倍率変化',
    17: '行動順変化',
    18: 'ヘイト変化',
    19: 'チャージ変化',
    20: 'チェイン倍率変化',
    21: 'スキルカード',
    22: 'スタン回復',
    23: 'リカバリー',
    24: '何もしない',
    25: 'スキル負荷軽減',
    26: 'クリティカルダメージ量変化',
    27: '自分自身ダメージ',
    28: 'ランダムステータス変化',
    29: '被ダメージ時きららジャンプゲージ量上昇',
    30: 'ステータス変化無効',
  },

  'Skill Detail': '説明',
  'Skill Details': {
    0: '{target}に{damageType}の{amount}ダメージ ({power})',
    1: '{target}を{amount}回復 ({power})',
    2: '{target}の{status}が {turn} {turnType}{amount}{sign} ({power})',
    3: '{target}の{status}{sign}をリセット',
    4: '{target}に{amount}{abnormal}を付与 ({power})',
    5: '{target}の{abnormal}を解除',
    6: '{target}の状態異常を {turn} {turnType}無効化',
    7: '{target}の状態異常抵抗率が {turn} {turnType}{sign} ({power})',
    8: '{target}の{element}耐性が {turn} {turnType}{amount}{sign} ({power})',
    9: '{target}が{element}属性になる',
    10: '{target}の有利属性へのダメージが {turn} {turnType}アップ ({power})',
    11: '{target}の{damageType}攻撃が一度だけ{amount}アップ ({power})',
    12: '{target}の攻撃が一度だけクリティカルになる',
    13: '{target}に {turn} 回だけ攻撃を{amount} ({power}) カットするバリアを張る',
    14: '{target}のリキャストを{amount}{verb} ({power})',
    15: 'とっておきゲージを{amount}{verb} ({power})',
    16: 'きららジャンプゲージ倍率変化',
    17: '行動順変化',
    18: '{target}の狙われやすさが {turn} {turnType}{amount}{sign} ({power})',
    19: '{target}のチャージカウントを{verb} ({power})',
    20: 'チェイン倍率変化',
    21: '「{extra}」のスキルカードを {turn} 枚設置',
    22: 'スタン回復',
    23: '{target}に {turn} ターンのリカバリーを付与 ({power})',
    24: '何もしない',
    25: '{target}に {turn} {turnType}クイックドロウを付与 (-{power}) <small><br>スキル硬直がダウン</small>',
    26: '{target}のクリティカル時ダメージが {turn} {turnType}{amount}{sign} ({power})',
    27: '{target}の HP が減少する ({power})',
    28: '{target}のステータスのいずれかが {turn} {turnType}{sign}',
    29: '{target}に {turn} {turnType}我慢を付与 ({power}) <small><br>ダメージを受けるたびとっておきゲージを増やす</small>',
    30: '{target}のステータス{sign}を {turn} {turnType}無効化',
  },

  'Skill Amount': '量',
  'Skill Amount Sign': '{amount}{sign}',
  'Skill Amounts': {
    0: {
      0: '特殊',
      1: '小',
      2: '中',
      '3-': '大',
      3: '大',
      4: '特大',
      5: '超特大',
    },
    1: { 1: '小', 2: '中', 3: '大', 4: '特大' },
    2: { 1: '小', 2: '中', 3: '大', 4: '特大' },
    4: { 1: '低確率で', 2: '中確率で', 3: '高確率で', 4: '' },
    8: { 1: '小', 2: '中', 3: '大' },
    11: { 1: '小', 2: '中', 3: '大', 4: '特大' },
    13: { 1: 'すこし', 2: '', 3: '大きく', 4: '完全' },
    14: { 1: 'すこし', 2: '', 3: 'かなり' },
    15: { 1: 'すこし', 2: '', 3: 'かなり' },
    18: { 1: '小', 2: '中', 3: '大' },
    26: { 1: '小', 2: '中', 3: '大' },
  },

  'Skill Powers': {
    0: {
      0: '{power}%',
      1: '{power}%・状態異常中の目標には {power2}%',
      2: '{power}% 最大 HP',
      3: '{power}% 現在 HP',
      4: '{power} 点',
      5: '{powerA}%・{powerB}%・{powerC}%',
      100: '{power}%・{abnormal}中の目標には {power2}%',
    },
    27: {
      0: '{power}% 最大 HP',
      1: '{power}% 現在 HP',
      2: '{power} 点',
    },
    28: {
      Power: '{prob}%: {power}',
      'Status Change': '{status}{amount}{sign} ({power})',
    },
  },

  'Passive Triggers': {
    0: '',
    1: '自身が攻撃を受けるたび',
    2: '自身が敵を倒すたび',
  },

  'Passive Details': {
    0: '自身の{status}が{amount}{sign} ({power})',
    1: '自身の狙われやすさが{amount}{sign} ({power})',
    2: '自身が状態異常にならない',
    3: '自身がスタンにならない',
    4: '自身の攻撃のスタン量がアップ ({power}) <br><small>攻撃を受けた敵のスタンゲージの上昇量がアップ</small>',
    5: 'とっておきゲージを{amount}{verb} ({power})',
    6: '自身のとっておきゲージ係数が{sign} ({power}) <br><small>行動によるとっておきゲージの上昇量が変化</small>',
    7: '自身のクリティカル時ダメージが{amount}{sign} ({power})',
    8: '自身のスキルを変更',
    9: '自身の回復スキルが最大 HP を超える ({power})',
    10: '敵に与えたダメージに応じて自身を回復',
    11: '自身がリバイブできる ({power}) <br><small>HP が 0 になるダメージを受けた時 1 回だけ回復</small>',
    12: '自身のスキルカードの発動回数を{verb} ({power})',
    13: '自身は HP に応じて{status}が変化',
    14: '{target}の{status}が {turn} {turnType}{amount}{sign} ({power})',
    15: '自身が付与する{abnomal}の状態異常の付与率を増加 ({amount})',
    16: '自身に{element}属性耐性バフを付与 ({amount})',
    17: '自身が付与する{buffType}を{amount}ターン増加',
  },

  'Passive Powers': {
    10: {
      0: '通常攻撃',
      1: 'クラススキル',
      2: '武器スキル',
      3: 'とっておき',
    },
    11: {
      0: '{0}% HP',
      1: '{0} 点',
    },
    13: {
      'Status Change': '{status}{amount}{sign} ({power})',
    },
    17: {
      0: {
        1: 'ステータス変化効果のバフ',
        2: 'ステータス変化効果のデバフ',
      },
      1: '状態異常無効',
      // 2: 'ヘイト',
      3: 'ヘイト',
      4: 'リカバリー',
      5: 'クイックドロウ',
      6: 'クリティカルダメージ量変化',
      7: 'がまん',
    },
  },

  'Ability Tree Status Up': '自身の{status}を{amount}増加',
};

const item = {
  'Items': 'アイテム',
  'Item': 'アイテム',
  'No Item': 'アイテムはありません',

  'Type': 'タイプ',
  'Item Type': {
    0: '強化素材',
    1: '進化素材',
    2: '限界突破素材',
    3: '武器素材',
    4: 'その他',
    10: 'イベント素材',
  },

  'Category': 'カテゴリー',
  'Item Category Event': 'イベント「{event}」からのアイテム',
  'Item Category': {
    0: '小種',
    1: '種',
    2: '大種',
    3: '新芽',
    4: 'コンテンツ限定星華',

    100: '小進化珠',
    101: '進化珠',
    102: '大進化珠',
    103: '特大進化珠',
    104: '超進化珠',
    112: 'ブロンズスタチュー',
    113: 'シルバースタチュー',
    114: 'ゴールドスタチュー',
    124: 'コンテンツ限定超進化珠',

    202: 'つぼみ',
    203: '果実',
    204: '星結晶',
    214: 'コンテンツ限定星結晶',

    300: 'シンボル',
    301: 'クレスト',
    311: '1 章武器素材',
    312: '2 章武器素材',
    313: '3 章武器素材',
    314: '4 章武器素材',
    315: '5 章武器素材',
    316: '6 章武器素材',
    317: '7 章武器素材',
    318: '8 章武器素材',

    404: '特殊',
    405: '召喚チケット',
    406: '交換アイテム',
    407: 'スタミナ回復アイテム',
    408: 'エトワリウム',
    409: 'チャンスアップキーホルダー',
    410: 'スキルアップパウダー',
  },

  'From Event': 'イベント',
  'Experience': '経験値',
  'Sale Amount': '売却単価',
};

const weapon = {
  'Weapons': '武器',
  'Weapon': '武器',
  'No Weapon': '武器はありません',

  'Level': 'レベル',
  'Evolution': '進化',
  'Upgrade Bonus Material Items': '強化ボーナス素材',
  'Recipe': '作成に必要な素材',
  'Evolution Recipe': '進化に必要な素材',

  'Equipable Character': '装備できるキャラクター',
  'Star 5 Special Weapon': '★5{0}専用{1}',
};

const master = {
  'Master': 'きらら',
  'Stamina': 'スタミナ',
  'Battle Party Cost': 'バトルコスト',
  'Friend Limit': 'フレンド数',
  'Support Limit': 'サポート数',
  'Weapon Limit': '武器数',
  'Training Slot Num': 'トレーニング数',
  'Master Skills': 'きららのスキル',
  'Master Orb': 'きららオーブ',
  'Master Skill Type': '{class}のオーブ',
};

const quest = {
  'Quest Libraries': 'クエストライブラリー',
  'Quest Library': 'クエストライブラリー',
  'Quests': 'クエスト',
  'Quest': 'クエスト',
  'Section': '{0} 節',
  'No Quest': 'クエストはありません',

  'Quest Library Categories': {
    0: 'メインクエスト',
    1: 'イベントクエスト',
    2: '作家クエスト',
    3: '曜日クエスト',
    4: 'チャレンジクエスト',
    5: 'メモリアルクエスト',
    6: 'クラフトクエスト',
  },

  'Event Information': '情報',
  'Event Abstract': 'イベント概要',
  'Event Bonus': 'イベントボーナス',

  'Enemies': 'エネミー',
  'Drops': 'ドロップ',

  'User Exp': 'きらら経験値',
  'Character Exp': 'キャラクター経験値',
  'Friendship Exp': '仲良し度',
};

const scenario = {
  'Scenario Libraries': 'シナリオライブラリー',
  'Scenario Library': 'シナリオライブラリー',
  'Scenarios': 'シナリオ',
  'Scenario': 'シナリオ',
  'No Scenario': 'シナリオはありません',

  'Scenario Library Categories': {
    5: 'キャラクターシナリオ',
    1: 'メインシナリオ',
    2: 'イベントシナリオ',
    3: '作家シナリオ',
  },
  'Character Scenario': 'キャラクターシナリオ',
  'Cross Scenario': 'クロスシナリオ',
  'Memorial Scenario': 'メモリアルシナリオ',

  'Standpic': '立ち絵',
  'Pose': 'ポーズ',
  'Face': '顔',
};

const title = {
  'Titles': 'コンテンツ',
  'Title': 'コンテンツ',
  'No Title': 'コンテンツはありません',

  'Number of ★5': '★5 数',
  'Number of Characters': 'キャラクター数',

  'Non-Player Characters': 'NPC キャラクター',
  'Event Characters': 'イベントキャラクター',
};

const enemy = {
  'Enemy': 'エネミー',
  'No Enemy': 'エネミーはありません',
  'Resist Abnormals': '状態異常免疫',
  'AI ID': ' AI ID ',
  'Charge Max': 'チャージ上限',
  'Full Charge': 'フルチャージ',
  'Stun Coef': 'スタン係数',

  'AI Conditions': {
    num: 'この条件の実行回数が {num} 回未満',
    0: '自身の HP が {min}% から {max}% の範囲内',
    1: {
      0: [
        'エネミーに{abnormal}のある人数 {op} {num}',
        'エネミーに{abnormal}のない人数 {op} {num}',
      ],
      1: [
        '他のエネミーに{abnormal}のある人数 {op} {num}',
        '他のエネミーに{abnormal}のない人数 {op} {num}',
      ],
      2: [
        '自身に{abnormal}が存在',
        '自身に{abnormal}が存在しない',
      ],
    },
    2: {
      0: [
        'エネミーに{statusChange}のある人数 {op} {num}',
        'エネミーに{statusChange}のない人数 {op} {num}',
      ],
      1: [
        '他のエネミーに{statusChange}のある人数 {op} {num}',
        '他のエネミーに{statusChange}のない人数 {op} {num}',
      ],
      2: [
        '自身に{statusChange}が存在',
        '自身に{statusChange}が存在しない',
      ],
    },
    3: '自身のチャージカウント {op} {num}',
    21: 'エネミーの人数 {op} {num}',
    42: 'クリエメイトの人数 {op} {num}',
    43: [
      'クリエメイトに{abnormal}のある人数 {op} {num}',
      'クリエメイトに{abnormal}のない人数 {op} {num}',
    ],
    44: 'クリエメイトに通常攻撃の使用回数が {num} に達するたび',
    45: 'クリエメイトにスキルの使用回数が {num} に達するたび',
    46: 'クリエメイトにとっておきの使用回数が {num} に達するたび',
    47: 'クリエメイトにキャラ入替えの回数が {num} に達するたび',
    48: 'クリエメイトに{extra}{class}の人数 {op} {num}',
    49: 'クリエメイトに{statusChange}のある人数 {op} {num}',
    50: 'サポートを除くクリエメイトが倒れた人数 {op} {num}',
    68: {
      0: '自身のスイッチ {num} がオフ',
      1: '自身のスイッチ {num} がオン',
    },
  },

  'AI Condition Status Changes': {
    0: ' ATK アップ',
    1: ' MAT アップ',
    2: ' DEF アップ',
    3: ' MDF アップ',
    4: ' SPD アップ',
    5: ' LUK アップ',
    6: ' ATK ダウン',
    7: ' MAT ダウン',
    8: ' DEF ダウン',
    9: ' MDF ダウン',
    10: ' SPD ダウン',
    11: ' LUK ダウン',
    12: 'ステータスアップ',
    13: 'ステータスダウン',
  },

  'AI Condition Ops': {
    0: '≥',
    1: '≤',
    2: '=',
  },

  'AI Flags': {
    0: '自身のスイッチ {num} をオフにする',
    1: '自身のスイッチ {num} をオンにする',
  },

  'AI Single Condition': '目標選択：{target}は優先度が{sign} ({power})',
  'AI Single Condition Signs': {
    '-1': '低い',
    1: '高い',
  },
  'AI Single Conditions': {
    0: 'HP < 20% の目標',
    1: '{element}属性の目標',
    2: '{class}の目標',
    3: [
      '{abnormal}のある目標',
      '{abnormal}のない目標',
    ],
    4: '属性抜群の目標',
    5: '{statusChange}のある目標',
    6: '自身',
  },
};

const roomObject = {
  'Room Objects': '家具',
  'Room Object': '家具',

  'Change Night': 'ナイトモードあり',
  'Non-Reverse': '反転不可',

  'Size': 'サイズ',
  'Buy Amount': '購入単価',
  'Sell Amount': '売却単価',
  'Max Num': '最大所持数',

  'Search Points': 'キャラ反応位置',
  'Search Points Hint': 'キャラ反応位置とは、キャラクターが家具の周辺でアクションしたり喋ったりできる地点です。',
  'Character Action': 'キャラクターアクション',
  'No Character Action': 'キャラクターアクションはありません',
  'Character Tweets': 'キャラクターセリフ',
  'No Character Tweets': 'キャラクターセリフはありません',

  'Room Object Action Conditions': {
    0: '誰でも',
    1: 'キャラクターカード限定',
    2: 'キャラクター限定',
    3: '作品限定',
  },

  'Room Object Categories': {
    0: '机',
    1: '椅子',
    2: '収納',
    3: '寝具',
    4: '家電',
    5: '雑貨',
    6: 'ホビー',
    7: '壁飾り',
    8: '敷物',
    9: '衝立',
    10: '床',
    11: '壁',
    12: '背景',
  },
};

const townObject = {
  'Town Objects': '里施設',
  'Town Object': '里施設',

  'Schedule': 'スケジュール',
  'Text': 'テキスト',
};

const help = {
  'Page Help': 'ページヘルプ',
  'Page Helps': {
    'Room Object': '家具のデータを解析する際に協力してくれたコースケさんに感謝します。家具について質問やアドバイスがある場合は、遠慮せずに連絡してください。',
  },
};

const navigation = {
  'Navigation': 'ナビゲーション',
  'Collection': 'コレクション',

  'Battle': 'バトル',
  'Items': 'アイテム',
  'Library': 'ライブラリー',
  'Tools': 'ツール',
  'Links': 'リンク',
  'Others': 'その他',
  'Applications': 'きらファン解析アプリ',
  'External Links': '外部リンク',

  'Calculator': { Title: '計算機', Subtitle: '数値や確率を計算する' },
  'Assets': { Title: 'アセットブラウザ', Subtitle: 'イラストとボイスをダウンロード' },
  'Card Maker': { Title: 'カードメーカー', Subtitle: 'カード作りツール' },
  'Yarudesu': { Title: 'やるデース！速報', Subtitle: 'きらファン攻略まとめ BBS' },
  'Wikiwiki': { Title: 'きらファン完全攻略 Wiki', Subtitle: 'キャラ運用方法・攻略情報・武器評判など' },
  'Moegirl': { Title: '萌えっ娘', Subtitle: '中国語きらファン Wiki' },
  'Miraheze': { Title: 'Miraheze', Subtitle: '英語きらファン Wiki' },
  'Timers': { Title: 'タイマー', Subtitle: 'イベントカレンダーとカウントダウン' },
};

const settings = {
  Settings: '設定',

  'Character Show Max Status': 'リストで最大ステータスを表示',
  'Character Show Max Status Hint': '覚醒ボーナスは加算しない',
  'Set Max Frendship': '最大仲良し度の変更',
  'Download Audio Files Directly': '音声をきらファンサーバーからダウンロード',
  'Setting Hint:Download Audio Files Directly': '最新の音声が反映されますが時間がかかります',
  'Set Max Frendship Hint': '空欄で5',
  'Character Talent Show Luck': 'タレントの LUK を表示',
  'Character Icon Framed': 'アイコンの枠を表示',
  'Quest Drops Grouped': 'ドロップを「アイテム数×組数」で表示',
  'App Title Show ID': 'アプリタイトルで ID を表示',
  'Enemy AI Pattern': 'エネミーの AI パタンを表示',
  'Advanced Filter': '高級フィルター',
  Database: 'データベース',
  'Database Fetch Time': 'データベース取得時間',
  Hash: 'Hash',
  'Reload Database': 'データベースをリロードする',
  'Reload Application': 'アプリをリロードする',

  'Show Clea On Start': 'クレアの Live2D を有効にする',
  'Show Clea On Start Hint': 'エネルギー消費注意',
  'Show Clea In Detail Page': 'クレアを常設展示にする',
  'Show Clea In Detail Page Hint': 'クレアちゃん超カワイイ( ´▽｀)',

  Application: 'アプリ',
  Contact: '連絡',

  Themes: {
    0: 'レッド',
    1: 'ブルー',
    2: 'オレンジ',
    3: 'グリーン',
    4: 'パープル',
    5: 'イエロー',
    6: 'ピンク',
    7: 'ダイナミック',
  },

  Close: '閉じる',
  Refresh: '再読み込み',
  Updated: {
    Database: 'データベースアップデート完了',
    Application: 'アプリアップデート完了',
  },
};

const abilityTree = {
  AbilityTreeFruits: 'アビリティツリー',
  AbilityTreeFruit: 'ことわりの実',
  'Fruit Name': '名前',
};

const clea = {
  'Clea': 'クレア',

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
  chatacter, weapon, quest, enemy, master,
  item, roomObject, townObject,
  scenario, title, named,
  skill, help, navigation, settings,
  abilityTree,
  clea);
