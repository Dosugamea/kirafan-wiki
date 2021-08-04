<template lang="pug">
  div(ref="cleaContainer").clea-container
    canvas.clea-canvas(ref="cleaCanvas")
    CleaDialog(
      :show="dialogManager.dialogOpen",
      :message="dialogManager.dialogText",
      :optionList="dialogManager.dialogOptionList",
      :autoDismiss="dialogManager.dialogAutoDismiss"
      @change="(e)=>dialogManager.onSelection(e)",
      @show="(e)=>dialogManager.onShowChange(e)"
      ref="cleaDialog"
      )
    //- v-btn(@click="overlay=!overlay").clea-menu Show Overlay
</template>
<script>
import CleaDialog from './dialog';
import { CleaPlayer } from './lib/cleaplayer.js';
import { CleaManagerInstance } from './clea';
import { DialogManagerInstance } from './dialogmanager';

export default {
  name: 'Clea',
  components: { CleaDialog },
  props:{
    show:{
      type: Boolean,
      default: false,
    },
  },
  mounted(){
    this.$el.style.display = 'none';
    if(this.show){
      this.$el.style.display = 'block';
      this.init();
    }
  },
  beforeDestroy(){
    if(this.inited){
      CleaPlayer.releaseInstance();
      CleaManagerInstance.onDestroy();
    }
  },
  data(){
    return {
      cleaManager : CleaManagerInstance,
      dialogManager : DialogManagerInstance,
      inited : false,
    };
  },
  watch:{
    show(val){
      if(val){
        this.$el.style.display = 'block';
        if(!this.inited){
          this.init();
        }
        CleaPlayer.getInstance().run();
      } else{
        this.$el.style.display = 'none';
        CleaPlayer.getInstance().pause();
      }
    },
    $route(to) {
      let detailpage_arr = ['Character', 'Weapon', 'Enemy', 'Quest Library', 'Room Object', 'Scenario', 'Master Orb', 'Named', 'item', 'Town Object'];
      if (detailpage_arr.indexOf(to.name) < 0) {
        if (this.$s.showCleaOnStart){
          this.$root.$emit('cleaVisibility', true);
        }
      }
      else if (!this.$s.showCleaInDetailPage) {
        this.$root.$emit('cleaVisibility', false);
      }
    },
  },
  methods:{
    init(){
      if(this.inited)return;
      CleaPlayer.getInstance().initialize(this.$refs.cleaContainer,this.$refs.cleaCanvas);
      CleaPlayer.getInstance().run();
      this.$refs.cleaCanvas.addEventListener('cleadragend',()=>{this.$refs.cleaDialog.calculatePosition();});
      this.$refs.cleaCanvas.addEventListener('cleatouch',(e)=>{CleaManagerInstance.onTouchClea(e.touchPart);});
      CleaManagerInstance.onCreate();
      this.inited = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.clea-container{
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0px;
  width: 5cm;
}
.clea-canvas{
  position: relative;
  width: 5cm;
  height: 5cm;
  z-index: 100;
}
.clea-menu{
  position: relative;
}
.clea-container--close{
  display: none;
}
</style>
