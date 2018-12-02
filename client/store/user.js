import axios from 'axios'

const BASEURL = 'http://localhost:8080/graphql'

export const state = () => ({
  users: []
})

export const mutations = {
  ADD_USER (state, user) {
    state.users.push(user)
  },
  SET_USERS (state, users) {
    state.users = users
  }
}

export const actions = {
  async createUser ({ commit }, { email, firstname, lastname }) {
    const payload = {
      query: `mutation createUser($email: String! $firstname: String! $lastname: String!) {
                createUser(user: { email: $email firstname: $firstname lastname: $lastname })
                { id }
              }`,
      variables: { email, firstname, lastname }
    }

    const { data: { data: { createUser } } } = await axios.post(BASEURL, payload)
    createUser.email = email;
    createUser.firstname = firstname;
    createUser.lastname = lastname;

    commit('ADD_USER', createUser)
    return createUser
  },
  async getUsers ({ commit }) {
    const payload = {
      query: 'query { getUsers { id email firstname lastname } }'
    }

    const { data: { data: { getUsers } } } = await axios.post(BASEURL, payload)
    commit('SET_USERS', getUsers)
    return getUsers
  },
  async getUser ({ commit }, id) {
    const payload = {
      query: `query getUser($id: ID!) { getUser(id: $id) { id email firstname lastname } }`,
      variables: { id }
    }

    const { data: { data: { getUser } } } = await axios.post(BASEURL, payload)
    commit('ADD_USER', getUser)
    return getUser
  }
}

export const getters = {
  users (state) {
    return state.users
  }
}
