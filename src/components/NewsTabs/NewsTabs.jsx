import React, { Component } from 'react'
import { Tabs } from 'antd-mobile'

class NewsTabs extends Component {
  render() {
    const { tabs, children } = this.props

    return (
      <Tabs 
        className='news-tabs-container'
        tabs={ tabs } 
        renderTabBar={ props => 
          <Tabs.DefaultTabBar { ...props } page={ 6 } /> 
        }
      >
        {children}
      </Tabs>
    )
  }
}

export default NewsTabs