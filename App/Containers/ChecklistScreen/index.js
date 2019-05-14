import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import _ from 'lodash';

import withData from '../../Decorators/withData';
import toTitleCase from '../../Utils/toTitleCase';
import getBarcodeWithDefaults from '../../Utils/getBarcodeWithDefaults';

import BarcodeVerdict from '../BarcodeVerdict';
import CloseButton from '../../Components/CloseButton';
import Camera from '../../Components/Camera';
import InlineSelect from '../../Components/InlineSelect';

const SORT_OPTIONS = [
    {key: 'name', label: 'Name'},
    {key: 'category', label: 'Category'},
    {key: 'aisle', label: 'Aisle'}
];

class Index extends PureComponent {
    state = {
        page: 0,
        sort: 'category',
        barcode: null
    };

    handleClose = () => this.props.navigation.goBack();

    handleBarCodeReadThrottled = _.throttle(({data, type}) => {
        if (this.state.barcode === data) return;
        this.setState({barcode: data})
    }, 500);

    handleSortChange = (sort) => this.setState({sort, page: 0});

    handleNext = () => this.setState({page: this.state.page + 1});

    handlePrev = () => this.setState({page: this.state.page - 1});

    setBarcode = (barcode) => this.setState({barcode});

    render() {
        const {data} = this.props;
        const {page, sort, barcode} = this.state;

        if (data.loading && !data.result) {
            return (
                <View style={Styles.root}>
                    <Text>loading...</Text>
                </View>
            )
        }

        if (barcode) {
            return (
                <View style={Styles.root}>
                    <BarcodeVerdict
                        barcode={getBarcodeWithDefaults(data, barcode)}
                        onClose={() => this.setState({barcode: null})}
                    />
                </View>
            )
        }

        let list = _.filter(data.result.upc, (x) => x.storeStatus === 'pending');
        const v = (obj, k = sort) =>
            (k === 'aisle'
                ? obj.location &&
                obj.location.aisle &&
                obj.location.aisle.replace(/\d+/g, (x) => String.fromCharCode(65 + parseInt(x, 10)))
                : obj[k]) || 'zzzz';
        list = list.sort((a, b) =>
            v(a) === v(b)
                ? sort === 'name'
                ? v(a, 'category').localeCompare(v(b, 'category'))
                : v(a, 'name').localeCompare(v(b, 'name'))
                : v(a).localeCompare(v(b))
        );
        const pageSize = 100;
        const numPages = Math.ceil(list.length / pageSize);
        const noPrev = page === 0;
        const noNext = page >= numPages - 1;
        const current = list.slice(page * pageSize, (page + 1) * pageSize);
        const listData = current.map((item) => {
            return {
                key: item.upc,
                category: item.category,
                name: item.name,
                upc: item.upc,
                location: item.location
            }
        });
        return (
            <View style={Styles.root}>
                <View style={Styles.nav}>
                    <Text style={Styles.navTitle}>Products: {list.length} pending</Text>
                    <CloseButton onPress={this.handleClose}/>
                </View>

                <View style={Styles.sort}>
                    <Text style={Styles.sortText}>Sort by:</Text>
                    <InlineSelect
                        compact
                        value={sort}
                        options={SORT_OPTIONS}
                        onChange={this.handleSortChange}
                        style={Styles.sortSelect}
                    />
                </View>

                <FlatList
                    style={Styles.list}
                    key={page}
                    data={listData}
                    renderItem={({item, index}) => {
                        const {category, name, upc, location} = item
                        // console.log('index', index)
                        return (
                            <TouchableOpacity key={`${upc}${index}`} onPress={this.setBarcode.bind(this, upc)}>
                                <View style={Styles.item}>
                                    <View style={Styles.row}>
                                        <Text style={Styles.itemName}>{toTitleCase(name)}</Text>
                                        {location ? (
                                            <Text style={Styles.itemLocation}>
                                                {location.aisle} {location.side}
                                            </Text>
                                        ) : null}
                                    </View>
                                    <View style={[Styles.row, Styles.itemInfo]}>
                                        <Text style={Styles.category}>{toTitleCase(category)}</Text>
                                        <Text style={Styles.upc}>{upc}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />

                {/* <ScrollView style={Styles.list} key={page}>
          {current.map(({ category, name, upc, location }) => (
            <TouchableOpacity key={upc} onPress={this.setBarcode.bind(this, upc)}>
              <View style={Styles.item}>
                <View style={Styles.row}>
                  <Text style={Styles.itemName}>{toTitleCase(name)}</Text>
                  {location ? (
                    <Text style={Styles.itemLocation}>
                      {location.aisle} {location.side}
                    </Text>
                  ) : null}
                </View>
                <View style={[Styles.row, Styles.itemInfo]}>
                  <Text style={Styles.category}>{toTitleCase(category)}</Text>
                  <Text style={Styles.upc}>{upc}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView> */}

                <View style={[Styles.row, Styles.pagination]}>
                    <TouchableOpacity
                        style={[Styles.button, noPrev && Styles.buttonDisabled]}
                        onPress={noPrev ? null : this.handlePrev}
                    >
                        <Text>prev</Text>
                    </TouchableOpacity>
                    <View style={Styles.paginationIndex}>
                        <Text>{`${page + 1} / ${numPages}`}</Text>
                    </View>
                    <TouchableOpacity
                        style={[Styles.button, noNext && Styles.buttonDisabled]}
                        onPress={noNext ? null : this.handleNext}
                    >
                        <Text>next</Text>
                    </TouchableOpacity>
                </View>

                <Camera autoFocus wrapperStyle={Styles.camera} onBarCodeRead={this.handleBarCodeReadThrottled}>
                    <View style={Styles.cameraContent}>
                        <Text style={Styles.cameraText}>Barcode Scanner</Text>
                    </View>
                </Camera>
            </View>
        )
    }
}

export default withData(Index)

import {StyleSheet} from 'react-native'
import {Metrics, Colors, Fonts} from '../../Themes'
import {setBarcode} from '../../Redux/SageRedux'

const Styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.background,
        height: Metrics.screenHeight
    },
    nav: {
        flex: 0,
        backgroundColor: Colors.primary,
        paddingLeft: Metrics.baseMargin,
        paddingTop: Metrics.statusBarHeight,
        flexDirection: 'row',
        alignItems: 'center'
    },
    navTitle: {
        ...Fonts.style.heading,
        color: 'white',
        flex: 1
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
