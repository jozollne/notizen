<template>
  <div>
      <v-btn 
        @click="$emit('refresh')"
      >
        refresh DB
      </v-btn>

      <v-btn 
        rounded
        :class="['ma-2']"
        @click="Post = !Post"
      >
       Neue Notiz
     </v-btn>
    
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
            auto-grow
            rows="3"
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
            :loading="loading[-1]"
            :disabled="loading[-1]"
            @click="post(-1)"
          >
            Notiz hinzufügen
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
        </v-expand-transition>
      </v-sheet>
    </v-expand-transition>

    <v-expansion-panels
      variant="popout"
      class="my-4"
      multiple
    >
      <v-expansion-panel
        v-for="notiz in notizen"
        :key="notiz.id"
        v-model="form"
      >    
        <v-expansion-panel-title
          class="text-h6"
        >
          {{notiz.titel}}
        </v-expansion-panel-title>
        
        <v-expansion-panel-text>
          <v-text-field
            :rules="rules"
            label="Titel"
            variant="solo"
            v-model="notiz.titel"
          >  
          </v-text-field>

          <v-textarea
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
            label="PS"
            variant="solo"
            v-model="notiz.ps"
          >
          </v-text-field>

          <v-btn
            icon
            color="red"
            :loading="loading[notiz.id]"
            :disabled="loading[notiz.id]"
            @click="remove(notiz.id)"
          >
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
          <v-btn
            icon
            color="orange"
            :loading="loading[notiz.id+1111]"
            :disabled="loading[notiz.id+1111]"
            @click="update(notiz.id+1111, notiz.titel, notiz.text, notiz.ps)"
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
        form: false,
        //Laden Animation
        loading: [],
        //id der Notiz
        id: '0',
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
    //#region Post methode für DB
    post(id: number) {
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

      this.titel = ''
      this.text = ''
      this.ps = ''
      this.loading[id] = true

      setTimeout(() => {
          this.$emit('refresh')
          this.Post = !this.Post
          this.loading[id] = false
        },
      1000)
    },
    //#endregion

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

      this.loading[id] = true
      
      setTimeout(() => {
          this.$emit('refresh')
          this.loading[id] = false
        },
      1000)
    },

    update(id: number, titel: string, text: string, ps: undefined) {
      const options = {
        method: 'PATCH',
        url: 'http://localhost:3000/notizen/' + (id-1111),
        data: {titel: titel, text: text, ps: ps}
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });

      this.loading[id] = true

      setTimeout(() => {
          this.$emit('refresh')
          this.loading[id] = false
        },
      1000)
    },
  },
})
</script>
