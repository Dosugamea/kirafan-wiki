(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d217ffe"],{c8b5:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("p",{staticClass:"display px-4 primary--text"},[t._v(t._s(t.$t("Scenarios")))]),a("div",{staticClass:"px-4"},[a("v-select",{attrs:{label:t.$t("Category"),items:t.categories,dense:""},model:{value:t.category,callback:function(e){t.category=e},expression:"category"}})],1),t._l(t.scenarioLibraries.filter((function(e){return e.category==t.category})),(function(t){return[a("v-divider"),a("ScenarioLibrary",{attrs:{item:t}})]}))],2)},r=[],s=(a("d81d"),a("159b"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-list-item",{attrs:{to:"/scenariolibrary/"+t.item.id}},[a("v-list-item-avatar",{staticClass:"mx-auto mr-2 mr-md-4",attrs:{width:4*t.$size(),height:t.$size(),tile:""}},[a("v-img",{staticClass:"quest-library-icon",attrs:{src:t.item.icon,contain:""}})],1),a("v-list-item-content",{staticClass:"ml-0",style:{"max-width":"240px"}},[a("v-list-item-subtitle",[t._v(t._s(t.item.name))])],1),a("div",{staticClass:"mr-auto"})],1)}),n=[],c={name:"QuestLibrary",props:["item"]},o=c,l=a("2877"),m=a("6544"),u=a.n(m),d=a("adda"),y=a("da13"),b=a("8270"),p=a("5d23"),v=Object(l["a"])(o,s,n,!1,null,null,null),f=v.exports;u()(v,{VImg:d["a"],VListItem:y["a"],VListItemAvatar:b["a"],VListItemContent:p["b"],VListItemSubtitle:p["c"]});var g={name:"ScenarioLibraries",components:{ScenarioLibrary:f},data:function(){return{category:1}},computed:{scenarioLibraries:function(){var t=this,e=[];return this.$db.ADVLibraryListArray.forEach((function(a){e.push({id:a.m_LibraryListID,category:a.m_Category,name:t.$name(a.m_ListName),icon:t.$asset.advlibraryicon.format(a.m_LibraryListID)+".png"})})),this.$db.TitleListArray.forEach((function(a){e.push({id:5e3+a.m_TitleType,category:5,name:t.$name(a.m_DisplayName),icon:t.$asset.contentslogo.format(a.m_TitleType)+".png"})})),e},categories:function(){var t=this;return[1,2,3,5].map((function(e){return{text:t.$t("Scenario Library Categories.".concat(e)),value:e}}))}}},L=g,h=a("ce7e"),_=a("b974"),$=Object(l["a"])(L,i,r,!1,null,null,null);e["default"]=$.exports;u()($,{VDivider:h["a"],VSelect:_["a"]})}}]);
//# sourceMappingURL=chunk-2d217ffe.892ff6f7.js.map