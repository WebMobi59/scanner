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
    },
    emptyBox: {
        flex: 1,
        alignItems: 'center'
    },
    emptyMessageImageWrapper: {
        marginTop: 56 * scale.heightRatio,
        width: 126 * scale.widthRatio,
        height: 120 * scale.widthRatio
    },
    emptyMessage: {
        marginTop: 17 * scale.heightRatio,
        opacity: 0.5,
        color: '#242e5b',
        fontFamily: Fonts.type.bold,
        fontSize: 14 * scale.widthRatio,
        fontWeight: '600',
        lineHeight: 24 * scale.heightRatio
    },
    productContainer: {
        paddingHorizontal: 23 * scale.widthRatio,
        paddingVertical: 27 * scale.heightRatio,
        borderColor: '#ededed',
        borderStyle: 'solid',
        borderBottomWidth: 1 * scale.widthRatio
    },
    rowDetail: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    productImageWrapper: {
        width: 47 * scale.widthRatio,
        height: 47 * scale.widthRatio
    },
    detail: {
        marginLeft: 20 * scale.widthRatio
    },
    productUpc: {
        color: '#1f2952',
        fontFamily: Fonts.type.bold,
        fontSize: 14 * scale.widthRatio,
        fontWeight: '600',
        letterSpacing: -0.1 * scale.widthRatio
    },
    productLabelName: {
        marginTop: 1 * scale.heightRatio,
        opacity: 0.5,
        color: '#1f2952',
        fontFamily: Fonts.type.base,
        fontSize: 12 * scale.widthRatio,
        fontWeight: '400',
        letterSpacing: -0.09 * scale.widthRatio
    },
    reason: {
        marginTop: 18 * scale.heightRatio
    },
    reasonTitle: {
        color: '#1f2952',
        fontFamily: Fonts.type.bold,
        fontSize: 14 * scale.widthRatio,
        fontWeight: '700',
        letterSpacing: -0.1 * scale.widthRatio
    },
    reasonDescription: {
        marginTop: 3 * scale.heightRatio,
        opacity: 0.5,
        color: '#1f2952',
        fontFamily: Fonts.type.base,
        fontSize: 12 * scale.widthRatio,
        fontWeight: '400',
        letterSpacing: -0.09 * scale.widthRatio
    }
});
