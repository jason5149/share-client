import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Toast } from 'antd-mobile'
import News from '@components/News'
import { getUserInfo } from '@utils/cache'
import { wxShareTimeline, wxShareAppMessage } from '@utils/wx'

const { 
  NewsTitle, 
  UserPanel, 
  SharePanel, 
  NewsContext, 
  Statement, 
} = News

@inject(
  'NewsModel',
  'UserModel',
)
@observer
class MyShareDetailPage extends Component {
  state = {
    userInfo: getUserInfo(),
  }

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '热文详情'

    this.handleSearchNewsDetail()
  }

  handleSearchNewsDetail = async() => {
    const { UserModel, match } = this.props
    const { getNewsDetail } = UserModel
    const { params } = match

    const result = await getNewsDetail(params)

    if (result) {
      this.handleWxShareConfig()
    }
  }

  handleWxShareConfig = async () => {
    const { NewsModel, UserModel } = this.props
    const { userInfo } = this.state
    const { shareNews } = NewsModel
    const { newsDetail } = UserModel
    const { id: userId } = userInfo
    const { id: newsId, title, thumbnail_pic_s } = newsDetail
    const desc = '麻烦帮我看下新闻，我要免费拿礼品，还包邮到家，爱你哟～'

    console.log('title', title)
    console.log('desc', desc)
    console.log('imgUrl', thumbnail_pic_s)

    const shareTimelineResult = await wxShareTimeline(title, window.location.href, thumbnail_pic_s)
    const shareAppMessageResult = await wxShareAppMessage(title, desc, window.location.href, thumbnail_pic_s)

    if (shareTimelineResult || shareAppMessageResult) {
      console.log({ newsId, type: 0, userId })
      const result = await shareNews({ newsId, type: 1, userId })

      if (result) {
        Toast.show('转载成功')
      }
    }
  }

  render() {
    const { UserModel } = this.props
    const { userInfo } = this.state
    const { newsDetail } = UserModel

    if (!newsDetail) return null

    const { title, date, author_name, context, readCount, shareCount } = newsDetail

    return (
      <div className='view-container'>
        <NewsTitle title={ title } date={ date } author={ author_name } />
        <UserPanel userInfo={ userInfo } />
        <SharePanel userInfo={ userInfo } />
        <NewsContext context={ context } readCount={ readCount } shareCount={ shareCount } />
        <Statement />
      </div>
    )
  }
}

export default MyShareDetailPage