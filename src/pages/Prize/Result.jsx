import React, { Component } from 'react'
import { BASE_PATH } from '@utils/const'

class PrizeResultPage extends Component {
  handleGoBack = () => {
    const { history } = this.props

    history.push(`${ BASE_PATH }/home`)
  }

  render() {
    return (
      <div className='prize-result-container'>
        <ul>
          <li>兑换成功</li>
          <li>奖品将会在3个工作日内发出，请注意查收哦~</li>
          <li>客服电话：021-88888888</li>
          {/* eslint-disable-next-line */}
          <li onClick={ this.handleGoBack }>{ '点我->赚取积分' }</li>
        </ul>
      </div>
    )
  }
}

export default PrizeResultPage