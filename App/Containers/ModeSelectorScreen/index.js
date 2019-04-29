import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { compose, withPropsOnChange } from 'recompose'
import { get as _get } from 'lodash'
import * as Animatable from 'react-native-animatable'
import { Metrics, Images, Colors, Fonts, ApplicationStyles } from '@Themes'

import {
    Wrapper,
    ImageWrapper,
    BarcodeImage,
    WelcomeTextWrapper,
    WelcomeText,
    SelectText,
    SelectOption,
    SelectImageWrapper,
    OptionImage,
    DescriptionWrapper,
    UpText,
    BottomText,
    ArrowImageWrapper,
    ArrowImage,
    ExplanationText
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
        <ImageWrapper>
          <BarcodeImage source={Images.barcodeBlack} />
        </ImageWrapper>
        <WelcomeTextWrapper>
          <WelcomeText>Welcome to the Digitization App</WelcomeText>
        </WelcomeTextWrapper>
        <SelectText>Which best describes you?</SelectText>
        <SelectOption>
          <SelectImageWrapper width={39} height={32}>
            <OptionImage source={Images.camera} />
          </SelectImageWrapper>
          <DescriptionWrapper>
            <UpText>I’m Taking Photos</UpText>
            <BottomText>Enter Photo Mode</BottomText>
          </DescriptionWrapper>
          <ArrowImageWrapper>
            <ArrowImage source={Images.arrowRight} />
          </ArrowImageWrapper>
        </SelectOption>
        <SelectOption>
          <SelectImageWrapper width={35} height={48}>
            <OptionImage source={Images.checkProduct} />
          </SelectImageWrapper>
          <DescriptionWrapper>
            <UpText>I’m Pulling Products from Shelves</UpText>
            <BottomText>Enter Runner Mode</BottomText>
          </DescriptionWrapper>
          <ArrowImageWrapper>
            <ArrowImage source={Images.arrowRight} />
          </ArrowImageWrapper>
        </SelectOption>
        <ExplanationText>You’ll be able to change this later</ExplanationText>
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
