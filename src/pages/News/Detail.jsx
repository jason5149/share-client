import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import News from '@components/News'
import ActionBtn from '@components/ActionBtn'
import { BASE_PATH } from '@utils/const'
import { getWxUserInfo } from '@utils/cache'
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
)
@observer
class NewsDetailPage extends Component {
  state = {
    userInfo: getWxUserInfo(),
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.handleWxShareConfig()
    this.handleSearchNewsDetail()
  }

  handleWxShareConfig = async () => {
    const { NewsModel, match } = this.props
    const { userInfo } = this.state
    const { shareNews } = NewsModel
    const { params } = match
    const { id } = userInfo

    const shareTimelineResult = await wxShareTimeline()
    const shareAppMessageResult = await wxShareAppMessage()

    if (shareTimelineResult || shareAppMessageResult) {
      const result = await shareNews({ newsId: params.id, type: 0, userId: id })

      console.log(result)
    }
  }

  handleSearchNewsDetail = () => {
    const { NewsModel, match } = this.props
    const { getNewsDetail } = NewsModel
    const { params } = match

    getNewsDetail(params)
  }

  handleActionClick = () => {
    console.log('share')
  }

  render() {
    const { NewsModel } = this.props
    const { userInfo } = this.state
    const { newsDetail } = NewsModel

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
      </div>
    )
  }
}

export default NewsDetailPage