import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import News from '@components/News'
import { getWxUserInfo } from '@utils/cache'

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
    this.handleSearchNewsDetail()
  }

  handleSearchNewsDetail = () => {
    const { NewsModel, match } = this.props
    const { getNewsDetail } = NewsModel
    const { params } = match

    getNewsDetail(params)
  }


  render() {
    const { NewsModel } = this.props
    const { newsDetail } = NewsModel
    const { userInfo } = this.state

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

export default NewsDetailPage