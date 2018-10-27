import React, { Component } from 'react'
import { Tabs } from 'antd-mobile'

class NewsTabs extends Component {
  state = {}

  render() {
    const { tabs, children } = this.props

    return (
      <div className='news-tabs-container'>
        <Tabs 
          tabs={ tabs } 
          renderTabBar={ props => 
            <Tabs.DefaultTabBar { ...props } page={ 6 } /> 
          }
        >
          {children}
        </Tabs>
      </div>
    )
  }
}

export default NewsTabs