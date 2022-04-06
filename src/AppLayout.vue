<template>
  <div class="background">
    <img src="https://cdn.educba.com/academy/wp-content/uploads/2020/03/address-tag-in-html.jpg" alt="Italian Trulli">
    <app-navbar v-if="!lockStatus"></app-navbar>
    <router-view v-if="!lockStatus"></router-view>
    <lock-screen :show-lock="lockStatus"></lock-screen>
  </div>
</template>

<script>
import AppNavbar from './layout/AppNavbar.vue'
import LockScreen from './components/LockScreen.vue'
import LockScreenMixin from './mixins/LockScreenMixin'
export default {
  name: 'App',
  components: { LockScreen, AppNavbar },
  mixins: [LockScreenMixin],
  mounted() {
    let date = new Date()
    let today = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`
    this.NEW_DAY_CHECK({ date: today })
  },
}
</script>

<style scoped>
.background {
  background-image: url('https://24slides.com/templates/upload/templates-previews/JqdiZZ4zZ8lvFNLW0X3UqZ9HMjLhts4Ei4Sff302.jpg');
  background-size: 100% 100%;
}
</style>

