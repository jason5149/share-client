import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Toast } from 'antd-mobile'
import News from '@components/News'
import ActionBtn from '@components/ActionBtn'
import { getUserInfo } from '@utils/cache'
import { wxShareTimeline, wxShareAppMessage } from '@utils/wx'

const { 
  NewsTitle, 
  UserPanel, 
  SharePanel, 
  NewsContext, 
  Statement, 
  ShareDirector,
} = News

@inject(
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

    this.startReadAction()
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

    await getNewsDetail(params)

    this.handleWxShareConfig()
  }

  handleWxShareConfig = async () => {
    const { NewsModel } = this.props
    const { userInfo } = this.state
    const { shareNews, newsDetail } = NewsModel
    const { id: userId } = userInfo
    const { id: newsId, title, thumbnail_pic_s } = newsDetail
    const desc = '麻烦帮我看下新闻，我要免费拿礼品，还包邮到家，爱你哟～'

    const shareTimelineResult = await wxShareTimeline(title, window.location.href, thumbnail_pic_s)
    const shareAppMessageResult = await wxShareAppMessage(title, desc, window.location.href, thumbnail_pic_s)

    if (shareTimelineResult || shareAppMessageResult) {
      console.log({ newsId, type: 0, userId })
      const result = await shareNews({ newsId, type: 0, userId })

      if (result) {
        Toast.show('分享成功')
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