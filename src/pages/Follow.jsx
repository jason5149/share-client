import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { parse } from 'qs'
import { base64decode } from '@utils/tool'

@inject(
  'WxModel',
)
@observer
class FollowPage extends Component {
  state = {
    qrcodeTicket: '',
  }

  componentDidMount() {
    // document.title = '关注二维码'

    this.init()
  }

  init() {
    const { location } = this.props
    const { search } = location
    const result = base64decode(parse(search.split('?')[1]).params)

    if (result) {
      const { type, id } = result

      this.handleGenerateQrcode(type, id)
    }

    this.handleSearchFollowConfig()
  }

  handleGenerateQrcode = async (type, id) => {
    const { WxModel } = this.props
    const { getTemporaryQrcode, getStaticQrcode } = WxModel

    if (type === 1) {
      const tempResult = await getTemporaryQrcode({ userId: id })

      if (tempResult) {
        this.setState({
          qrcodeTicket: tempResult.ticket,
        })
      }
    } else {
      const staticResult = await getStaticQrcode({ channelId: id })

      if (staticResult) {
        this.setState({
          qrcodeTicket: staticResult.ticket,
        })
      }
    }
  }

  handleSearchFollowConfig = () => {
    const { WxModel } = this.props
    const { getFollowConfig } = WxModel

    getFollowConfig()
  }

  render() {
    const { WxModel } = this.props
    const { qrcodeTicket } = this.state
    const { followConfig } = WxModel

    if (followConfig && followConfig.context) {
      document.title = followConfig.context
    }

    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }} layout='row' layout-align='center center'>
        <div className='follow-qrcode-container'>
          {qrcodeTicket && <img src={ `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ qrcodeTicket }` } alt='' />}
          {/* <span>{followConfig && followConfig.context}</span> */}
        </div>
        {followConfig && <div className='follow-bg' style={{ backgroundImage: `url(${ followConfig.backImage })` }} />}
      </div>
    )
  }
}

export default FollowPage
