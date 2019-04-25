import React from 'react'
import ChecklistScreen from './ChecklistScreen'

export default class ChecklistScreenWrapper extends React.Component {
  render () {
    return <ChecklistScreen {...this.props} />
  }
}
