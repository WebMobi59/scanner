import React, { PureComponent } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import ScannerScreen from './ScannerScreen'
import AlertActions from '../Redux/AlertRedux'
import BarcodeActions from '../Redux/BarcodeRedux'
import ApplicationActions from '../Redux/ApplicationRedux'
import { withAuth } from '../GraphQL/Account/decorators'

class ScannerScreenWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      canNavigate: true
    }
  }

  unblockNavigation = () => {
    this.setState({ canNavigate: true })
  }

  blockNavigation = (cb = () => {}) => {
    if (this.state.canNavigate) {
      this.setState(
        {
          canNavigate: false
        },
        cb
      )
    }
  }

  render() {
    const { navigation, populateAlert, currentBarcode, resetBarcode, setApplicationData, auth } = this.props

    const { canNavigate } = this.state

    return (
      <ScannerScreen
        navigation={navigation}
        populateAlert={populateAlert}
        currentBarcode={currentBarcode}
        resetBarcode={resetBarcode}
        canNavigate={canNavigate}
        blockNavigation={this.blockNavigation}
        unblockNavigation={this.unblockNavigation}
        setApplicationData={setApplicationData}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  currentBarcode: state.barcode.currentBarcode
})

const mapDispatchToProps = (dispatch) => ({
  setApplicationData: (key, value) => dispatch(ApplicationActions.applicationDataSetRequest(key, value)),
  populateAlert: (message, type = 'success', title = 'Barcode Scan') =>
    dispatch(AlertActions.alertPopulate(message, type, title)),
  resetBarcode: () => dispatch(BarcodeActions.barcodeResetSuccess())
})

export default withAuth(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ScannerScreenWrapper)
)
