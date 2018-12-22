import React, { Component } from 'react'

class QrcodeArea extends Component {
  render() {
    const { qrcode, desc } = this.props

    return (
      <div className='qrcode-area-container'>
        {/* {qrcode && <img src={ `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ encodeURIComponent(qrcode) }` } alt='' />} */}
        {qrcode && <img src={ qrcode } alt='' />}
        <div className='qrcode-desc'>{ desc }</div>
      </div>
    )
  }
}

export default QrcodeArea