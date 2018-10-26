<template>
  <div class="page-container"></div>
</template>
<script>
  import { Indicator } from 'mint-ui';
  import { wxAuth4Public } from 'pms-saas-common/lib/util/wx'
  import { urlParams, object2Url } from 'pms-saas-common/lib/util/object'
  import { WX_APP_ID } from '@util/const'

  export default {
    data() {
      return {}
    },
    mounted() {
      Indicator.open('微信授权')

      this.init()
    },
    methods: {
      init() {
        const search = urlParams(window.location.href)
        const params = new URLSearchParams(search)
        const code = params.get('code')

        if (code) {
          console.log(code)
        } else {
          this.handleAuth()
        }
      },
      handleAuth() {
        const url = 'https://open.weixin.qq.com/connect/oauth2/authorize'
        const redirectUrl = window.location.href.split('?')[0]
        const authParams = wxAuth4Public(WX_APP_ID, redirectUrl, 'userInfo')

        // window.location.replace(`${ url }?${ object2Url(authParams) }#wechat_redirect`)
        console.log(`${ url }?${ object2Url(authParams) }#wechat_redirect`)
      }
    }
  }
</script>