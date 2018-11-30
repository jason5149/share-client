import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { getPrizeList } from '@services/prize'

class PrizeModel {
  @observable
  prizeListTotal = 0

  @observable
  prizeListPageIndex = 1

  @action
  getPrizeList = async params => {
    const result = await getPrizeList(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    if (!result.body) {
      return false
    }

    this.prizeListPageIndex = params.currentPage
    this.prizeListTotal = result.body.page.totalNum

    if (params.currentPage !== 1 && params.currentPage >= result.body.page.totalPage) {
      this.hasMore = false
      return false
    }

    return result.body.list
  }
}

export default new PrizeModel()