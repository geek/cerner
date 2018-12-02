<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md10>
      <v-card>
        <v-card-title class="headline">
          Users
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="this.users"
            :search="search"
          >
          <template slot="items" slot-scope="row">
            <td><nuxt-link :to="'/user/' + row.item.id">{{row.item.firstname}}</nuxt-link></td>
            <td>{{row.item.lastname}}</td>
            <td>{{row.item.email}}</td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/user/create">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      search: '',
      headers: [
        { text: 'First name', value: 'firstname' },
        { text: 'Last name', value: 'lastname' },
        { text: 'Email', value: 'email' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/users'
    })
  },
  methods: {
    ...mapActions({
      getUsers: 'user/getUsers'
    })
  },
  async mounted () {
    await this.getUsers()
  }
}
</script>
