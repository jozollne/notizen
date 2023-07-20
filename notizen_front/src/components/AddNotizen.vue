<template>
  <div>
    <v-btn 
      block
      :class="['ma-2']"
      @click="Post = !Post"
      color=""
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
            placeholder="Titel"
          >
          </v-text-field>
        </v-expand-transition>

        <v-expand-transition>
          <v-textarea
            placeholder="Notiz"
            auto-grow
            rows="3"
            label="Text"
            hide-details="auto"
            v-model="text"
          ></v-textarea>
        </v-expand-transition>

        <v-expand-transition>
          <v-text-field
            placeholder="PS"
            label="PS"
            hide-details="auto"
            v-model="ps"
          ></v-text-field>
        </v-expand-transition>

        <v-expand-transition>
          <v-btn 
            block
            :loading="loadingPush"
            :disabled="loadingPush"
            @click="post"
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
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      loadingPush: false,
      Post: false,
      titel: '',
      text: '',
      ps: '',
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
    }
  },

  methods: {
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

      this.titel = ''
      this.text = ''
      this.ps = ''
      this.loadingPush = true

      setTimeout(() => {
          this.$emit('refresh')
          this.Post = !this.Post
          this.loadingPush = false
        },
      1000)
    },
  }
})
</script>