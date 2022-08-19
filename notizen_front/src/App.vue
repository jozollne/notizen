<template>
  <GetAllNotizenSlGroups/>
  <GetAllNotizenExPanel/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GetAllNotizenExPanel from './components/GetAllNotizenExPanel.vue';
import GetAllNotizenSlGroups from './components/GetAllNotizenSlGroups.vue';

export default defineComponent({
  data(){
    return {
      }
},
components:{
    GetAllNotizenExPanel,
    GetAllNotizenSlGroups
},

})
</script>