import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NewsTitle from '@components/NewsTitle'
import UserModule from '@components/UserModule'
import ShareInfo from '@components/ShareInfo'
import NewsContext from '@components/NewsContext'
import { getWxUserInfo } from '@utils/cache'

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

  componentWillUnmount() {
    this.destroy()
  }

  init() {
    document.title = '热文详情'

    this.handleSearchNewsDetail()
  }

  destroy() {
    const { NewsModel } = this.props
    const { emptyNewsDetail } = NewsModel

    emptyNewsDetail()
  }

  handleSearchNewsDetail = () => {
    const { NewsModel, match } = this.props
    const { getNewsDetail } = NewsModel
    const { params } = match
    const { id } = params

    getNewsDetail({ id })
  }

  render() {
    const { NewsModel } = this.props
    const { userInfo } = this.state
    const { newsDetail } = NewsModel

    if (!newsDetail) {
      return null
    }

    const { 
      title, 
      date,
      author_name,
      context, 
      readCount,
      shareCount, 
    } = newsDetail

    return (
      <div className='page-container'>
        <NewsTitle title={ title } date={ date } author={ author_name } />
        <UserModule userInfo={ userInfo } />
        <ShareInfo userInfo={ userInfo } />
        <NewsContext 
          context={ context } 
          readCount={ readCount } 
          shareCount={ shareCount }
        />
      </div>
    )
  }
}

export default NewsDetailPage