import React, { Component } from 'react'

class QrcodeArea extends Component {
  render() {
    const { qrcode } = this.props

    return (
      <div className='qrcode-area-container'>
        <img src={ `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ encodeURIComponent(qrcode) }` } alt='' />
      </div>
    )
  }
}

export default QrcodeArea