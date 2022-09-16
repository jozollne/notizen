<template>
  <v-sheet
    class="mx-auto"
    elevation="8"
    w-auto
  >
    <v-slide-group
      v-model="nr"
      class="pa-4"
      center-active
      selected-class="bg-primary"
      show-arrows
    >
      <v-slide-group-item
        v-for="i in Notiz?.length"
        :key="i"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-btn
          :color="isSelected ? 'primary' : undefined"
          :class="['ma-2', selectedClass]"
          rounded
          @click="toggle"
        >
          {{Notiz[i-1].titel}}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>

    <v-expand-transition>
      <v-sheet
        v-if="nr != null"
        h-auto
      >
        <div class="d-flex fill-height justify-center">
          <h3 class="text-h5">
            Notiz {{ nr + 1 }}: {{Notiz[nr].titel}}
          </h3>
        </div>
      </v-sheet>
    </v-expand-transition>

    <v-expand-transition>
      <v-sheet
        v-if="nr != null"
        h-auto
      >
        <v-alert border border-color='primary'>
          <p>
            {{Notiz[nr].text}}
          </p>

          <p v-if="Notiz[nr].ps != null">
            PS: {{Notiz[nr].ps}}
          </p>
        </v-alert>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
</template>

<script lang="ts">
import type daten from '../types/DatenbankTypes';
import { defineComponent } from '@vue/runtime-dom';
import axios from 'axios';
import { text } from 'stream/consumers';

export default defineComponent({
  data(){
    return {
        nr: null as number | null,
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