/* eslint-disable */
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { BASE_PATH } from '@utils/const'
import { getWxUserInfo } from '@utils/cache'

export default ({ component: Component, ...rest }) => (
  <Route 
    { ...rest }
    render={ props => {
      const wxUserInfo = getWxUserInfo()
      // const wxUserInfo = null

      if (wxUserInfo) {
        return <Component { ...props } />
      } else {
        return <Redirect to={ `${ BASE_PATH }/auth` } />
      }
    } }
  />
)