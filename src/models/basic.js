import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { getBannerList } from '@services/basic'

class BasicModel {
  @observable
  bannerList = [
    { id: 1, title: 'banner 1', src: 'http://wanjia.sh1a.qingstor.com/tour-1.jpg' },
    { id: 2, title: 'banner 2', src: 'http://wanjia.sh1a.qingstor.com/tour-2.jpg' },
    { id: 3, title: 'banner 3', src: 'http://wanjia.sh1a.qingstor.com/tour-3.jpg' },
  ]

  @action
  getBannerList = async () => {
    const result = await getBannerList()

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    console.log(result.body)
  }
}

export default new BasicModel()