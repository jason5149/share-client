import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import AsyncComponent from 'pms-saas-component/lib/async-component'

const NewsTabs = AsyncComponent(() => import('@components/NewsTabs'))
const NewsList = AsyncComponent(() => import('@components/NewsList'))

@inject(
  'BasicModel',
  'UserModel',
)
@observer
class MyNewsPage extends Component {
  state = {
    newsList: [],
  }

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '我的任务'

    this.handleSearchMyNewsList()
  }

  handleSearchMyNewsList = async () => {
    const { UserModel } = this.props
    const { getNewsList } = UserModel

    const newsList = await getNewsList()

    this.setState({
      newsList,
    })
  }

  handleNewsListRefresh = () => {
    
  }

  handleNewsListPageChange = () => {

  }
  
  render() {
    const { BasicModel } = this.props
    const { newsList } = this.state
    const { myTabs } = BasicModel

    return (
      <div className='page-container'>
        <NewsTabs tabs={ myTabs }>
          {newsList.length > 0 && (
          <NewsList 
            list={ newsList } 
            onRefresh={ this.handleNewsListRefresh }
            onReached={ this.handleNewsListPageChange }
          />
          )}
        </NewsTabs>
      </div>
    )
  }
}

export default MyNewsPage