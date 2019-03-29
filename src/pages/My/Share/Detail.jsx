import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Toast } from 'antd-mobile'
import { parse } from 'qs'
import News from '@components/News'
import { BASE_PATH, FOLLOW_PAGE_URL } from '@utils/const'
import { getUserInfo } from '@utils/cache'
import { base64encode } from '@utils/tool'
import { JS_API_LIST } from '@utils/config'
import { wxConfig, wxShareTimeline, wxShareAppMessage } from '@utils/wx'

const {
  NewsTitle,
  UserPanel,
  SharePanel,
  NewsContext,
  Statement,
  QrcodeArea,
} = News

@inject(
  'WxModel',
  'NewsModel',
  'UserModel',
)
@observer
class MyShareDetailPage extends Component {
  state = {
    userInfo:     getUserInfo(),
    qrcode:       '',
    panelVisible: true,
    status:       1,
  }

  componentDidMount() {
    this.init()
  }

  init() {
    document.title = '我的热文'

    const { location } = this.props
    const { search } = location
    const params = search.indexOf('?') ? parse(search.indexOf('?')[1]) : null

    this.setState({
      status: params.status || 1,
    })

    this.handleSearchQrcode()
    this.handleSearchUserInfo()
    this.handleSearchTemplate()
    this.handleSearchNewsDetail()
  }

  handleSearchQrcode = async () => {
    const { userInfo } = this.state
    const { id } = userInfo
    const params = {
      type: 1,
      id,
    }
    const baseUrl = 'https://tool.oschina.net/action/qrcode/generate'
    const followPageUrl = `${ FOLLOW_PAGE_URL }?params=${ base64encode(params) }`
    // const followPageUrl = `${ FOLLOW_PAGE_URL }`

    this.setState({
      qrcode: `${ baseUrl }?data=${ followPageUrl }&output=image%2Fjpeg&error=L&type=0&margin=4&size=4&${ new Date().getTime() }`,
    })
  }

  handleSearchUserInfo = () => {
    const { UserModel } = this.props
    const { getUserDetailInfo } = UserModel

    getUserDetailInfo()
  }

  handleSearchTemplate = () => {
    const { NewsModel } = this.props
    const { getNewsTemplate } = NewsModel

    getNewsTemplate()
  }

  handleSearchNewsDetail = async() => {
    const { NewsModel, match } = this.props
    const { getNewsDetail } = NewsModel
    const { params } = match

    const result = await getNewsDetail(params)

    if (result) {
      this.handleWxShareConfig()
    }
  }

  handleWxShareConfig = async () => {
    const { WxModel, NewsModel, UserModel } = this.props
    const { userInfo } = this.state
    const { getWxConfig } = WxModel
    const { shareNews } = UserModel
    const { newsDetail, toggleShareVisible } = NewsModel

    const { id: userId } = userInfo
    const { id: newsId, title, thumbnail_pic_s } = newsDetail

    const desc = '麻烦帮我看下新闻，我要免费拿礼品，还包邮到家，爱你哟～'
    const url = window.location.href
    const wxConfigResult = await getWxConfig({ url })

    if (wxConfigResult) {
      const { appId, nonceStr, signature, timestamp  } = wxConfigResult
      const configResult = await wxConfig(appId, timestamp, nonceStr, signature, JS_API_LIST)

      if (configResult) {
        const shareUrl = `${ window.location.host }${ BASE_PATH }/activity/news/${ newsId }?params=${ base64encode(userInfo) }`

        wxShareAppMessage(title, desc, shareUrl, thumbnail_pic_s).then(async result => {
          if (result) {
            const shareResult = await shareNews({ newsId, type: 1, userId })

            if (shareResult) {
              toggleShareVisible(false)
              Toast.show('分享成功')
            }
          }
        })

        wxShareTimeline(title, url, thumbnail_pic_s).then(async result => {
          if (result) {
            const shareResult = await shareNews({ newsId, type: 1, userId })

            if (shareResult) {
              toggleShareVisible(false)
              Toast.show('分享成功')
            }
          }
        })
      }
    }
  }

  handleToggleClick = () => {
    const { panelVisible } = this.state

    this.setState({
      panelVisible: !panelVisible,
    })
  }

  handleShareClick = () => {
    const { history } = this.props
    const { userInfo } = this.state
    const { id } = userInfo
    const params = {
      type: 1,
      id,
    }

    history.push(`${ BASE_PATH }/follow?params=${ base64encode(params) }`)
  }

  render() {
    const { NewsModel, UserModel } = this.props
    const { userInfo, qrcode, status, panelVisible } = this.state
    const { newsTemplate, newsDetail } = NewsModel
    const { userDetailInfo } = UserModel

    if (!newsDetail) return null

    document.title = newsDetail.title

    const { title, date, author_name, context, readCount, shareCount, reprintCount } = newsDetail
    // const { jhNews } = newsDetail
    // const { title, date, author_name, context, readCount, shareCount } = jhNews

    return (
      <div className='view-container relatived'>
        <i className={ `news-status ${ status === 1 ? 'process' : 'complete' }` } />
        <NewsTitle title={ title } date={ date } author={ author_name } />
        <UserPanel userInfo={ userInfo } templateInfo={ newsTemplate } onClick={ this.handleToggleClick } />
        {panelVisible && <SharePanel userInfo={ userDetailInfo } templateInfo={ newsTemplate } onClick={ this.handleShareClick } />}
        <NewsContext context={ context } readCount={ readCount } shareCount={ shareCount } reprintCount={ reprintCount } />
        <Statement context={ newsTemplate && newsTemplate.exemption } />
        <QrcodeArea qrcode={ qrcode } desc={ newsTemplate && newsTemplate.qrCodeGuide } />
      </div>
    )
  }
}

export default MyShareDetailPage
