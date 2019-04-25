import React from 'react'
import StoreSelectorScreen from './StoreSelectorScreen'

export default class StoreSelectorScreenWrapper extends React.Component {
  render () {
    return <StoreSelectorScreen {...this.props} />
  }
}
