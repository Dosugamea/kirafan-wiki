<template lang="pug">
  .pa-4(v-if="!item")
    KeyValue(:k="$t('No Item')")

  div(v-else)
    .hidden-sm-and-up
      p.display.px-4.primary--text {{item.m_Name}}
    
    div(:style="{'min-height': $size(64) + 16 + 'px'}")
      .float-right.px-4
        a(:href="$asset.roomobjecticon.format(categoryName, item.m_ID)+'.png'", target="_blank")
          v-avatar(:size="$size(64)", :key="`room-object-icon-${id}`")
            v-img(:src="$asset.roomobjecticon.format(categoryName, item.m_ID)+'.jpg'")
      .hidden-xs-only
        p.display.px-4.primary--text {{item.m_Name}}
      p.px-4 {{item.m_Description.replace(/\n/g, '')}}
          

    .d-flex.px-4
      KeyValue.pr-2(:k="$t('Change Night')", v-if="item.m_changeNight")
      KeyValue.pr-2(:k="$t('Non-Reverse')", v-if="item.m_nonReverce")

    .mb-4.px-4
      KeyValue(:k="$t('Size')", :v="`${item.m_SizeX}×${item.m_SizeY}`", width="33%")
      KeyValue(:k="$t('Buy Amount')", :v="item.m_BuyAmount", width="33%")
      KeyValue(:k="$t('Sell Amount')", :v="item.m_SellAmount", width="33%")
      KeyValue(:k="$t('Max Num')", :v="item.m_MaxNum", width="33%")

    v-divider
    Ad(:key="`roomobject-ad-${id}`")

    v-divider.mb-4
    Action(:id="id")
    p.title.px-4.primary--text {{$t('Search Points')}}
    p.px-4
      v-icon mdi-square
      span.pl-1 {{$t('Room Objects')}}
      br
      v-icon(color="primary") mdi-square-outline
      span.pl-1 {{$t('Search Points')}}
    p.px-4: small {{$t('Search Points Hint')}}

    v-divider.mb-4
    p.title.px-4.primary--text {{$t('Character Action')}}
    .mb-4.px-4
      KeyValue(:k="$t('No Character Action')", v-if="item.m_FilterName.indexOf('キャラアクションあり')==-1")
      KeyValue(:k="$t('Condition')", :v="$t(`Room Object Action Conditions.${item.m_ConditionCategory}`)", width="33%", v-else)

    Scroller.pt-4(:icon="$size(64)", v-if="item.m_ConditionCategory==1")
      .ml-4(v-for="characterID in item.m_ConditionParams.filter(id=>id%10==0)", :key="`room-object-condition-1-${characterID}`", :style="{width: $size(64)+'px'}")
        router-link(:to="`/character/${characterID}`")
          CharaIcon(:id="characterID", :size="$size(64)")
          .caption.text-center.two-lines {{characterName(characterID)}}
      .pl-4

    Scroller.pt-4(:icon="$size(64)", v-if="item.m_ConditionCategory==2")
      .ml-4(v-for="namedType in item.m_ConditionParams", :key="`room-object-condition-2-${namedType}`", :style="{width: $size(64)+'px'}")
        router-link(:to="`/named/${namedType}`")
          CharaIcon(named, :id="namedType", :size="$size(64)")
          .caption.text-center.two-lines {{namedName(namedType)}}
      .pl-4
    
    Scroller.pt-4(:icon="$size(64)", v-if="item.m_ConditionCategory==3")
      .ml-4(v-for="named in titleNames(item.m_ConditionParams[0])", :key="`room-object-condition-3-${named.m_NamedType}`", :style="{width: $size(64)+'px'}")
        router-link(:to="`/named/${named.m_NamedType}`")
          CharaIcon(named, :id="named.m_NamedType", :size="$size(64)")
          .caption.text-center.two-lines {{named.fullName}}
      .pl-4

    v-divider.mb-4
    p.title.px-4.primary--text {{$t('Character Tweets')}}
    .mb-4.px-4
      KeyValue(:k="$t('No Character Tweets')", v-if="tweets.length==0")
      v-row(v-else)
        v-col(v-for="tweet in tweets", :key="`room-object-tweet-${tweet.m_NamedType}`", cols=12, md=6)
          .d-flex
            router-link(:to="`/named/${tweet.m_NamedType}`")
              CharaIcon.mr-2(:id="primaryCharacterID(tweet.m_NamedType)", size=56, :frame="false")
            Voice.mr-2(:name="name(tweet.m_NamedType)", :cue="`${tweet.m_VoiceCueName}_0`")
            .d-flex.justify-center.flex-column
              .small(v-html="tweet.m_Text.replace(/\\n/g, '<br>')", style="white-space: nowrap; text-overflow: ellipsis")
    
    v-divider.mb-4
    p.title.px-4.primary--text {{$t('Page Help')}}
    p.px-4(v-html="$t('Page Helps.Room Object')")
    Credit(name="コースケ")

</template>

<script>
import Action from './Action';
import define from '@/define';

export default {
  name: 'RoomObject',
  props: ['id'],
  components: { Action },
  computed: {
    item() {
      return this.$store.state.$db.RoomObjectList[this.id];
    },
    tweetID() {
      return this.item.m_ObjEventArgs[1];
    },
    tweets() {
      return this.$store.state.$db.TweetList.filter(tweet => tweet.m_ID == this.tweetID);
    },
    categoryName() {
      return define.roomIDtoStr[this.item.m_Category];
    },
  },
  methods: {
    name(namedType) {
      return this.$store.state.$db.NamedList[namedType].m_ResouceBaseName;
    },
    primaryCharacterID(namedType) {
      return this.$store.state.$db.NamedList[namedType].primaryCharacterID;
    },
    characterName(characterID) {
      return this.$name(this.$store.state.$db.CharacterList[characterID].m_Name);
    },
    namedName(namedType) {
      return this.$name(this.$store.state.$db.NamedList[namedType].fullName);
    },
    titleNames(titleType) {
      return this.$store.state.$db.NamedListArray.filter(named => named.m_TitleType == titleType);
    }
  }
};
</script>