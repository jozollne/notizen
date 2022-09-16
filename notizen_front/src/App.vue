<template>
  <div>
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
      notizen: Array
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