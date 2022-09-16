<template>
<v-sheet
    class="mx-auto"
    max-width="600"
  >
    <v-slide-group
      show-arrows
    >
      <v-slide-group-item
        v-slot="{ isSelected, toggle }"
      >
        <v-btn
          class="ma-2"
          rounded
          :color="isSelected ? 'primary' : undefined"
          @click="toggle"
        >
          Options
        </v-btn>
        <v-btn
          class="ma-2"
          rounded
          :color="isSelected ? 'primary' : undefined"
          @click="toggle"
        >
          Options
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
  </template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-dom';
import axios from 'axios';
import Notiz from '../types/DatenbankTypes'
    export default defineComponent({
      data () {
        return {
          activePanel: [],
        }
      },
      
      props: {
    notizen: {
      required: true,
      type: Array as PropType<Notiz[]>
    }
  },

      methods: {
        //#region auswahl welches Panel aktiv ist
        all () {
          this.activePanel = [...Array(this.notizen.length).keys()].map((i) => i)
        },
        none () {
          this.activePanel = []
        },
        //#endregion

        //#region Post methode für DB
        post() {
            const options = {
                method: 'POST',
                url: 'http://localhost:3000/notizen/',
                data: { titel: this.titel, text: this.text, ps: this.ps }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        },
        //#endregion

      },
    })
  </script>