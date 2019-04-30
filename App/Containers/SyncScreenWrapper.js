import React from 'react';
import SyncScreen from './SyncScreen';

export default class SyncScreenWrapper extends React.Component {
  render () {
    return <SyncScreen {...this.props} />
  }
};
