import { observable, action } from 'mobx'
import { Toast } from 'antd-mobile'
import { getNewsList, getNewsDetail } from '@services/news'

class NewsModel {
  @observable
  newsTabs = [
    { title: '头条' },
    { title: '社会' },
    { title: '国内' },
    { title: '国际' },
    { title: '娱乐' },
    { title: '体育' },
    { title: '军事' },
    { title: '科技' },
    { title: '财经' },
    { title: '时尚' },
  ]

  @observable
  activedTab = '头条'

  @observable
  newsListTotal = 0

  @observable
  newsListPageIndex = 1

  @observable
  newsDetail = null

  @observable
  shareVisible = false

  @action
  setActivedTab = tab => this.activedTab = tab

  @action
  toggleShareVisible = () => this.shareVisible = !this.shareVisible

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

    this.activedTab = params.category
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

    return true
  }

  @action
  emptyNewsDetail = () => this.newsDetail = null
}

export default new NewsModel()