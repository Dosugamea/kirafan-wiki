<template lang="pug">
  v-card.clea-dialog(:class="[show?'clea-dialog--open':'clea-dialog--close']",ref="dialog")
    //- v-card-title {{title}}
    v-card-text {{message}}
    v-card-actions
      v-btn(v-if="optionList!=null&&optionList.length>0",icon,@click="onShowOptionClick")
        v-icon {{ showOption ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
      v-spacer
      v-btn(icon,@click="onDismissClick")
        v-icon mdi-close
    v-expand-transition
      v-list(v-show="showOption")
        v-list-item(v-for="(item, i) in optionList",:key="i",@click="$emit('change', i)" )
          v-list-item-content
            v-list-item-title {{item}}

</template>
<script>
export default {
  name: 'CleaDialog',
  model: {
    prop: 'show',
    event: 'show'
  },
  props:{
    message:{
      type: String,
      default : ''
    },
    title:{
      type: String,
      default : 'Clea'
    },
    autoDismiss:{
      type: Boolean,
      default : true,
    },
    dismissTime:{
      type: Number,
      default : 4000,
    },
    show:{
      type: Boolean,
      default: false,
    },
    optionList:{
      type: Array,
      default: ()=>[],
    }
  },
  mounted(){
    this.changeVisibility();
  },
  watch:{
    show(){
      this.changeVisibility();
    }
  },
  beforeDestroy(){

  },
  data(){
    return {
      showOption: false,
      interacted: false,
    };
  },
  methods:{
    onShowOptionClick(){
      this.showOption = !this.showOption;
      this.interacted = true;
    },
    onDismissClick(){
      if(this.show){
        this.$emit('show', false);
      }
    },
    changeVisibility(){
      if(this.show){
        this.$el.style.display = 'block';
        this.interacted = false;
        this.calculatePosition();
        if(this.autoDismiss&&this.dismissTime>0){
          setTimeout(() => {
            if(!this.interacted){
              this.$emit('show', false);
            }
          }, this.dismissTime);
        }
      }else{
        this.showOption = false;
        this.$el.style.display = 'none';
      }
    },

    calculatePosition(){
      let rect = this.$el.getBoundingClientRect();
      let parent = this.$el.parentElement.getBoundingClientRect();
      let posY = 0;
      let posX = 0;
      if(parent.bottom + rect.height<window.innerHeight){
        posY = parent.height; 
      }else if(parent.top - rect.height>0){
        posY = -rect.height; 
      }else if(parent.right + rect.width<window.innerWidth){
        posX = parent.width; 
      }else if(parent.left - rect.width>0){
        posX = -rect.width;
      }
      this.$el.style.left = posX+'px';
      this.$el.style.top = posY+'px';
    }
  }
};
</script>

<style lang="scss" scoped>
.clea-dialog{
  position:absolute;
  width:inherit;
  z-index:101;
}
.clea-dialog--open{
}
.clea-dialog--close{
}
</style>