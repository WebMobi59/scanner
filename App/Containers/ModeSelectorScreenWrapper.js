import React from 'react'
import ModeSelectorScreen from './ModeSelectorScreen'

export default class ModeSelectorScreenWrapper extends React.Component {
  render () {
    return <ModeSelectorScreen {...this.props} />
  }
}
