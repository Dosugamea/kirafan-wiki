import { CleaPlayer, CleaLive2DManager } from './lib/cleaplayer';
import { DialogManagerInstance, DialogContextPriority } from './dialogmanager.js';
import { CleaData } from './cleadata';
// import i18n from '@/i18n';

const DebugEnable = true;
const InteractionCoolDownInMilli = 2000; // 點擊的冷卻時間
const FriendshipIncreaseIntervalInMilli = 60 * 1000; // 根據時間而增加friendship

export const MotionPriority = {
  None: 0,
  Idle: 1,
  Normal: 2,
  Force: 3,
};

export class CleaManager {

  constructor() {
    CleaPlayer.getInstance();
  }

  async onCreate() {
    await CleaData.load();
    if (CleaData.init) {
      this.init();
    }
    this.processFirstMeetOfDay();
    CleaData.lastMet = new Date().toDateString();

    setInterval(() => {
      if (CleaData.friendship >= 0) {
        CleaData.friendship += 1;
      }
      this.sayHello();
    }, FriendshipIncreaseIntervalInMilli);

    if (DebugEnable) {
      window.CleaData = CleaData;
    }
  }

  onDestroy() {
    CleaData.save();
  }

  onTouchClea(part) {
    if (this.isInteractInCoolDown()) {
      return;
    }

    switch (part) {
      case 'head':
        CleaData.headTouchedTime += 1;
        CleaLive2DManager.getInstance().getClea().startRandomMotion('Head', MotionPriority.Normal);
        DialogManagerInstance.pushDialog(selectCleaTalk(), null, DialogContextPriority.Force);
        break;
      case 'face':
        CleaData.faceTouchedTime += 1;
        DialogManagerInstance.pushDialog(selectCleaTalk(), null, DialogContextPriority.Force);
        break;
      case 'oppai':
        CleaData.breastTouchedTime += 1;
        CleaLive2DManager.getInstance().getClea().startRandomMotion('Shy', MotionPriority.Normal);
        DialogManagerInstance.pushDialog('恥ずかしいです', null, DialogContextPriority.Idle);
        break;
      case 'body':
        CleaData.bodyTouchedTime += 1;
        DialogManagerInstance.pushDialog(selectCleaTalk(), null, DialogContextPriority.Force);
        // DialogManagerInstance.pushDialog(randomInArray(i18n.t('Clea Conversation.TalkGroupA')),null,DialogContextPriority.Idle);
        break;
      default:
        break;

    }
  }

  isInteractInCoolDown() {
    const timeNow = Date.now();
    if ((timeNow - CleaData.lastInteractInMilli) < InteractionCoolDownInMilli) {
      return true;
    }
    CleaData.lastInteractInMilli = timeNow;
    return false;
  }


  init() {
    // window.vue.$s.cleaSettingsEnable = true;
    // DialogManagerInstance.pushDialog('[ShowOnStart]', ['[Yes]','[No]'], DialogContextPriority.Normal,false,null, (c) => (window.vue.$s.showCleaOnStart=c==0));
    // DialogManagerInstance.pushDialog('[ShowOnDetail]', ['[Yes]', '[No]'], DialogContextPriority.Normal, false, null, (c) => (window.vue.$s.showCleaInDetailPage=c==0));
    CleaData.init = false;
  }

  sayHello() {
    let current = new Date();
    const h = current.getHours(); // 0~23
    if (h >= 18 || h < 6) { // 18:00  ~ 05:59
      DialogManagerInstance.pushDialog(selectCleaTalk('起動時挨拶・夜'), null, DialogContextPriority.Idle);
      // DialogManagerInstance.pushDialog('[Hello_Night]', null, DialogContextPriority.Normal);
    }
    // else if (h < 11) { // 06:00 ~ 10:59
    //   DialogManagerInstance.pushDialog('[Hello_Morning]', null, DialogContextPriority.Normal);
    // } else if (h < 14) { // 11:00 ~ 13:59
    //   DialogManagerInstance.pushDialog('[Hello_Noon]', null, DialogContextPriority.Normal);
    // } else if (h < 18) { // 14:00 ~ 17:59
    //   DialogManagerInstance.pushDialog('[Hello_Afternoon]', null, DialogContextPriority.Normal);
    // }
    else {
      DialogManagerInstance.pushDialog(selectCleaTalk('起動時挨拶・朝'), null, DialogContextPriority.Idle);
    }
  }

