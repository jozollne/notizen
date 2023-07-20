<template>
  <div>
    <v-expansion-panels
      variant="popout"
      class="my-4"
      v-model="activePanel"
    >
      <v-expansion-panel>    
        <v-expansion-panel-title
          class="text-h6"
        >
          {{notiz.titel}}
        </v-expansion-panel-title>
        
        <v-expansion-panel-text>
          <v-text-field
            clearable
            :rules="rules"
            label="Titel"
            variant="solo"
            v-model="notiz.titel"
          >  
          </v-text-field>

          <v-textarea
            clearable
            :rules="rules"
            auto-grow
            max-rows="7"
            rows="2"
            label="Text"
            variant="solo"
            v-model="notiz.text"
          >
          </v-textarea>
          
          <v-text-field
            clearable
            label="PS"
            variant="solo"
            v-model="notiz.ps"
          >
          </v-text-field>

          <v-btn
            icon
            color="red"
            :loading="loadingDelete"
            :disabled="loadingDelete"
            @click="remove(notiz.id)"
          >
            <v-icon>mdi-cancel</v-icon>
          </v-btn>

          <v-btn
            icon
            color="orange"
            :loading="loadingUpdate"
            :disabled="loadingUpdate"
            @click="update(notiz.id, notiz.titel, notiz.text, notiz.ps)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
  
<script lang="ts">

import { defineComponent, PropType } from '@vue/runtime-dom'
import axios from 'axios'
import Notiz from '../types/DatenbankTypes'

export default defineComponent({

  data() {
    
    return {
        //Laden Animation
        loadingUpdate: false,
        loadingDelete: false,
        //id der Notiz
        id: '0',
        //rules
        rules: [
          value => !!value || 'Required.',
          value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        //#endregion
        //#region auswahl welches Panel aktiv ist
        activePanel: [],
        //#endregion
        clicked: false,
    };
  },

  props: {
    notiz: {
      required: true,
      type: Object as PropType<Notiz>
    }
  },

  methods: {    
    remove(id: number) {
      this.id = id
      const options = {
        method: 'DELETE',
        url: 'http://localhost:3000/notizen/' + id,
        data: {}
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });

      this.loadingDelete = true
      
      setTimeout(() => {
        this.activePanel = ''
        this.$emit('refresh')
        this.loadingDelete = false
      },1000)
    },

    update(id: number, titel: string, text: string, ps: string | undefined) {
      const options = {
        method: 'PATCH',
        url: 'http://localhost:3000/notizen/' + (id),
        data: {titel: titel, text: text, ps: ps}
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });

      this.loadingUpdate = true

      setTimeout(() => {
        this.activePanel = ''
        this.$emit('refresh')
        this.loadingUpdate = false
      },1000)
    },
  },
})
</script>
