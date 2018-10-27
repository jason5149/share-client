import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { AsyncComponent } from 'pms-saas-component'
import { getWxUserInfo } from '@utils/cache'
import { BASE_PATH } from '@utils/const'
import { WhiteSpace } from 'antd-mobile'

const ProfilePanel = AsyncComponent(() => import('@components/ProfilePanel'))
const NewsTabs = AsyncComponent(() => import('@components/NewsTabs'))
const NewsList = AsyncComponent(() => import('@components/NewsList'))

@inject(
  'BasicModel',
  'UserModel',
)
@observer
class MyCenterPage extends Component {
  state = {
    userInfo: getWxUserInfo(),
    newsList: [],
  }

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '我的'

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
    console.log('onRefresh')
  }

  handleNewsListPageChange = () => {
    console.log('onReached')
  }

  handlePrizeClick = () => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/my/prize`)
  }

  handleAddressClick = () => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/my/address`)
  }

  render() {
    const { BasicModel } = this.props
    const { userInfo, newsList } = this.state
    const { myTabs } = BasicModel

    return (
      <div className='page-container'>
        <ProfilePanel 
          userInfo={ userInfo }
          onPrizeClick={ this.handlePrizeClick }
          onAddressClick={ this.handleAddressClick }
        />
        <WhiteSpace />
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

export default MyCenterPage