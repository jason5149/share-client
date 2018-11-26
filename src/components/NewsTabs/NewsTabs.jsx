import React, { Component } from 'react'
import { Tabs } from 'antd-mobile'

class NewsTabs extends Component {
  state = {}

  render() {
    const { tabs, onChange, children } = this.props

    return (
      <div className='news-tabs-container'>
        <Tabs 
          tabs={ tabs } 
          renderTabBar={ props => 
            <Tabs.DefaultTabBar { ...props } page={ 6 } /> 
          }
          onChange={ onChange }
        >
          {children}
        </Tabs>
      </div>
    )
  }
}

export default NewsTabs