  processFirstMeetOfDay() {
    if (CleaData.daysBetweenLastMet < 2) {
      DialogManagerInstance.pushDialog(selectCleaTalk('タイトルコール'), null, DialogContextPriority.Idle);
    } else {
      DialogManagerInstance.pushDialog(selectCleaTalk(null, null, '久しぶりですね'), null, DialogContextPriority.Idle);
    }
    CleaData.dayMetTotal += 1;
    this.processAnniversary();
  }

  processAnniversary() {
    let now = new Date();
    let kirafan_anniversary = new Date(now.getUTCFullYear() + '-12-11T00:00:00+09:00'); // JST
    let newYear = new Date(now.getFullYear() + '-01-01T00:00:00'); // local tz

    let countdown = daysBetween(now, kirafan_anniversary);
    if (kirafan_anniversary <= now && now < kirafan_anniversary.getTime() + 86400000) {
      DialogManagerInstance.pushDialog(selectCleaTalk(null, null, '今日はきららファンタジア' + (now.getFullYear() - 2017) + '周年いつもありがとうございます！'), null, DialogContextPriority.Normal);
    }
    else if (newYear <= now && now < newYear.getTime() + 86400000) {
      DialogManagerInstance.pushDialog(selectCleaTalk(null, null, 'あけましておめでとうございます、今年もよろしくお願いします！'), null, DialogContextPriority.Normal);
    }
    else if (now < kirafan_anniversary && countdown < 6) {
      DialogManagerInstance.pushDialog(selectCleaTalk(null, null, 'きららファンタジア' + (now.getFullYear() - 2017) + '周年あと' + (countdown+1) + '日'), null, DialogContextPriority.Normal);
    }
  }
}

function daysBetween(first, second) {
  const one_day_ms = 86400000; // 1 day in ms => 1000 * 60 * 60 * 24
  let between_ms = Math.abs(new Date(second) - new Date(first));
  return Math.floor(between_ms / one_day_ms);
}
// function randomInArray(arr) {
//   if (!Array.isArray(arr)) return '';
//   return arr[Math.floor(Math.random() * Math.floor(arr.length))];
// }

/**
 * get clea talk content and play audio if sound file is exists.
 * @param {string|null} name Specified name
 * @param {string|null} type Specified type
 * @param {string|null} content Specified content
 * @returns {string} chat contant
 */
function selectCleaTalk(name = null, type = null, content = null) {
  const h = new Date().getHours();
  let exclude_name; // exclude
  if (h >= 18 || h < 6) exclude_name = '起動時挨拶・朝';
  else exclude_name = '起動時挨拶・夜';
  let talk = CleaData.talkData.filter(talk => talk.name !== exclude_name);

  if (content) {
    // TODO: check voice?
    return content;
  }
  else if (name) {
    for (let i = 0; i < talk.length; i++) {
      if (name === talk[i].name) {
        let j = Math.floor(Math.random() * Math.floor(talk[i].contents.length));
        let content = talk[i].contents[j];
        // TODO: content.voice?
        return content.text;
      }
    }
  }
  else if (type) {
    let contants = [];
    for (let i = 0; i < talk.length; i++) {
      if (type === talk[i].type)
        contants.concat(talk[i].contants);
    }
    let j = Math.floor(Math.random() * Math.floor(contants)); // contants random
    let content = contants[j];
    // TODO: content.voice?
    return content.text;
  }
  else {
    let i = Math.floor(Math.random() * Math.floor(talk.length)); // talk random
    let j = Math.floor(Math.random() * Math.floor(talk[i].contents.length)); // contants random
    let content = talk[i].contents[j];
    // TODO: content.voice?
    return content.text;
  }

  return '(ˇωˇ)<Zzz';
}


export const CleaManagerInstance = new CleaManager();
