import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { getNewsList } from '@services/news'

class NewsModel {
  @observable
  newsTabs = [
    { title: '热门' },
    { title: '娱乐' },
    { title: '段子' },
    { title: '财经' },
    { title: '体育' },
    { title: '时尚' },
    { title: '军事' },
    { title: '汽车' },
  ]

  @observable
  newsListTotal = 0

  @action
  getNewsList = async params => {
    const result = await getNewsList(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    if (result.body) {
      this.newsListTotal = result.body.page.totalNum
    }

    return result.body.list
  }
}

export default new NewsModel()