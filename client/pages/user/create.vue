<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md10>
      <v-form ref="form">
        <h3 class="mb-0">Create User</h3>
        <v-text-field
          v-model="user.email"
          label="Email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.firstname"
          label="First name"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.lastname"
          label="Last name"
          required
        ></v-text-field>

        <v-btn
          class="mt-3 ml-0"
          color="primary"
          @click="handleCreateUser"
        >Create</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      user: {
        email: '',
        firstname: '',
        lastname: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
    }
  },
  methods: {
    ...mapActions({
      createUser: 'user/createUser'
    }),
    handleCreateUser () {
      if (this.$refs.form.validate()) {
        this.saveUser()
      }
    },
    async saveUser () {
      try {
        const { id } = await this.createUser(this.user)
        this.$router.push({ path: `/user/${id}` })
      } catch (err) {
        this.$toast.error(err.message)
      }
    }
  }
}
</script>
