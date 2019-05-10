import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../Themes';
import * as scale from '../../Utils/Scale';

export default StyleSheet.create({
    container: {
        height: Metrics.screenHeight
    },
    innerContainer: {

    },
    messageSupport: {
        width: 168 * scale.widthRatio,
        height: 28 * scale.heightRatio,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4 * scale.heightRatio,
        backgroundColor: '#4a7ffb'
    },
    messageSupportText: {
        color: '#fbfbfc',
        fontFamily: Fonts.type.bold,
        fontSize: 11 * scale.widthRatio,
        fontWeight: '600',
        letterSpacing: -0.08 * scale.widthRatio
    },
    messageNumText: {
        marginTop: 26 * scale.heightRatio,
        marginBottom: 18 * scale.heightRatio,
        paddingHorizontal: 21 * scale.widthRatio,
        color: '#1f2952',
        fontFamily: Fonts.type.bold,
        fontSize: 14 * scale.widthRatio,
        fontWeight: '700',
        letterSpacing: -0.1 * scale.widthRatio
    },
    messageDetail: {
        flex: 1,
        borderColor: '#ededed',
        borderStyle: 'solid',
        borderTopWidth: 1 * scale.heightRatio
    }
});
