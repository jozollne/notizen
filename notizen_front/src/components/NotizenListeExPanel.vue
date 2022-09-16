<template>
  <div>
    <div class="text-center d-flex pb-4">
      <v-btn @click="all">
        all
      </v-btn>
      <div>{{ activePanel }}</div>
      <v-btn @click="none">
        none
      </v-btn>
    </div>

    <v-sheet 
      class="mx-auto"
      max-width="mx-auto"
    >
      <v-slide-group
        class="pa-4"
        center-active
        selected-class="bg-primary"
        show-arrows
      >
        <v-slide-group-item>
          <v-btn 
            rounded
            :class="['ma-2']"
            @click="Post = !Post"
          >
            Neue Notiz
          </v-btn>

        </v-slide-group-item>

        <v-btn
          rounded
          :class="['ma-2']"
        >
          Bearbeiten
        </v-btn>

        <v-btn
          rounded
          :class="['ma-2']"
        >
          Löschen
        </v-btn>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet
          v-if="Post == true"
          h-auto
        >
          <v-expand-transition>
            <v-text-field
              label="Titel"
              :rules="rules"
              hide-details="auto"
              v-model="titel"
            ></v-text-field>
          </v-expand-transition>

          <v-expand-transition>
            <v-textarea
              label="Text"
              hide-details="auto"
              v-model="text"
            ></v-textarea>
          </v-expand-transition>

          <v-expand-transition>
            <v-text-field
              label="PS"
              hide-details="auto"
              v-model="ps"
            ></v-text-field>
          </v-expand-transition>

          <v-expand-transition>
            <v-btn 
              block
              @click="post"
            >
              Notiz hinzufügen
            </v-btn>
          </v-expand-transition>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>

    <v-expansion-panels
      v-model="activePanel"
      variant="popout"
      class="my-4"
      multiple
    >
      <v-expansion-panel
        v-for="(notiz,i) in notizen"
        :key="i"
      >    
        <v-expansion-panel-title
          class="text-h6"
        >
          {{ notiz.titel }}
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <p>
            {{ notiz.text }}
          </p>

          <p v-if="notiz.ps != null">
            PS: {{ notiz.ps }}
          </p>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
  
<script lang="ts">

import { defineComponent, PropType } from '@vue/runtime-dom';
import axios from 'axios';
import Notiz from '../types/DatenbankTypes'
export default defineComponent({

  data() {
    
    return {
        //Animation Notiz hinzufügen
        Post: false,
        //#region Notiz hinzufügen
        rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        titel: '',
        text: '',
        ps: '',
        //#endregion
        //#region auswahl welches Panel aktiv ist
        activePanel: [],
        //#endregion
    };
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