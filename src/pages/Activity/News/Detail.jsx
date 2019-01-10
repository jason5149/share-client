import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Toast } from 'antd-mobile'
import News from '@components/News'
// import ActionBtn from '@components/ActionBtn'
import { BASE_PATH, FOLLOW_PAGE_URL } from '@utils/const'
import { base64encode, base64decode } from '@utils/tool'
import { JS_API_LIST } from '@utils/config'
import { wxConfig, wxShareTimeline, wxShareAppMessage } from '@utils/wx'

const { 
  NewsTitle, 
  UserPanel, 
  SharePanel, 
  NewsContext, 
  Statement, 
  ShareDirector,
  QrcodeArea,
} = News

@inject(
  'WxModel',
  'NewsModel',
  'UserModel',
)
@observer
class NewsDetailPage extends Component {
  state = {
    isRead:       false,
    panelVisible: true,
    qrcode:       '',
    params:       null,
  }

  count = 0

  timer = null

  componentDidMount() {
    this.init()
  }

  componentWillUnmount() {
    this.destroy()
  }

  init() {
    document.title = '热文详情'

    /* eslint-disable-next-line */
    const search = new URLSearchParams(window.location.search)
    const params = search.get('params') ? base64decode(search.get('params')) : ''

    this.setState({
      params,
    }, () => {
      this.handleSearchQrcode()
      this.handleSearchUserInfo()
      this.handleSearchTemplate()
      this.handleSearchNewsDetail()
    })
  }

  destroy() {
    this.stopReadAction()
  }

  startReadAction = () => {
    this.timer = setInterval(() => {
      if (this.count < 5) {
        ++this.count
      } else {
        this.handleReadAction()
        this.stopReadAction()
      }
    }, 1000)
  }

  stopReadAction = () => {
    clearInterval(this.timer)
  }

  handleSearchQrcode = async () => {
    const { params } = this.state
    const { id } = params

    const baseUrl = 'https://tool.oschina.net/action/qrcode/generate'
    const followPageUrl = `${ FOLLOW_PAGE_URL }?params=${ base64encode({
      type: 1,
      id,
    }) }`
    // const followPageUrl = `${ FOLLOW_PAGE_URL }`

    this.setState({
      qrcode: `${ baseUrl }?data=${ followPageUrl }&output=image%2Fjpeg&error=L&type=0&margin=4&size=4&${ new Date().getTime() }`,
    })
  }

  handleSearchUserInfo = () => {
    const { UserModel } = this.props
    const { params } = this.state
    const { getUserDetailInfo } = UserModel
    const { id: userId } = params

    getUserDetailInfo({ userId })
  }

  handleSearchTemplate = () => {
    const { NewsModel } = this.props
    const { getNewsTemplate } = NewsModel
    
    getNewsTemplate()
  }

  handleSearchNewsDetail = async() => {
    const { NewsModel, match } = this.props
    const { isRead } = this.state
    const { getNewsDetail } = NewsModel
    const { params } = match

    const result = await getNewsDetail(params)

    if (result) {
      if (!isRead) {
        this.startReadAction()
      }
      
      this.handleWxShareConfig()
    }
  }

  handleWxShareConfig = async () => {
    const { WxModel, NewsModel, UserModel } = this.props
    const { params: userInfo } = this.state
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
        const shareUrl = `${ url }?userId=${ userId }`

        wxShareTimeline(title, url, thumbnail_pic_s).then(async result => {
          if (result) {
            const shareResult = await shareNews({ newsId, type: 0, userId })

            if (shareResult) {
              toggleShareVisible(false)
              Toast.show('分享成功')
            }
          }
        })
        
        wxShareAppMessage(title, desc, shareUrl, thumbnail_pic_s).then(async result => {
          if (result) {
            const shareResult = await shareNews({ newsId, type: 0, userId })

            if (shareResult) {
              toggleShareVisible(false)
              Toast.show('分享成功')
            }
          }
        })
      }
    }
  }

  handleReadAction = async () => {
    const { UserModel, match } = this.props
    const { params } = this.state
    const { recordReadAction } = UserModel
    const { id: userId } = params
    const { id: newsId } = match.params

    const result = await recordReadAction({ newsId, userId })

    if (result) {
      this.setState({
        isRead: true,
      }, () => {
        this.handleSearchNewsDetail()
      })
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
    const { params } = this.state
    const { id } = params
    const result = {
      type: 1,
      id,
    }

    history.push(`${ BASE_PATH }/follow?params=${ base64encode(result) }`)
  }

  handleActionClick = () => {
    const { NewsModel } = this.props
    const { toggleShareVisible } = NewsModel

    toggleShareVisible(true)
  }

  render() {
    const { NewsModel, UserModel } = this.props
    const { params: userInfo, qrcode, panelVisible } = this.state
    const { newsTemplate, newsDetail, shareVisible, toggleShareVisible } = NewsModel
    const { userDetailInfo } = UserModel

    if (!newsDetail) return null

    const { title, date, author_name, context, readCount, shareCount } = newsDetail

    return (
      <div className='view-container'>
        <NewsTitle title={ title } date={ date } author={ author_name } />
        <UserPanel userInfo={ userInfo } templateInfo={ newsTemplate } onClick={ this.handleToggleClick } />
        {panelVisible && <SharePanel userInfo={ userDetailInfo } templateInfo={ newsTemplate } onClick={ this.handleShareClick } />}
        <NewsContext context={ context } readCount={ readCount } shareCount={ shareCount } />
        <Statement context={ newsTemplate && newsTemplate.exemption } />
        <QrcodeArea qrcode={ qrcode } desc={ newsTemplate && newsTemplate.qrCodeGuide } />
        {/* <ActionBtn text='分享赚积分' onClick={ this.handleActionClick } /> */}
        {shareVisible && <ShareDirector onClick={ () => toggleShareVisible(false) } />}
      </div>
    )
  }
}

export default NewsDetailPage