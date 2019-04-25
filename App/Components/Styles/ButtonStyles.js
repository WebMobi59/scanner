import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export const activityIndicatorColor = Colors.white

export default StyleSheet.create({
  button: {
    height: Metrics.buttonHeight,
    marginBottom: Metrics.baseMargin,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    borderRadius: Metrics.buttonHeight,
    paddingHorizontal: Metrics.basePadding,
    width: Metrics.buttonWidth
  },
  center: {
    alignSelf: 'center'
  },
  invertedButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.primaryDark,
    borderWidth: 1
  },
  buttonText: {
    ...Fonts.style.heading,
    color: Colors.white,
    textAlign: 'center',
    marginVertical: Metrics.baseMargin
  },
  invertedButtonText: {
    color: Colors.primaryDark
  },
  disabledButton: {
    backgroundColor: Colors.gray
  },
  darkButton: {
    backgroundColor: Colors.primaryDark
  },
  darknvertedButtonText: {
    color: Colors.white
  },
  redButton: {
    backgroundColor: Colors.red
  },
  image: {
    position: 'absolute',
    left: Metrics.doubleBaseMargin,
    width: 32,
    height: 32,
    resizeMode: 'contain'
  }
})
