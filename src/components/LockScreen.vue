<template>
  <transition name="drop">
    <div v-if="showLock" class="lock-screen section">
      <div class="container-fluid">
        <div class="level lock-icon">
          <div
            class="level-item"
            :style="'background-image: url(/storage/default-photos/lock.png)'"
          ></div>
        </div>
        <div class="level">
          <div class="level-item unlock-password">
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <input
                      class="input"
                      placeholder="Password"
                      id="email"
                      type="password"
                      v-model="password"
                      required
                      autofocus
                    />
                  </p>

                  <p
                    v-if="password_error"
                    class="help is-danger has-text-centered"
                  >
                    Wrong Password!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="watch">{{ watchTime }}</div>
    </div>
  </transition>
</template>

<script>
import LockScreenMixin from './../mixins/LockScreenMixin'
const bcrypt = require('bcryptjs')
export default {
  name: 'LockScreen',
  props: { showLock: Boolean },
  mixins: [LockScreenMixin],
  data() {
    return {
      password_error: false,
      password: '',
      watchTime: '',
      intervalId: '',
    }
  },
  watch: {
    password() {
      if (this.password_error) {
        this.password_error = false
      } else {
        setTimeout(() => {
          if (bcrypt.compareSync(this.password, this.lockPassword)) {
            this.locked = false
            this.TRIGGER_LOCK({ status: false })
            this.password = ''
            this.password_error = false
          } else {
            this.password_error = true
          }
        }, 2000)
      }
    },
    lockStatus() {
      // watch simulator
      if (this.lockStatus) {
        // start interval
        this.startInterval()
      } else {
        // end interval
        if (this.intervalId) clearInterval(this.intervalId)
      }
    },
  },
  mounted() {
    this.startInterval()
  },
  methods: {
    startInterval() {
      this.intervalId = setInterval(() => {
        let today = new Date()
        const doubleUp = (val) => {
          return `${val.toString().length === 1 ? '0' + val : val}`
        }
        this.watchTime = `${doubleUp(today.getHours())} : ${doubleUp(
          today.getMinutes()
        )} : ${doubleUp(today.getUTCSeconds())}`
      }, 1000)
    },
  },
}
</script>

<style scoped>
.level-item > img {
  height: 200px;
  width: auto;
}
div.level.lock-icon {
  margin-top: 15% !important;
}
.lock-icon > .level-item {
  height: 200px;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
}
.lock-screen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  border: 0;
  padding: 40px;
  background-image: url('../storage/default-photos/lock.png');
  background-size: 100% 100%;
  z-index: 10;
}
.watch {
  font-size: 100px;
  font-weight: bold;
  color: rgb(198, 212, 0);
  position: absolute;
  left: 50px;
  right: 0;
  bottom: 30px;
  text-align: left;
}
/* width */
::-webkit-scrollbar {
  width: 0 !important;
}
.drop-enter-active {
  animation: drop-in 0.5s;
  -webkit-transform: translateY(-200%);
  -moz-transform: translateY(-200%);
  transform: translateY(-100%);
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
.drop-leave-active {
  animation: drop-in 0.5s reverse;
  -webkit-transform: translateY(-200%);
  -moz-transform: translateY(-200%);
  transform: translateY(-100%);
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
@keyframes drop-in {
  0% {
    -webkit-transform: translateY(-200%);
    -moz-transform: translateY(-200%);
    transform: translateY(-100%);
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
  }
  100% {
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
  }
}
</style>
