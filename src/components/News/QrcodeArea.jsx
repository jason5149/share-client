import React, { Component } from 'react'

class QrcodeArea extends Component {
  render() {
    const { qrcode, desc } = this.props

    document.title = desc || '关注二维码'

    return (
      <div className='qrcode-area-container'>
        {/* {qrcode && <img src={ `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ encodeURIComponent(qrcode) }` } alt='' />} */}
        {qrcode && <img src={ qrcode } alt='' />}
        <div className='qrcode-desc'>关注二维码</div>
      </div>
    )
  }
}

export default QrcodeArea