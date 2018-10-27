import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { getPrizeList } from '@services/prize'

class PrizeModel {
  @observable
  prizeListTotal = 0

  @action
  getPrizeList = async params => {
    const result = await getPrizeList(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    if (result.body) {
      this.prizeListTotal = result.body.list.totalNum
    }

    // return result.body.list
    return [
      {
        id:  1,
        src: 'http://wanjia.sh1a.qingstor.com/tour-1.jpg',
      },
    ]
  }
}

export default new PrizeModel()