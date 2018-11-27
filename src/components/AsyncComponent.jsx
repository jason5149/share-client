import React, { Component } from 'react'

export default importComponent => {
  class AsyncComponent extends Component {
    state = {
      component: null,
    }

    async componentDidMount() {
      const { default: component } = await importComponent()

      this.setState({
        component,
      })
    }
  
    render() {
      const { component: C } = this.state

      return C ? <C { ...this.props } /> : null
    }
  }

  return AsyncComponent
}