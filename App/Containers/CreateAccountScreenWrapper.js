import React from 'react'
import CreateAccountScreen from './CreateAccountScreen'

export default class CreateAccountScreenWrapper extends React.Component {
  render () {
    return <CreateAccountScreen {...this.props} />
  }
}
