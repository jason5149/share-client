import './polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import store from '@models'
import App from './App'
import '@assets/style/index.scss'

render(
  <Provider { ...store }>
    <App />
  </Provider>,
  document.getElementById('root'),
)
