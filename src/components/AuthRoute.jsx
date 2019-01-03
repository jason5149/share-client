/* eslint-disable */
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { BASE_PATH } from '@utils/const'
import { getWxUserInfo } from '@utils/cache'

export default ({ component: Component, ...rest }) => (
  <Route
    { ...rest }
    render={ props => {
      // const wxUserInfo = getWxUserInfo()
      const wxUserInfo = {"subscribe":null,"openId":"owzYd1Mz9ualgzcuZ5crCSmtaH1s","nickname":"Jason","sexDesc":"男","sex":1,"language":"zh_CN","city":"杨浦","province":"上海","country":"中国","headImgUrl":"http://thirdwx.qlogo.cn/mmopen/vi_32/IhGBSrcPDYxpuib46cyT3CpnEwNOUMib2tbEYYxcACLGIiaibWz76diaqbmOzSK7fe9BaTS55nGNNFxtDKEsfpMqSOA/132","subscribeTime":null,"unionId":null,"remark":null,"groupId":null,"tagIds":null,"privileges":[],"subscribeScene":null,"qrScene":null,"qrSceneStr":null}

      if (wxUserInfo) {
        return <Component { ...props } />
      } else {
        return <Redirect to={ `${ BASE_PATH }/auth` } />
      }
    } }
  />
)
