<template>
  <div class="modal-card">
    <div>
      <button @click="lockUser()">Lock</button>
    </div>
    <h4>Set Lock Password</h4>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="password">Password</label>
      </div>
      <input
        class="input is-large"
        id="password"
        type="password"
        v-model="password"
        autofocus
      />
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="repeat-password">Repeat Password</label>
      </div>
      <input
        class="input is-large"
        id="repeat-password"
        type="password"
        v-model="repeat_password"
        autofocus
      />
    </div>
    <button class="button is-success" @click="setLockPass()">
      Save Password
    </button>
  </div>
</template>

<script>
import LockScreenMixin from '@/mixins/LockScreenMixin'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10)

export default {
  name: 'AppNavbar',
  mixins: [LockScreenMixin],
  data() {
    return {
      password: '',
      repeat_password: '',
    }
  },
  methods: {
    lockUser() {
      this.TRIGGER_LOCK({ status: true })
    },
    setLockPass() {
      if (this.password === '' || this.repeat_password === '') {
        console.log('Password can not be empty!')
      } else if (this.password !== this.repeat_password) {
        console.log("Passwords don't match!")
      } else {
        this.UPDATE_PASSWORD({
          password: bcrypt.hashSync(this.password, salt),
        })
        this.lockUser()
      }
    },
  },
}
</script>
