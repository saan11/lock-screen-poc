import { mapGetters, mapActions } from 'vuex'
let LockScreenMixin = {
  computed: {
    ...mapGetters({
      lockPassword: 'getLockPassword',
      lockStatus: 'getLockStatus',
    }),
  },
  methods: {
    ...mapActions(['NEW_DAY_CHECK', 'TRIGGER_LOCK', 'UPDATE_PASSWORD']),
  },
}

export default LockScreenMixin
