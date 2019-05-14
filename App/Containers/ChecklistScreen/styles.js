import {StyleSheet} from 'react-native'
import {Metrics, Colors, Fonts} from '../../Themes'
import {setBarcode} from '../../Redux/SageRedux'
import * as scale from '../../Utils/Scale'

export default StyleSheet.create({
    root: {
        backgroundColor: Colors.background,
        height: Metrics.screenHeight
    },
    nav: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.blueGray1,
        paddingTop: 25 * scale.heightRatio,
        paddingBottom: 4 * scale.heightRatio
    },
    navTitle: {
        ...Fonts.style.heading,
        color: '#ffffff',
        fontFamily: Fonts.type.bold,
        fontSize: 18 * scale.widthRatio,
        fontWeight: '700',
        letterSpacing: 0.21 * scale.widthRatio,
        lineHeight: 41 * scale.heightRatio
    },
    searchInputWrapper: {

    },
    list: {
        flex: 1
    },
    item: {
        marginBottom: Metrics.baseMargin + Metrics.halfBaseMargin,
        paddingHorizontal: Metrics.baseMargin
    },
    itemName: {
        flex: 1,
        fontWeight: 'bold'
    },
    itemLocation: {
        flex: 0
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemInfo: {
        backgroundColor: '#ddd',
        paddingVertical: 2
    },
    category: {
        flex: 1
    },
    upc: {
        ...Fonts.style.monospace
    },
    camera: {
        flex: 0,
        height: 150,
        width: Metrics.screenWidth
    },
    cameraContent: {
        alignSelf: 'stretch',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 2
    },
    cameraText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    sort: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Metrics.baseMargin,
        marginVertical: Metrics.baseMargin
    },
    sortText: {
        marginRight: Metrics.baseMargin,
        fontWeight: 'bold'
    },
    sortSelect: {
        flex: 1
    },
    pagination: {
        marginTop: Metrics.baseMargin
    },
    paginationIndex: {
        flex: 1,
        marginHorizontal: Metrics.baseMargin,
        alignItems: 'center'
    },
    button: {
        flex: 0,
        padding: Metrics.baseMargin,
        margin: Metrics.baseMargin / 2,
        backgroundColor: Colors.green,
        borderRadius: 4,
        width: 100,
        alignItems: 'center'
    },
    buttonDisabled: {
        backgroundColor: Colors.gray
    }
})
