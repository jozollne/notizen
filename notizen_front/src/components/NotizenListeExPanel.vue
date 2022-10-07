<template>
  <div>
    <div class="text-center d-flex pb-4">
      <v-card>
        {{link}}
      </v-card>
      <v-btn @click="all">
        all
      </v-btn>
      <div>
        <v-card>
          {{ activePanel }}
        </v-card>
      </div>
      <v-btn @click="none">
        none
      </v-btn>
    </div>

    <center>
      <v-btn 
        rounded
        :class="['ma-2']"
        @click="Post = !Post"
      >
       Neue Notiz
     </v-btn>

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

      <v-btn
        rounded
        :class="['ma-2']"
      >
        Test
      </v-btn>
    </center>
    
    <v-expand-transition>
      <v-sheet
        v-if="Post == true"
        h-auto
        rounded
        class="my-4"
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

    <v-expansion-panels
      v-model="activePanel"
      variant="popout"
      class="my-4"
      multiple
    >
      <v-expansion-panel
        v-for="notiz in notizen"
        :key="notiz.id"
      >    
        <v-expansion-panel-title
          class="text-h6"
        >
          {{ notiz.titel }} {{}} {{notiz.id}}
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <p>
            {{ notiz.text }}
          </p>

          <p v-if="notiz.ps != null">
            PS: {{ notiz.ps }}
          </p>
          <v-btn
            block
            color="grey"
            @click="test(notiz.id)"
          >
            Löschen
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
  
<script lang="ts">

import { defineComponent, PropType } from '@vue/runtime-dom';
import axios from 'axios';
import { link } from 'fs';
import Notiz from '../types/DatenbankTypes'
export default defineComponent({

  data() {
    
    return {
        link: '0',
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
        clicked: false,
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

    delete() {
      const options = {
        method: 'DELETE',
        url: 'http://localhost:3000/notizen/' + this.id,
        data: {}
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    },

    test(link: number) {
      this.link = link
    },
  },

})
</script>

<style>
  .white {
      background-color: white;
      width: 200px;
      height: 200px;  

  }
  .blue {
      width: 200px;
      height: 200px;
      background-color: rgb(0, 0, 0);
  }


</style>