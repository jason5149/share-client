import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject(
  'NewsModel',
)
@observer
class NewsDetailPage extends Component {
  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '热文详情'

    this.handleSearchNewsDetail()
  }

  handleSearchNewsDetail = () => {
    const { NewsModel, match } = this.props
    const { getNewsDetail } = NewsModel
    const { params } = match
    const { id } = params

    getNewsDetail({ id })
  }

  render() {
    return (
      <div className='page-container'>
        NewsDetailPage
      </div>
    )
  }
}

export default NewsDetailPage