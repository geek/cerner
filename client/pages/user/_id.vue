<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md10>
      <v-card>
        <v-card-title class="headline" v-if="user">
          {{ user.firstname }} {{ user.lastname }}
        <v-spacer></v-spacer>

        </v-card-title>
        <v-card-text>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/">All Users</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      user: null
    }
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser'
    })
  },
  async mounted () {
    this.user = await this.getUser(this.$route.params.id)
  }
}
</script>
