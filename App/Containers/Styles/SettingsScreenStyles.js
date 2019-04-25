import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  accountContainer: {
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    paddingBottom: Metrics.baseMargin,
    height: Metrics.screenHeight
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: Metrics.doubleBaseMargin,
    flex: 1
    // width: Metrics.screenWidth
  },
  rowLabel: {
    ...Fonts.style.normal,
    color: Colors.blueGray,
    paddingTop: Metrics.basePadding,
    paddingBottom: 0,
    paddingHorizontal: Metrics.basePadding + 2
  },
  displayNameRow: {
    paddingTop: Metrics.doubleBasePadding,
    paddingBottom: Metrics.basePadding,
    paddingHorizontal: Metrics.doubleBasePadding
  },
  emailRow: {
    paddingTop: 0,
    paddingHorizontal: Metrics.doubleBasePadding
  },
  accountForm: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.baseBorderRadius,
    marginBottom: Metrics.doubleBaseMargin,
    width: Metrics.formWidth,
    paddingBottom: Metrics.tripleBasePadding
  },
  input: {},
  leftRightButton: {
    width: 50,
    justifyContent: 'center',
    height: Metrics.buttonHeight
  },
  closeButton: {
    flex: 1,
    height: Metrics.navBarHeight,
    width: Metrics.buttonHeight,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  close: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight: Metrics.baseMargin
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.primaryDark,
    height: Metrics.breadcrumbHeight,
    width: Metrics.screenWidth,
    paddingTop: Metrics.statusBarHeight,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1
  },
  infoButton: {},
  addNewProductButton: {
    marginTop: Metrics.baseMargin
  },
  logoutButton: {
    backgroundColor: Colors.red
    // marginTop: Metrics.baseMargin
  },
  resetButton: {
    backgroundColor: 'darkred'
    // marginTop: Metrics.baseMargin
  },
  heading: {
    ...Fonts.style.big,
    color: Colors.blueGray,
    alignSelf: 'flex-start',
    marginLeft: Metrics.doubleBaseMargin,
    marginTop: Metrics.tripleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin
  },
  infoSection: {
    margin: Metrics.doubleBaseMargin,
    flex: 1
  },
  info: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.baseMargin
  },
  infoLabel: {
    width: 100,
    fontWeight: 'bold'
  },
  priority: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: Metrics.doubleBaseMargin * 1.5,
    marginBottom: Metrics.doubleBaseMargin
  },
  priorityLabel: {
    fontWeight: 'bold',
    marginRight: Metrics.baseMargin,
    width: 55,
    textAlign: 'center'
  }
})
