<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script>
  import { getWxUserInfo } from '@util/cache'

  export default {
    created() {
      this.init()
    },
    methods: {
      init() {
        const wxUserInfo = getWxUserInfo()

        if (!wxUserInfo) {
          this.$router.push({ name: 'auth' })
        }
      }
    }
  }
</script>