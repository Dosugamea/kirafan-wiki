(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b325f"],{"26af":function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("p",{staticClass:"display px-4 primary--text"},[t._v(t._s(t.name))]),t._l(t.groupedItem,(function(t){return[e("v-divider"),e("fruit",{key:"grouped-fruit-"+t,attrs:{id:t}})]}))],2)},r=[],n=(e("d81d"),e("ac1f"),e("1276"),e("a434"),e("a15b"),e("5319"),function(){var t=this,i=t.$createElement,e=t._self._c||i;return t.isPassive?e("span",[e("PassiveSkill",{attrs:{id:t.id+"0",owner:"ABL",characterSkillIDs:[]}})],1):e("div",[e("div",{staticClass:"px-4 mb-4"},[e("v-row",[e("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[e("KeyValue",{attrs:{k:t.$t("Fruit Name"),v:t.name,width:"33%"}}),e("div",{staticClass:"d-flex"},[e("div",{staticClass:"mr-2 d-flex justify-center flex-column"},[e("v-img",{attrs:{width:t.$size(),contain:"",src:t.icon}})],1),e("div",{staticClass:"d-flex justify-center flex-column small",style:{width:"calc(100% - ".concat(t.$size(),"px)"),"min-height":"".concat(t.$size(),"px")}},[e("div",{staticClass:"d-flex"},[e("div",{staticClass:"pr-1"},[t._v("・")]),e("div",[e("div",[t._v(t._s(t.txt))])])])])])],1)],1)],1)])}),a=[],u=e("9225"),c={name:"Fruit",props:{id:String},computed:{fruit:function(){return this.$store.state.$db.AbilitySpheres[this.id]},itemId:function(){return this.fruit.m_ItemID},fruitType:function(){return this.fruit.m_Type},name:function(){return this.$store.state.$db.ItemList[this.itemId].m_Name},icon:function(){return this.$asset.itemicon.format(this.id.replace(/0$/,""))+".png"},isPassive:function(){return 5===this.fruitType},status:function(){return["HP","ATK","MAT","DEF","MDF",""][this.fruitType]},txt:function(){return u["a"].t("Ability Tree Status Up",{status:this.status,amount:this.fruit.m_Value})}}},l=c,d=e("2877"),o=e("6544"),f=e.n(o),m=e("62ad"),p=e("adda"),h=e("0fd9"),v=Object(d["a"])(l,n,a,!1,null,null,null),$=v.exports;f()(v,{VCol:m["a"],VImg:p["a"],VRow:h["a"]});var _={components:{fruit:$},props:{id:String},computed:{groupedItem:function(){var t=this;return[0,1,2].map((function(i){var e=t.id.split("");return e.splice(2,1,i),e.join("")}))},fruit:function(){return this.$store.state.$db.AbilitySpheres[this.id]},itemId:function(){return this.fruit.m_ItemID},name:function(){return this.$store.state.$db.ItemList[this.itemId].m_Name.replace("[Grade1]","")}}},x=_,y=e("ce7e"),b=Object(d["a"])(x,s,r,!1,null,null,null);i["default"]=b.exports;f()(b,{VDivider:y["a"]})}}]);
//# sourceMappingURL=chunk-2d0b325f.5025b135.js.map