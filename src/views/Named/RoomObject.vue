<template lang="pug">
span
  v-divider.mb-4

  p.px-4.title.primary--text {{ $t('Room Objects') }}

  v-row
    v-col(
      v-for="l in list",
      :key="`room-object-tweet-${l[0].m_DBAccessID}`",
      cols=12,
      md=6
    )
      .d-flex
        //- router-link(:to="`/named/${l[].m_NamedType}`")
        //-     CharaIcon.mr-2(
        //-     :id="primaryCharacterID(tweet.m_NamedType)",
        //-     size=56,
        //-     :frame="false"
        //-     )
        router-link(:to="`/roomobject/${l[0].m_DBAccessID}`")
          //- div(:style="{'min-height': $size(64) + 16 + 'px'}")/
          .float-right.px-4
            //- a(:href="$asset.roomobjecticon.format(categoryName(l[0].m_Category), item.m_ID)+'.png'", target="_blank")
            v-avatar(:size="$size() * 1.2", :key="`room-object-icon-${l[0].m_DBAccessID + 1}`")
              v-img(
                :src="$asset.roomobjecticon.format(categoryName(l[0].m_Category), l[0].m_ID) + '.jpg'"
              )
        Voice.mr-2(
          :name="name(l[1].m_NamedType)",
          :cue="`${l[1].m_VoiceCueName}_0`"
        )
        .d-flex.justify-center.flex-column
          .small(
            v-html="l[1].m_Text.replace(/\\n/g, '<br>')",
            style="white-space: nowrap; text-overflow: ellipsis"
          )
</template>

<script>
import define from "../../define";
export default {
    props: ['id'],
  computed: {
    list() {
      return this.$db.TweetList.filter((tweet) => tweet.m_NamedType === Number(this.id))
        .map((x) => [
          this.$db.RoomObjectListArray.find(
            (item) => x.m_ID === item.m_ObjEventArgs[1]
          ),
          x,
        ])
        .filter((x) => x[0]);
    },
  },
  methods: {
    categoryName(id) {
      return define.roomIDtoStr[id];
    },
    name(namedType) {
      return this.$db.NamedList[namedType].m_ResouceBaseName;
    },
  },
};
</script>
