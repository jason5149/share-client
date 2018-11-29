import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Toast } from 'antd-mobile'
import News from '@components/News'
import ActionBtn from '@components/ActionBtn'
import { getUserInfo } from '@utils/cache'
import { JS_API_LIST } from '@utils/config'
// import { wxConfig, wxShareTimeline } from '@utils/wx'
import { wxConfig, wxShareTimeline, wxShareAppMessage } from '@utils/wx'

const { 
  NewsTitle, 
  UserPanel, 
  SharePanel, 
  NewsContext, 
  Statement, 
  ShareDirector,
} = News

@inject(
  'WxModel',
  'NewsModel',
  'UserModel',
)
@observer
class NewsDetailPage extends Component {
  state = {
    userInfo: getUserInfo(),
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

    this.handleSearchNewsDetail()
  }

  destroy() {
    this.stopReadAction()
  }

  startReadAction = () => {
    this.timer = setInterval(() => {
      if (this.count !== 5) {
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

  handleSearchNewsDetail = async() => {
    const { NewsModel, match } = this.props
    const { getNewsDetail } = NewsModel
    const { params } = match

    const result = await getNewsDetail(params)

    if (result) {
      this.startReadAction()

      setTimeout(() => {})
      this.handleWxShareConfig()
    }
  }

  handleWxShareConfig = async () => {
    const { WxModel, NewsModel, UserModel } = this.props
    const { userInfo } = this.state
    const { getWxConfig } = WxModel
    const { shareNews } = UserModel
    const { newsDetail, toggleShareVisible } = NewsModel
    
    const { id: userId } = userInfo
    const { id: newsId, title, thumbnail_pic_s } = newsDetail
    
    const desc = '麻烦帮我看下新闻，我要免费拿礼品，还包邮到家，爱你哟～'
    const url = window.location.href
    const wxConfigResult = await getWxConfig({ url })

    if (wxConfigResult) {
      const { appId, nonceStr, signature, timestamp  } = wxConfigResult
      const configResult = await wxConfig(appId, timestamp, nonceStr, signature, JS_API_LIST)
        
      if (configResult) {
        const shareTimelineResult = await wxShareTimeline(title, url, thumbnail_pic_s)
        const shareAppMessageResult = await wxShareAppMessage(title, desc, url, thumbnail_pic_s)

        if (shareTimelineResult || shareAppMessageResult) {
          const result = await shareNews({ newsId, type: 0, userId })

          if (result) {
            toggleShareVisible()
            Toast.show('分享成功')
          }
        }
      }
    }
  }

  handleReadAction = async () => {
    const { UserModel, match } = this.props
    const { userInfo } = this.state
    const { recordReadAction } = UserModel
    const { params } = match
    const { id: newsId } = params
    const { id: userId } = userInfo

    const result = await recordReadAction({ newsId, userId })

    if (result) {
      this.handleSearchNewsDetail()
      Toast.show('阅读+1')
    }
  }

  handleActionClick = () => {
    const { NewsModel } = this.props
    const { toggleShareVisible } = NewsModel

    toggleShareVisible()
  }

  render() {
    const { NewsModel } = this.props
    const { userInfo } = this.state
    const { newsDetail, shareVisible, toggleShareVisible } = NewsModel

    if (!newsDetail) return null

    const { title, date, author_name, context, readCount, shareCount } = newsDetail

    return (
      <div className='view-container'>
        <NewsTitle title={ title } date={ date } author={ author_name } />
        <UserPanel userInfo={ userInfo } />
        <SharePanel userInfo={ userInfo } />
        <NewsContext context={ context } readCount={ readCount } shareCount={ shareCount } />
        <Statement />
        <ActionBtn text='分享赚积分' onClick={ this.handleActionClick } />
        {shareVisible && <ShareDirector onClick={ toggleShareVisible } />}
      </div>
    )
  }
}

export default NewsDetailPage