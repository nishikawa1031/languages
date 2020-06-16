<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
          <div class="modal-container">
            <v-row align="center">
              <v-col cols="12" sm="12">
                <div class="my-2">
                  <v-card>
                    <v-card-title class="headline">Use Google's location service?</v-card-title>

                    <v-card-text>
                      Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                      >
                        Disagree
                      </v-btn>

                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                      >
                        Agree
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </div>
                <div class="my-2">
                  <v-btn @click="$emit('close')">閉じる</v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'PreviewModal',
    props:{
      val_preview: Object
    },
    data () {
      return {
      }
    },
  }
</script>
