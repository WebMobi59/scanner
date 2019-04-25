import React from 'react'
import PartnerSelectorScreen from './PartnerSelectorScreen'

export default class PartnerSelectorScreenWrapper extends React.Component {
  render() {
    return <PartnerSelectorScreen {...this.props} />
  }
}
