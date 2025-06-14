import axios from '@axios'

export default {
  namespaced: true,
  state: {
    status: '',
    user: {},
    controller: 1,
    deptid: null,
  },
  getters: {
    status: state => state.user.status,
    controller: state => state.controller,
    deptid: state => state.deptid,
  },
  mutations: {
    auth_success(state, user) {
      state.user = user
      state.status = true
      state.deptid = user.deptid || null
    },
    logout(state) {
      state.status = false
    },
    controller_id(state, controller) {
      state.controller = controller
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const res = await axios.post('/login-DRR-Electic-Sem', { username, password })
        localStorage.setItem('userData', JSON.stringify(res.data))
        commit('auth_success', res.data)
      } catch (error) {
        console.error(error.message)
        commit('logout')
        this.$message.error(error.message)
      }
    },
    // LOG OUT //
    logout({ commit }) {
      commit('logout')
      localStorage.removeItem('userData')
    },
  },
}
