(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9df3d952"],{cdcf:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-list-item",{attrs:{to:"/scenario/"+t.id}},[i("div",{staticClass:"ml-auto"}),t.scenario.m_NamedType[1]>=0?i("v-list-item-avatar",{staticClass:"mr-2",attrs:{size:t.$size()}},[i("CharaIcon",{attrs:{named:"",id:t.scenario.m_NamedType[1],size:t.$size()}})],1):t._e(),t.scenario.m_NamedType[0]>=0?i("v-list-item-avatar",{staticClass:"mr-2",attrs:{size:t.$size()}},[i("CharaIcon",{attrs:{named:"",id:t.scenario.m_NamedType[0],size:t.$size()}})],1):t.scenario.m_CharaID>=0?i("v-list-item-avatar",{staticClass:"mr-2",attrs:{size:t.$size()}},[i("CharaIcon",{attrs:{id:t.scenario.m_CharaID,size:t.$size()}})],1):i("v-list-item-avatar",{staticClass:"mr-2",attrs:{size:t.$size(32),color:"primary"}},[i("span",{directives:[{name:"show",rawName:"v-show",value:t.scenario.m_ScriptTextName,expression:"scenario.m_ScriptTextName"}],staticClass:"white--text"},[t._v(t._s(parseInt(t.scenario.m_ScriptTextName.slice(-2))))])]),i("div",{staticClass:"mr-md-2"}),i("v-list-item-content",{staticClass:"ml-0",style:{"max-width":t.scenario.m_NamedType[1]>=0?384-t.$size()-8+"px":"384px"}},[t.scenario.m_NamedType[1]>=0?i("v-list-item-subtitle",[t._v(t._s(t.$t("Cross Scenario")))]):t.scenario.m_NamedType[0]>=0?i("v-list-item-subtitle",[t._v(t._s(t.$t("Character Scenario")))]):t.scenario.m_CharaID>=0?i("v-list-item-subtitle",[t._v(t._s(t.$t("Memorial Scenario")))]):t._e(),i("v-list-item-title",[t._v(t._s(t.scenario.m_Title))])],1),i("div",{staticClass:"mr-auto"})],1)},a=[],r={name:"Scenario",props:["id"],computed:{scenario:function(){return this.$store.state.$db.ADVList[this.id]}}},n=r,m=i("2877"),c=i("6544"),o=i.n(c),l=i("da13"),d=i("8270"),p=i("5d23"),v=Object(m["a"])(n,s,a,!1,null,null,null);e["a"]=v.exports;o()(v,{VListItem:l["a"],VListItemAvatar:d["a"],VListItemContent:p["b"],VListItemSubtitle:p["c"],VListItemTitle:p["d"]})},f338:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.name?i("div",[i("div",{staticClass:"float-right px-4 hidden-xs-only"},[i("v-img",{attrs:{width:4*t.$size(),height:t.$size(),contain:"",src:t.icon}})],1),i("p",{staticClass:"display px-4 primary--text"},[t._v(t._s(t.$name(t.name,!0)))]),i("p",{directives:[{name:"show",rawName:"v-show",value:"ja"!=t.$i18n.locale,expression:"$i18n.locale!='ja'"}],staticClass:"px-4"},[i("span",[t._v("日本語：")]),i("span",{staticClass:"primary--text"},[t._v(t._s(t.name))])]),i("div",{staticClass:"px-4 hidden-sm-and-up"},[i("v-img",{attrs:{src:t.icon}})],1),i("div",{staticClass:"pb-4"}),5!=t.category?i("v-list-item",{attrs:{to:"/questlibrary/"+t.id}},[i("v-list-item-title",{staticClass:"primary--text"},[t._v(t._s(t.$t("Quests")))]),i("v-list-item-action",{staticClass:"ma-0"},[i("v-icon",[t._v("mdi-chevron-right")])],1)],1):i("v-list-item",{attrs:{to:"/title/"+(t.id-5e3)}},[i("v-list-item-title",{staticClass:"primary--text"},[t._v(t._s(t.$t("Title")))]),i("v-list-item-action",{staticClass:"ma-0"},[i("v-icon",[t._v("mdi-chevron-right")])],1)],1),t.scenarios.length?t._e():i("div",{staticClass:"pa-4"},[i("KeyValue",{attrs:{k:t.$t("No Scenario")}})],1),t._l(t.scenarios,(function(t){return[i("v-divider"),i("Scenario",{attrs:{id:t.m_AdvID}})]}))],2):i("div",{staticClass:"pa-4"},[i("KeyValue",{attrs:{k:t.$t("No Scenario")}})],1)},a=[],r=(i("4de4"),i("a434"),i("5319"),i("498a"),i("cdcf")),n={name:"ScenarioLibrary",props:["id"],components:{Scenario:r["a"]},computed:{category:function(){return Math.floor(this.id/1e3)},name:function(){return 5==this.category?this.$store.state.$db.TitleList[this.id-5e3].m_DisplayName:this.$store.state.$db.ADVLibraryList[this.id].m_ListName},icon:function(){return 5==this.category?this.$asset.contentslogo.format(this.id-5e3)+".png":this.$asset.advlibraryicon.format(this.id)+".png"},scenarios:function(){for(var t=this,e=5==this.category?this.$store.state.$db.ADVListArray.filter((function(e){return e.m_NamedType[0]>=0&&t.$store.state.$db.NamedList[e.m_NamedType[0]].m_TitleType==t.id-5e3||e.m_NamedType[1]>=0&&t.$store.state.$db.NamedList[e.m_NamedType[1]].m_TitleType==t.id-5e3||!t.$isMoe()&&e.m_CharaID>=0&&t.$store.state.$db.NamedList[t.$store.state.$db.CharacterList[e.m_CharaID].m_NamedType].m_TitleType==t.id-5e3||!1})):this.$store.state.$db.ADVListArray.filter((function(e){return e.m_LibraryID==t.id})),i=0;i<e.length;i++)i>0&&e[i].m_ScriptTextName&&e[i].m_ScriptTextName==e[i-1].m_ScriptTextName&&(e[i-1].m_Title=e[i-1].m_Title.replace("（イントロ）","").replace("イントロ","").trim(),e.splice(i,1),i-=1);return e}}},m=n,c=i("2877"),o=i("6544"),l=i.n(o),d=i("ce7e"),p=i("132d"),v=i("adda"),_=i("da13"),h=i("1800"),u=i("5d23"),$=Object(c["a"])(m,s,a,!1,null,null,null);e["default"]=$.exports;l()($,{VDivider:d["a"],VIcon:p["a"],VImg:v["a"],VListItem:_["a"],VListItemAction:h["a"],VListItemTitle:u["d"]})}}]);
//# sourceMappingURL=chunk-9df3d952.bc4fe22f.js.map