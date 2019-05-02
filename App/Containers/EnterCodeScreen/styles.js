import { StyleSheet } from 'react-native';
import { Metrics, Images, Colors, Fonts, ApplicationStyles } from '@Themes';

export default StyleSheet.create({
    container: {
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
});
