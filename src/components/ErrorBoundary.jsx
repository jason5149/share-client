import React, { Component } from 'react'

class ErrorBoundary extends Component {
  state = { 
    hasError:  false, 
    error:     null,
    errorInfo: null,
  }

  componentDidCatch(error, errorInfo) {
    // Display fallback UI
    this.setState({ 
      hasError: true, 
      error, 
      errorInfo, 
    })
    // You can also log the error to an error reporting service
  }

  render() {
    const { children } = this.props
    const { hasError, error, errorInfo } = this.state

    if (hasError) {
      return (
        <div>
          {error && error.toString()}
          {errorInfo.componentStack}
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary