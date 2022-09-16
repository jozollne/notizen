<template>
      <div class="text-center d-flex pb-4">
        <v-btn @click="all">
          all
        </v-btn>
        <div>{{ activePanel }}</div>
        <v-btn @click="none">
          none
        </v-btn>
      </div>
  
      <v-expansion-panels
        v-model="activePanel"
        variant="popout"
        class="my-4"
      >
        <v-expansion-panel
          v-for="(notiz,i) in notizen"
          :key="i"
        >
          <v-expansion-panel-title> {{ notiz.titel }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            {{notiz.text}}
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
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