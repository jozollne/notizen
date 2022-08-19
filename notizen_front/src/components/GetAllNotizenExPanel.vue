<template>
  <div>
    <v-expansion-panels 
        variant="popout" 
        class="my-4"
    >
      <v-expansion-panel
        v-for="i in Notiz?.length"
        :key="i"
      >
        <v-expansion-panel-title
            class="text-h6"
        >
            {{Notiz[i-1].titel}}
        </v-expansion-panel-title>
        
        <v-expansion-panel-text>
            <p>
                {{Notiz[i-1].text}}
            </p>

            <p v-if="Notiz[i-1].ps != null">
                PS: {{Notiz[i-1].ps}}
            </p>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import type daten from '../types/DatenbankTypes';
import { defineComponent } from '@vue/runtime-dom';
import axios from 'axios';

export default defineComponent({
  data(){
    return {
        Notiz: null as daten[] | null
        }
},

methods: {

},

    created() {
      const options = {
        method: 'GET',
        url: 'http://localhost:3000/notizen/',
};

axios.request(options).then((response) => {
  this.Notiz = response.data;
}).catch(function (error) {
  console.error(error);
});
    },
  })
</script>