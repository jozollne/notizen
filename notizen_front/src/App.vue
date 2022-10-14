<template>
  <div class="app" :class="(mode === 'dark') ? 'dark' : ''">
    <NotizenListeExPanel :notizen="notizen" @refresh="get"/>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import NotizenListeExPanel from './components/NotizenListeExPanel.vue';
import GetAllNotizenSlGroups from './components/GetAllNotizenSlGroups.vue';
import Test from './components/Test.vue';

export default defineComponent({
  data() {
    return {
      notizen: Array,
      mode: 'dark'
    };
  },

  components: {
    NotizenListeExPanel,
    GetAllNotizenSlGroups,
    Test,
    
},

  methods: {    
    get() {
      const options = {
        method: 'GET',
        url: 'http://localhost:3000/notizen/',
      };

      axios.request(options).then((response) => {
        return this.notizen = response.data;
      }).catch(function (error) {
        console.error(error);
      });
    },
  },

  created() {
    this.get()
  }
})

</script>

<style>
  .dark {
    height: auto;
    background-color: #0d151b;
    color: #000000;
  }
</style>