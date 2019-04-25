import { createStackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import OnboardingScreenWrapper from '../Containers/OnboardingScreenWrapper'
import LoginScreenWrapper from '../Containers/LoginScreenWrapper'
import CreateAccountScreenWrapper from '../Containers/CreateAccountScreenWrapper'
import EnterCodeScreenWrapper from '../Containers/EnterCodeScreenWrapper'
import SettingsScreenWrapper from '../Containers/SettingsScreenWrapper'
import ScannerScreenWrapper from '../Containers/ScannerScreenWrapper'
import CameraScreenWrapper from '../Containers/CameraScreenWrapper'
import ConfirmProductScreenWrapper from '../Containers/ConfirmProductScreenWrapper'
import ConfirmProductPhotosScreenWrapper from '../Containers/ConfirmProductPhotosScreenWrapper'
import NewProductScreenWrapper from '../Containers/NewProductScreenWrapper'
import InfoScreenWrapper from '../Containers/InfoScreenWrapper'
import ChecklistScreenWrapper from '../Containers/ChecklistScreenWrapper'
import SyncScreenWrapper from '../Containers/SyncScreenWrapper'
import ModeSelectorScreenWrapper from '../Containers/ModeSelectorScreenWrapper'
import StoreSelectorScreenWrapper from '../Containers/StoreSelectorScreenWrapper'
import PartnerSelectorScreenWrapper from '../Containers/PartnerSelectorScreenWrapper'

import { Metrics, Colors } from '../Themes'
import styles from './Styles/NavigationStyles'

import { Animated, Easing } from 'react-native'

const IOSTransitionSpec = {
  duration: 0, // Metrics.shortDuration,
  // duration: 0,
  // easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  easing: Easing.bezier(0.2, 0.99, 0.4, 0.99),
  // easing: Easing.inOut(Easing.quad),
  timing: Animated.timing
}

const CrossFadeTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1]
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1]
  })

  return {
    opacity
  }
}

const SlideInTopTransitionSensual = (index, position) => {
  const inputRange = [index - 1, index, index + 1]

  const translateY = position.interpolate({
    inputRange,
    outputRange: [Metrics.screenHeight / 4, 0, 0]
  })

  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1]
  })

  return {
    opacity,
    transform: [{ translateY }]
  }
}

const SlideInTopTransitionSensualButQuick = (index, position) => {
  const inputRange = [index - 1, index, index + 1]

  const translateY = position.interpolate({
    inputRange,
    outputRange: [Metrics.screenHeight / 2, 0, 0]
  })

  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1]
  })

  return {
    opacity,
    transform: [{ translateY }]
  }
}

const SlideInTopTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1]

  const translateY = position.interpolate({
    inputRange,
    outputRange: [Metrics.screenHeight, 0, 0]
  })

  return {
    transform: [{ translateY }]
  }
}

const SlideInTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1]

  const translateX = position.interpolate({
    inputRange,
    outputRange: [Metrics.screenWidth, 0, 0]
  })

  return {
    transform: [{ translateX }]
  }
}

const TransitionConfiguration = () => {
  return {
    // define scene interpolation, eq. custom transition
    transitionSpec: IOSTransitionSpec,
    screenInterpolator: (screenProps) => {
      const { position, scene } = screenProps
      const { index, route } = scene
      const params = route.params || {}
      const transition = params.transition || 'default'

      const final = {
        default: CrossFadeTransition(index, position),
        slideInTopTransition: SlideInTopTransition(index, position),
        slideInTransition: SlideInTransition(index, position),
        slideInTopTransitionSensual: SlideInTopTransitionSensual(index, position),
        crossFadeTransition: CrossFadeTransition(index, position),
        slideInTopTransitionSensualButQuick: SlideInTopTransitionSensualButQuick(index, position)
      }[transition]

      return final
    }
  }
}

// Manifest of possible screens// Manifest of possible screens
const gesturesEnabled = false
const AppNavigation = createStackNavigator(
  {
    LaunchScreen: {
      screen: LaunchScreen,
      navigationOptions: { gesturesEnabled }
    },
    OnboardingScreen: {
      screen: OnboardingScreenWrapper,
      navigationOptions: { title: 'Onboarding', gesturesEnabled }
    },
    LoginScreen: {
      screen: LoginScreenWrapper,
      navigationOptions: { title: 'Login', gesturesEnabled }
    },
    EnterCodeScreen: {
      screen: EnterCodeScreenWrapper,
      navigationOptions: { title: 'EnterCode', gesturesEnabled }
    },
    CreateAccountScreen: {
      screen: CreateAccountScreenWrapper,
      navigationOptions: { title: 'CreateAccount', gesturesEnabled }
    },
    SettingsScreen: {
      screen: SettingsScreenWrapper,
      navigationOptions: { title: 'Settings' }
    },
    ScannerScreen: {
      screen: ScannerScreenWrapper,
      navigationOptions: { title: 'Scan', gesturesEnabled }
    },
    CameraScreen: {
      screen: CameraScreenWrapper,
      navigationOptions: { title: 'Capture', gesturesEnabled }
    },
    ConfirmProductScreen: {
      screen: ConfirmProductScreenWrapper,
      navigationOptions: { title: 'Confirm Product', gesturesEnabled }
    },
    ConfirmProductPhotosScreen: {
      screen: ConfirmProductPhotosScreenWrapper,
      navigationOptions: { title: 'Check Product', gesturesEnabled }
    },
    NewProductScreen: {
      screen: NewProductScreenWrapper,
      navigationOptions: { title: 'New Product', gesturesEnabled }
    },
    InfoScreen: {
      screen: InfoScreenWrapper,
      navigationOptions: { title: 'Info', gesturesEnabled: true }
    },
    ChecklistScreen: {
      screen: ChecklistScreenWrapper,
      navigationOptions: { title: 'Checklist', gesturesEnabled }
    },
    SyncScreen: {
      screen: SyncScreenWrapper,
      navigationOptions: { title: 'Sync', gesturesEnabled }
    },
    ModeSelectorScreen: {
      screen: ModeSelectorScreenWrapper,
      navigationOptions: { title: 'ModeSelector', gesturesEnabled }
    },
    StoreSelectorScreen: {
      screen: StoreSelectorScreenWrapper,
      navigationOptions: { title: 'StoreSelector', gesturesEnabled }
    },
    PartnerSelectorScreen: {
      screen: PartnerSelectorScreenWrapper,
      navigationOptions: { title: 'PartnerSelector', gesturesEnabled }
    }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    cardStyle: { backgroundColor: Colors.white },
    // mode: 'modal',
    initialRouteName: 'LoginScreen',
    navigationOptions: {
      header: {
        style: styles.header
      },
      gesturesEnabled
    },
    transitionConfig: TransitionConfiguration
  }
)

export default AppNavigation
