import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { getPrizeList, getPrizeDetail, exchangePrize } from '@services/prize'

class PrizeModel {
  @observable
  prizeListTotal = 0

  @observable
  prizeListPageIndex = 1

  @observable
  prizeDetail = null

  @action
  getPrizeList = async params => {
    const result = await getPrizeList(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return
    }

    if (!result.body) {
      return false
    }

    this.prizeListPageIndex = params.currentPage
    this.prizeListTotal = result.body.page.totalNum

    if (params.currentPage !== 1 && params.currentPage >= result.body.page.totalPage) {
      this.hasMore = false
      
      if (result.body.list.length <= 0) {
        return false
      }
    }

    return result.body.list
  }

  @action
  getPrizeDetail = async params => {
    const result = await getPrizeDetail(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return
    }

    console.log(result.body)
    this.prizeDetail = result.body
  }

  @action
  exchangePrize = async params => {
    const result = await exchangePrize(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return
    }

    return true
  }
}

export default new PrizeModel()