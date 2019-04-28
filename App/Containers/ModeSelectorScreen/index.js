import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { compose, withPropsOnChange } from 'recompose'
import { get as _get } from 'lodash'
import * as Animatable from 'react-native-animatable'
import { Metrics, Images, Colors, Fonts, ApplicationStyles } from '@Themes'

import {
    Wrapper
} from './styles'

// React Apollo
import { withAuth, withCreateAccount, withLogin } from '@GraphQL/Account/decorators'

class ModeSelectorScreen extends PureComponent {

  handleEnterPhotoMode = () => {
    this.props.navigation.navigate('PartnerSelectorScreen', { transition: 'card' })
  }

  handleEnterRunnerMode = () => {
    this.props.navigation.navigate('PartnerSelectorScreen', { transition: 'card' })
  }

  render() {

    return (
      <Wrapper>
        <View key="logoRow" style={Styles.promptRow}>
          <Animatable.Image source={Images.barcodeBlack} animation="fadeIn" />
          <Animatable.Text style={Styles.prompt} animation="fadeIn">
            Welcome to the Digitization App
          </Animatable.Text>
          <Animatable.Text style={Styles.prompt} animation="fadeIn">
            The Pinto Digitization 
          </Animatable.Text>
          <Animatable.Text style={Styles.prompt} animation="fadeIn">
            Which best describes you?
          </Animatable.Text>
        </View>

        <Text style={Styles.inputTitle}>You'll be able to change this later</Text>
      </Wrapper>
    )
  }
}

const enhance = compose(
  withAuth,
  withPropsOnChange(
    (props, nextProps) =>
      _get(props, 'auth.session.isAuthenticated', false) !== _get(nextProps, 'auth.session.isAuthenticated', false),
    ({ auth }) => ({ isAuthenticated: _get(auth, 'session.isAuthenticated', false) })
  ),
  withLogin,
  withCreateAccount
)

export default enhance(ModeSelectorScreen)

import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  root: {
    flex: 1,
    padding: Metrics.doubleBaseMargin,
    paddingTop: Metrics.doubleBaseMargin + Metrics.statusBarHeight,
    backgroundColor: Colors.primary
  },
  promptRow: {
    paddingTop: Metrics.doubleBasePadding,
    paddingBottom: Metrics.basePadding,
    paddingHorizontal: Metrics.basePadding,
    marginTop: 20,
    alignSelf: 'flex-start'
  },
  prompt: {
    ...Fonts.style.normal,
    color: Colors.white
  },
  title: {
    ...Fonts.style.bigHeading,
    textAlign: 'center',
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin * 2,
    color: 'white'
  },
  inputTitle: {
    color: 'white',
    marginTop: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
    fontWeight: 'bold'
  },
  link: {
    color: 'white',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: Metrics.doubleBaseMargin
  },
  button: {
    borderWidth: 0,
    marginVertical: Metrics.doubleBaseMargin
  },
  errorRow: {
    width: Metrics.inputWidth,
    padding: Metrics.basePadding,
    backgroundColor: Colors.pink,
    borderRadius: Metrics.baseBorderRadius,
    flexDirection: 'row',
    alignItems: 'center'
  },
  errorText: {
    ...Fonts.style.small,
    color: Colors.white,
    width: 220,
    marginLeft: Metrics.baseMargin
  }
})
