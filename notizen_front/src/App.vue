<template>
  <div class="app" :class="(mode === 'dark') ? 'dark' : ''">
    <!-- <Test :notizen="notizen"/> -->
    <NotizenListeExPanel :notizen="notizen" />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import NotizenListeExPanel from './components/NotizenListeExPanel.vue';
import GetAllNotizenSlGroups from './components/GetAllNotizenSlGroups.vue';
import Test from './components/test.vue';

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
    Test
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
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  .app {
    width: 100vw;
    height: 100vh;
    background: #f3f3f3;
    color: #15202b;
  }

  .dark {
    background-color: #0d151b;
    color: #000000;
  }
</style>