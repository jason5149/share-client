import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Toast } from 'antd-mobile'
import News from '@components/News'
import { base64decode } from '@utils/tool'
// import ActionBtn from '@components/ActionBtn'
// import { JS_API_LIST } from '@utils/config'
// import { wxConfig, wxShareTimeline, wxShareAppMessage } from '@utils/wx'

const { 
  NewsTitle, 
  UserPanel, 
  SharePanel, 
  NewsContext, 
  Statement, 
  ShareDirector,
  QrcodeArea,
} = News

@inject(
  'WxModel',
  'NewsModel',
  'UserModel',
)
@observer
class NewsDetailPage extends Component {
  state = {
    isRead: false,
    qrcode: '',
    // params: null,
  }

  count = 0

  timer = null

  componentDidMount() {
    this.init()
  }

  componentWillUnmount() {
    this.destroy()
  }

  init() {
    document.title = '热文详情'

    /* eslint-disable-next-line */
    const search = new URLSearchParams(window.location.search)
    const params = search.get('params') ? base64decode(search.get('params')) : ''

    console.log(params)

    // this.setState({
    //   params,
    // })
    // this.handleSearchQrcode()
    // this.handleSearchUserInfo()
    // this.handleSearchNewsDetail()
  }

  destroy() {
    this.stopReadAction()
  }

  startReadAction = () => {
    this.timer = setInterval(() => {
      if (this.count < 5) {
        ++this.count
      } else {
        this.handleReadAction()
        this.stopReadAction()
      }
    }, 1000)
  }

  stopReadAction = () => {
    clearInterval(this.timer)
  }

  handleSearchQrcode = async () => {
    const { WxModel } = this.props
    const { userId } = this.state
    const { getTemporaryQrcode } = WxModel

    const result = await getTemporaryQrcode({ userId })

    if (result) {
      this.setState({
        qrcode: result.ticket,
      })
    }
  }

  handleSearchUserInfo = () => {
    const { UserModel } = this.props
    const { userId } = this.state
    const { getUserDetailInfo } = UserModel

    getUserDetailInfo({ userId })
  }

  handleSearchNewsDetail = async() => {
    const { NewsModel, match } = this.props
    const { isRead } = this.state
    const { getNewsDetail } = NewsModel
    const { params } = match

    const result = await getNewsDetail(params)

    if (result) {
      if (!isRead) {
        this.startReadAction()
      }
      
      // this.handleWxShareConfig()
    }
  }

  // handleWxShareConfig = async () => {
  //   const { WxModel, NewsModel, UserModel } = this.props
  //   const { userInfo } = this.state
  //   const { getWxConfig } = WxModel
  //   const { shareNews } = UserModel
  //   const { newsDetail, toggleShareVisible } = NewsModel
    
  //   const { id: userId } = userInfo
  //   const { id: newsId, title, thumbnail_pic_s } = newsDetail
    
  //   const desc = '麻烦帮我看下新闻，我要免费拿礼品，还包邮到家，爱你哟～'
  //   const url = window.location.href
  //   const wxConfigResult = await getWxConfig({ url })

  //   if (wxConfigResult) {
  //     const { appId, nonceStr, signature, timestamp  } = wxConfigResult
  //     const configResult = await wxConfig(appId, timestamp, nonceStr, signature, JS_API_LIST)
        
  //     if (configResult) {
  //       const shareUrl = `${ url }?userId=${ userId }`
        
  //       wxShareAppMessage(title, desc, shareUrl, thumbnail_pic_s).then(async result => {
  //         if (result) {
  //           const shareResult = await shareNews({ newsId, type: 0, userId })

  //           if (shareResult) {
  //             toggleShareVisible(false)
  //             Toast.show('分享成功')
  //           }
  //         }
  //       })

  //       wxShareTimeline(title, url, thumbnail_pic_s).then(async result => {
  //         if (result) {
  //           const shareResult = await shareNews({ newsId, type: 0, userId })

  //           if (shareResult) {
  //             toggleShareVisible(false)
  //             Toast.show('分享成功')
  //           }
  //         }
  //       })
  //     }
  //   }
  // }

  handleReadAction = async () => {
    const { UserModel, match } = this.props
    const { userId } = this.state
    const { recordReadAction } = UserModel
    const { params } = match
    const { id: newsId } = params

    const result = await recordReadAction({ newsId, userId })

    if (result) {
      this.setState({
        isRead: true,
      }, () => {
        this.handleSearchNewsDetail()
        Toast.show('阅读+1')
      })
    }
  }

  handleActionClick = () => {
    const { NewsModel } = this.props
    const { toggleShareVisible } = NewsModel

    toggleShareVisible(true)
  }

  render() {
    const { NewsModel, UserModel } = this.props
    const { userInfo, qrcode } = this.state
    const { newsDetail, shareVisible, toggleShareVisible } = NewsModel
    const { userDetailInfo } = UserModel

    if (!newsDetail) return null

    const { title, date, author_name, context, readCount, shareCount } = newsDetail

    return (
      <div className='view-container'>
        <NewsTitle title={ title } date={ date } author={ author_name } />
        <UserPanel userInfo={ userInfo } />
        <SharePanel userInfo={ userDetailInfo } />
        <NewsContext context={ context } readCount={ readCount } shareCount={ shareCount } />
        <Statement />
        <QrcodeArea qrcode={ qrcode } />
        {/* <ActionBtn text='分享赚积分' onClick={ this.handleActionClick } /> */}
        {shareVisible && <ShareDirector onClick={ () => toggleShareVisible(false) } />}
      </div>
    )
  }
}

export default NewsDetailPage