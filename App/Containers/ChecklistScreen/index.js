import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {View, Text, TouchableOpacity, FlatList, TextInput, StatusBar, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import _ from 'lodash';
import InfiniteScroll from 'react-native-infinite-scroll';
import withData from '../../Decorators/withData';
import toTitleCase from '../../Utils/toTitleCase';
import getBarcodeWithDefaults from '../../Utils/getBarcodeWithDefaults';

import BarcodeVerdict from '../BarcodeVerdict';
import CloseButton from '../../Components/CloseButton';
import Camera from '../../Components/Camera';
import InlineSelect from '../../Components/InlineSelect';
import * as scale from '../../Utils/Scale';
import styles from './styles';
import { Images } from '../../Themes';

const checklistData = [
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' },
    { name: 'Krogera? Cinnamon Applesauce Cups', location: { aisle: 'Aisle', side: '4 left' }, category: 'Applesauce/fruit Squeeze', upc:'0011110898944' }
];

const SORT_OPTIONS = [
    {key: 'name', label: 'Name'},
    {key: 'category', label: 'Category'},
    {key: 'aisle', label: 'Aisle'}
];

class Index extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            sort: 'category',
            barcode: null,
            searchText: '',
            onFocusFlag: false,
            loadNum: 10
        };
    }

    handleClose = () => this.props.navigation.goBack();

    handleBarCodeReadThrottled = _.throttle(({data, type}) => {
        if (this.state.barcode === data) return;
        this.setState({barcode: data})
    }, 500);

    handleSortChange = (sort) => this.setState({sort, page: 0});

    handleNext = () => this.setState({page: this.state.page + 1});

    handlePrev = () => this.setState({page: this.state.page - 1});

    setBarcode = (barcode) => this.setState({barcode});

    onChangeSearchText = searchText => this.setState({ searchText });

    onFocus = () => this.setState({ onFocusFlag: true });

    onBlur = () => this.setState({ onFocusFlag: false });

    removeSearchText = () => this.setState({ searchText: '' });

    loadMorePage = () => this.setState({ loadNum: this.state.loadNum + 10 });

    render() {
        const {data} = this.props;
        const {page, sort, barcode} = this.state;

        if (data.loading && !data.result) {
            return (
                <View style={styles.root}>
                    <Text>loading...</Text>
                </View>
            )
        }

        if (barcode) {
            return (
                <View style={styles.root}>
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

        StatusBar.setBarStyle('light-content', true);
        return (
            <View style={styles.root}>
                <View style={styles.nav}>
                    <Text style={styles.navTitle}>Products: {list.length} pending</Text>
                    <CloseButton onPress={this.handleClose}/>
                </View>

                <View
                    style={
                        [
                            styles.searchInputWrapper,
                            {
                                backgroundColor: this.state.onFocusFlag ? '#ffffff' : '#f1f1f2',
                                borderColor: this.state.onFocusFlag ? '#4a7ffb' : '#f1f1f2'
                            }
                        ]
                    }
                >
                    <Feather
                        style={{paddingHorizontal: 8 * scale.widthRatio}}
                        size={18 * scale.heightRatio}
                        color={'#AAAAAA'}
                        name={'search'}
                    />
                    <TextInput
                        placeholder={'Search by name, brand or UPC'}
                        value={this.state.searchText}
                        onChangeText={this.onChangeSearchText}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        style={styles.searchInputText}
                    />
                    {
                        this.state.searchText.length !== 0 &&
                        <TouchableOpacity style={styles.removeSearchTextWrapper} onPress={this.removeSearchText}>
                            <Animatable.Image source={Images.search_close} style={styles.removeSearchText} />
                        </TouchableOpacity>
                    }
                </View>

                <View style={styles.sort}>
                    <Text style={styles.sortText}>Sort by:</Text>
                    <InlineSelect
                        compact
                        value={sort}
                        options={SORT_OPTIONS}
                        onChange={this.handleSortChange}
                        style={styles.sortSelect}
                    />
                </View>

                <InfiniteScroll
                    horizontal={false}  //true - if you want in horizontal
                    onLoadMoreAsync={this.loadMorePage}
                    distanceFromEnd={10} // distance in density-independent pixels from the right end
                    style={styles.infiniteScrollView}
                >
                    {
                        checklistData.map((checklist, index) => {
                            return (
                                <TouchableOpacity key={index} style={styles.checklistItem}>
                                    <View style={styles.checklistName}>
                                        <Text style={styles.name}>{toTitleCase(checklist.name)}</Text>
                                        <Text style={styles.location}>{location.aisle} {location.side}</Text>
                                    </View>
                                    <View style={styles.checklistCategory}>
                                        <Text style={styles.categoryName}>{toTitleCase(checklist.category)}</Text>
                                        <Text style={styles.upcTitle}>{checklist.upc}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </InfiniteScroll>


                 {/*<ScrollView style={styles.list} key={page}>*/}
                 {/*    {current.map(({ category, name, upc, location }) => (*/}
                 {/*        <TouchableOpacity key={upc} onPress={this.setBarcode.bind(this, upc)}>*/}
                 {/*            <View style={styles.item}>*/}
                 {/*                <View style={styles.row}>*/}
                 {/*                    <Text style={styles.itemName}>{toTitleCase(name)}</Text>*/}
                 {/*                    {location ? (*/}
                 {/*                        <Text style={styles.itemLocation}>*/}
                 {/*                            {location.aisle} {location.side}*/}
                 {/*                        </Text>*/}
                 {/*                    ) : null}*/}
                 {/*                </View>*/}
                 {/*                <View style={[styles.row, styles.itemInfo]}>*/}
                 {/*                    <Text style={styles.category}>{toTitleCase(category)}</Text>*/}
                 {/*                    <Text style={styles.upc}>{upc}</Text>*/}
                 {/*                </View>*/}
                 {/*            </View>*/}
                 {/*        </TouchableOpacity>*/}
                 {/*    ))}*/}
                 {/*</ScrollView>*/}

                {/*<View style={[styles.row, styles.pagination]}>*/}
                {/*    <TouchableOpacity*/}
                {/*        style={[styles.button, noPrev && styles.buttonDisabled]}*/}
                {/*        onPress={noPrev ? null : this.handlePrev}*/}
                {/*    >*/}
                {/*        <Text>prev</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <View style={styles.paginationIndex}>*/}
                {/*        <Text>{`${page + 1} / ${numPages}`}</Text>*/}
                {/*    </View>*/}
                {/*    <TouchableOpacity*/}
                {/*        style={[styles.button, noNext && styles.buttonDisabled]}*/}
                {/*        onPress={noNext ? null : this.handleNext}*/}
                {/*    >*/}
                {/*        <Text>next</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}

                <Camera autoFocus wrapperStyle={styles.camera} onBarCodeRead={this.handleBarCodeReadThrottled}>
                    <View style={styles.cameraContent}>
                        <Text style={styles.cameraText}>Barcode Scanner</Text>
                    </View>
                </Camera>
            </View>
        )
    }
}

export default withData(Index)
