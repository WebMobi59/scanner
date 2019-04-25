import PropTypes from 'prop-types'
import React from 'react'
import {View, Text, Alert, ScrollView} from 'react-native'
import { compose, withPropsOnChange } from 'recompose'
import { get as _get } from 'lodash'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import _ from 'lodash'
import VersionNumber from 'react-native-version-number'

import withApollo from '../Decorators/withApollo'
import toTitleCase from '../Utils/toTitleCase'
import { Metrics, Colors, Images } from '../Themes'
import ValidatedFormScreen from './ValidatedFormScreen'
import Button from '../Components/Button'
import CloseButton from '../Components/CloseButton'
import ApolloClient from '../Lib/Apollo'
import withData from '../Decorators/withData'
import SageActions from '../Redux/SageRedux'

// React Apollo
import { withAuth, withLogout } from '../GraphQL/Account/decorators'

// Styles
import Styles from './Styles/SettingsScreenStyles'

class SettingsScreen extends ValidatedFormScreen {
  static propTypes = {
    settingApplicationData: PropTypes.bool,
    resettingApplicationData: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    tag: PropTypes.string,
    setTag: PropTypes.func.isRequired,
    setAutoQuickSync: PropTypes.func.isRequired,
    resetUserStats: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      displayName: props.user.displayName,
      email: props.user.email,
      visibleHeight: Metrics.screenHeight,
      loading: false
    }

    this.scrollY = 0
  }

  componentWillReceiveProps(newProps) {
    const { user: oldUser } = this.props
    const { user: newUser } = newProps
    if (newUser) {
      if (oldUser.displayName !== newUser.displayName) {
        this.setState({ displayName: newUser.displayName })
      }
      if (oldUser.email !== newUser.email) {
        this.setState({ email: newUser.email })
      }
    }
  }

  handlePressLogout = async () => {
    this.setState({ loading: true }, async () => {
      try {
        await this.props.logout()
        ApolloClient.resetStore()
        // this.setState({ loading: false })
        this.props.handleReset(this.state)
        this.props.resetNavigation()
      } catch (e) {
        this.setState({ loading: false })
        this.props.handleReset(this.state)
        this.props.resetNavigation()
      }
    })
  }

  handleLearnHowToUsePress = () => {
    this.props.navigation.navigate('OnboardingScreen', { fromAccount: true })
  }

  handleResetAllTheData = () => {
    const resetAllTheData = () => {
      this.props.data.removeAllData()
      this.props.resetUserStats()
    }

    Alert.alert(
      'Delete all data',
      'You are about to delete all the photos and statuses on this phone!\nDo not do this unless asked to!',
      [
        { text: 'Delete', onPress: resetAllTheData, style: 'destructive' },
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel')
          }
        }
      ]
    )
  }

  handleClose = () => this.props.navigation.goBack()

  handleSelectStore = () => this.props.navigation.navigate('StoreSelectorScreen', { transition: 'card' })

  handleSelectPartner = () => this.props.navigation.navigate('PartnerSelectorScreen', { transition: 'card' })

  handleProductChecklist = () => this.props.navigation.navigate('ChecklistScreen', { transition: 'card' })

  render() {
    const { data, tag, setTag, autoQuickSync, setAutoQuickSync, auth, prStores, prUserUpdate } = this.props
    const { loading } = this.state

    return (
      <View style={{ height: this.state.visibleHeight, backgroundColor: Colors.primary }}>
        <ScrollView
          style={Styles.mainContainer}
          contentContainerStyle={{}}
        >
            <Animatable.View style={[Styles.accountContainer, { height: this.state.visibleHeight }]}>
              <View style={Styles.navBar}>
                <CloseButton onPress={this.handleClose} />
              </View>
              <View style={Styles.infoSection}>
                <Info label="Logged in as:" value={auth.session.user.displayName} />
                <Info
                  label="Store:"
                  value={toTitleCase(_.get(_.find(prStores.result, { key: auth.session.user.photoEntry.store }), 'name'))}
                />
                <Info label="App version:" value={`v${VersionNumber.appVersion} — Build ${VersionNumber.buildVersion}`} />
              </View>
              <Button dark onPress={this.handleProductChecklist} text="Product Checklist" />
              <Button onPress={this.handleSelectPartner} text="Select Partner" />
              <Button onPress={this.handleSelectStore} text="Select Store" />
              <Button onPress={this.handleResetAllTheData} text="RESET ALL DATA" style={Styles.resetButton} />
              <Button loading={loading} onPress={this.handlePressLogout} text="Log Out" style={Styles.logoutButton} />
            </Animatable.View>
        </ScrollView>
      </View>
    )
  }
}

const enhance = compose(
  withAuth,
  withData,
  withPropsOnChange(
    (props, nextProps) =>
      _get(props, 'auth.session.isAuthenticated', false) !== _get(nextProps, 'auth.session.isAuthenticated', false),
    ({ auth }) => ({
      isAuthenticated: _get(auth, 'session.isAuthenticated', false),
      user: _get(auth, 'session.user', {
        displayName: '',
        email: ''
      })
    })
  ),
  connect(
    ({ sage: { tag, autoQuickSync, userStats } }) => ({ tag, autoQuickSync, userStats }),
    {
      setTag: SageActions.setTag,
      setAutoQuickSync: SageActions.setAutoQuickSync,
      resetUserStats: SageActions.resetUserStats
    }
  ),
  withApollo(
    'mutation prUserUpdate',
    { store: 'String', priority: 'String' },
    '... Session',
    require('../GraphQL/Account/fragments/session').default
  ),
  withLogout,
  withAuth,
  withApollo('query prStores')
)

export default enhance(SettingsScreen)

const Info = ({ label, value }) => (
  <View style={Styles.info}>
    <Text style={Styles.infoLabel}>{label}</Text>
    <Text>{value}</Text>
  </View>
)
