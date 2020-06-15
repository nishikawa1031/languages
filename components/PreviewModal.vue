<template>
  <v-row justify="center">
    <v-btn
      color="blue darken-3"
      dark
      @click.stop="dialog = true"
    >
      詳細を見る
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="400"
    >
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
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    name: 'previewModal',
    props:{
      val_preview: Object
    },
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>
