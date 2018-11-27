import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { getNewsList, getNewsDetail } from '@services/news'

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
  activedTab = '热门'

  @observable
  newsListTotal = 0

  @observable
  newsListPageIndex = 1

  @observable
  newsDetail = null

  @action
  setActivedTab = tab => this.activedTab = tab

  @action
  getNewsList = async params => {
    const result = await getNewsList(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    if (!result.body) {
      return false
    }

    this.newsListPageIndex = params.currentPage
    this.newsListTotal = result.body.page.totalNum
    
    if (params.currentPage >= result.body.page.totalPage) {
      this.hasMore = false
      return false
    }

    return result.body.list
  }

  @action
  getNewsDetail = async params => {
    const result = await getNewsDetail(params)

    if (result.code !== '10000') {
      Toast.show(result.message, 1)
      return false
    }

    this.newsDetail = result.body
  }

  @action
  emptyNewsDetail = () => this.newsDetail = null
}

export default new NewsModel()