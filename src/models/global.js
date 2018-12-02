import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { getBannerList } from '@services/global'

class GlobalModel {
  @observable
  bannerList = [
    { id: 1, title: 'banner 1', src: 'http://wanjia.sh1a.qingstor.com/tour-1.jpg' },
    { id: 2, title: 'banner 2', src: 'http://wanjia.sh1a.qingstor.com/tour-2.jpg' },
    { id: 3, title: 'banner 3', src: 'http://wanjia.sh1a.qingstor.com/tour-3.jpg' },
  ]

  myTabs = [
    { title: '进行中' },
    { title: '已完成' },
  ]

  @action
  getBannerList = async () => {
    Toast.loading('加载中', 1)

    const result = await getBannerList()

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    Toast.hide()
    
    this.bannerList = result.body
  }
}

export default new GlobalModel()