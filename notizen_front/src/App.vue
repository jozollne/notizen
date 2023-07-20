<template>
  <div class="app" :class="(mode === 'dark') ? 'dark' : ''">
    <AddNotizen @refresh="get"/>
    <div v-for="notiz in notizen">
      <NotizenListeExPanel :notiz="notiz"  @refresh="get"/>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import NotizenListeExPanel from './components/NotizenListeExPanel.vue';
import Test from './components/Test.vue';
import AddNotizen from './components/AddNotizen.vue';

export default defineComponent({
  data() {
    return {
      notizen: Array,
      mode: 'dark'
    };
  },

  components: {
    NotizenListeExPanel,
    Test,
    AddNotizen
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
    height: 1000vh;
    background-color: #313131;
    color: #000000;
  }
</style>