import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  state: {
    lock: {
      password: 0,
      status: false,
    },
    dateToday: '',
  },
  getters: {
    getLockPassword: (state) => state.lock.password,
    getLockStatus: (state) => state.lock.status,
  },
  mutations: {
    changeLockStatus(state, payload) {
      state.lock.status = payload.status
    },
    setLockPassword(state, payload) {
      state.lock.password = payload.password
    },
    setTheDate(state, payload) {
      state.dateToday = payload.date
    },
  },
  actions: {
    NEW_DAY_CHECK({ state, commit }, payload) {
      if (state.dateToday === '') {
        // first day
        commit('setTheDate', payload)
      } else {
        if (state.dateToday !== payload.date) {
          commit('setTheDate', payload)
          commit('setLockPassword', { password: '' })
          commit('changeLockStatus', { status: false })
        }
      }
    },
    TRIGGER_LOCK({ commit }, payload) {
      commit('changeLockStatus', payload)
    },
    UPDATE_PASSWORD({ commit }, payload) {
      commit('setLockPassword', payload)
    },
  },
  plugins: [createPersistedState()],
});

export default store;
