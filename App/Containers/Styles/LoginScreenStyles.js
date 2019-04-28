import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    alignItems: 'center',
    width: Metrics.screenWidth
  },
  promptRow: {
    paddingTop: Metrics.doubleBasePadding,
    paddingBottom: Metrics.basePadding,
    paddingHorizontal: Metrics.doubleBasePadding,
    marginTop: 20,
    alignSelf: 'flex-start'
  },
  emailRow: {
    paddingBottom: Metrics.basePadding,
    paddingHorizontal: Metrics.doubleBasePadding
  },
  passwordRow: {
    paddingTop: 0,
    paddingHorizontal: Metrics.doubleBasePadding
  },
  prompt: {
    ...Fonts.style.normal,
    color: Colors.white
  },
  rowLabel: {
    ...Fonts.style.normal,
    color: Colors.white,
    paddingTop: Metrics.basePadding,
    paddingBottom: 0,
    paddingHorizontal: Metrics.basePadding + 1
  },
  textInput: {
    height: Metrics.inputHeight,
    color: Colors.black
  },
  textInputReadonly: {
    height: Metrics.inputHeight,
    color: Colors.gray
  },
  forgotPasswordRow: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between'
  },
  loginRow: {
    paddingTop: Metrics.doubleBasePadding,
    paddingBottom: Metrics.doubleBasePadding,
    paddingHorizontal: Metrics.doubleBasePadding,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.darkGray,
    backgroundColor: Colors.lightGray,
    padding: Metrics.basePadding,
    borderRadius: Metrics.baseBorderRadius
  },
  cancelButton: {
    marginLeft: Metrics.baseMargin
  },
  loginText: {
    textAlign: 'center',
    color: Colors.black
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  button: {
    borderWidth: 0,
    marginTop: Metrics.baseMargin
  },
  errorRow: {
    width: Metrics.inputWidth,
    padding: Metrics.basePadding,
    backgroundColor: Colors.pink,
    borderRadius: Metrics.baseBorderRadius,
    flexDirection: 'row',
    alignItems: 'center'
  },
  alert: {
    width: 18,
    height: 21
  },
  errorText: {
    ...Fonts.style.small,
    color: Colors.white,
    width: 220,
    marginLeft: Metrics.baseMargin
  },
  link: {
    color: 'white',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 24
  }
})