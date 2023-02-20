import React, { Component } from 'react'
import WithRouter from '../../router/withRouter'

class Content extends Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html:this.props.children}}>
        
      </div>
    )
  }
}

export default WithRouter(Content)
