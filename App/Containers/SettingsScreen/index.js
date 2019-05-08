import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Alert, ScrollView, TouchableOpacity, Image, StatusBar} from 'react-native';
import {compose, withPropsOnChange} from 'recompose';
import {get as _get} from 'lodash';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import _ from 'lodash';
import VersionNumber from 'react-native-version-number';

import withApollo from '../../Decorators/withApollo';
import toTitleCase from '../../Utils/toTitleCase';
import {Metrics, Colors, Images} from '../../Themes';
import ValidatedFormScreen from '../ValidatedFormScreen';
import Button from '../../Components/Button';
import CloseButton from '../../Components/CloseButton';
import ApolloClient from '../../Lib/Apollo';
import withData from '../../Decorators/withData';
import SageActions from '../../Redux/SageRedux';
import SegmentedControlTab from "react-native-segmented-control-tab";

// React Apollo
import {withAuth, withLogout} from '../../GraphQL/Account/decorators';

import { CustomHeader } from '../../Components/CustomHeader';

import styles from './styles';
import * as scale from '../../Utils/Scale';

class Index extends ValidatedFormScreen {
    static propTypes = {
        settingApplicationData: PropTypes.bool,
        resettingApplicationData: PropTypes.bool,
        logout: PropTypes.func.isRequired,
        tag: PropTypes.string,
        setTag: PropTypes.func.isRequired,
        setAutoQuickSync: PropTypes.func.isRequired,
        resetUserStats: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            displayName: props.user.displayName,
            email: props.user.email,
            visibleHeight: Metrics.screenHeight,
            loading: false,
            selectedIndex1: 0,
            selectedIndex2: 0
        };

        this.scrollY = 0
    }

    handleIndexChange(type, index) {
        if (type == 1) {
            this.setState({
                ...this.state,
                selectedIndex1: index
            });
        } else {
            this.setState({
                ...this.state,
                selectedIndex2: index
            });
        }

    };

    componentWillReceiveProps(newProps) {
        const {user: oldUser} = this.props;
        const {user: newUser} = newProps;
        if (newUser) {
            if (oldUser.displayName !== newUser.displayName) {
                this.setState({displayName: newUser.displayName})
            }
            if (oldUser.email !== newUser.email) {
                this.setState({email: newUser.email})
            }
        }
    }

    handlePressLogout = async () => {
        this.setState({loading: true}, async () => {
            try {
                await this.props.logout();
                ApolloClient.resetStore();
                // this.setState({ loading: false })
                this.props.handleReset(this.state);
                this.props.resetNavigation()
            } catch (e) {
                this.setState({loading: false});
                this.props.handleReset(this.state);
                this.props.resetNavigation()
            }
        })
    };

    handleLearnHowToUsePress = () => {
        this.props.navigation.navigate('OnboardingScreen', {fromAccount: true})
    };

    handleResetAllTheData = () => {
        const resetAllTheData = () => {
            this.props.data.removeAllData();
            this.props.resetUserStats()
        };

        Alert.alert(
            'Delete all data',
            'You are about to delete all the photos and statuses on this phone!\nDo not do this unless asked to!',
            [
                {text: 'Delete', onPress: resetAllTheData, style: 'destructive'},
                {
                    text: 'Cancel',
                    onPress: () => {
                        console.log('Cancel')
                    }
                }
            ]
        )
    };

    handleClose = () => this.props.navigation.goBack();

    handleSelectStore = () => this.props.navigation.navigate('StoreSelectorScreen', {transition: 'card'})

    handleSelectPartner = () => this.props.navigation.navigate('PartnerSelectorScreen', {transition: 'card'})

    handleProductChecklist = () => this.props.navigation.navigate('ChecklistScreen', {transition: 'card'});

    handleSyncScreen = () => this.props.navigation.navigate('ForceSyncScreen', {transition: 'card'});

    handleCaptureResultScreen = () => this.props.navigation.navigate('CaptureResultScreen', {transition: 'card'});

    render() {
        const {data, tag, setTag, autoQuickSync, setAutoQuickSync, auth, prStores, prUserUpdate} = this.props;
        const {loading} = this.state;

        StatusBar.setBarStyle('dark-content', true);
        return (
            <View style={styles.container}>
                <CustomHeader
                    onClose={this.handleClose}
                />
                <ScrollView
                    style={styles.innerContainer}
                    contentContainerStyle={{}}
                >
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>Hi, {auth.session.user.displayName}</Text>
                        <Text style={styles.account}>Account</Text>
                    </View>
                    <View style={styles.modeSelect}>
                        <Text style={styles.modeTitle}>{this.state.selectedIndex1 === 0 ? 'Photo' : 'Runner'} Mode</Text>
                        <Text style={styles.modeDescription}>{this.state.selectedIndex1 === 0 ? 'Capturing photos of products' : 'Checking and pulling products'}</Text>
                        <View style={styles.modeSelectTabContainer}>
                            <SegmentedControlTab
                                tabsContainerStyle={[styles.tabContainerStyle, { width: 228 * scale.widthRatio }]}
                                values={["PHOTO MODE", "RUNNER MODE"]}
                                selectedIndex={this.state.selectedIndex1}
                                onTabPress={(index) => this.handleIndexChange(1, index)}
                                activeTabStyle={styles.activeTabStyle}
                                tabStyle={styles.tabStyle}
                                activeTabTextStyle={styles.activeTabTextStyle}
                                tabTextStyle={styles.tabTextStyle}
                            />
                        </View>
                    </View>
                    <View style={styles.storeSelect}>
                        <View style={styles.storeTitle}>
                            <Text style={styles.storeTitleText}>Store</Text>
                            <Text style={styles.storeDescriptionText}>Kroger - Anderson Township</Text>
                        </View>
                        <TouchableOpacity onPress={this.handleSelectStore} style={styles.storeSelectMoveButton}>
                            <Text style={styles.storeSelectMoveButtonText}>SELECT STORE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.getUpgrade}>
                        <View style={styles.upgradeTitle}>
                            <Text style={styles.upgradeTitleText}>App Version</Text>
                            <Text style={styles.upgradeDescriptionText}>{`v${VersionNumber.appVersion} — Build ${VersionNumber.buildVersion}`}</Text>
                        </View>
                        {
                            this.state.selectedIndex1 !== 0 &&
                            <TouchableOpacity style={styles.upgradeMoveButton}>
                                <Text style={styles.upgradeMoveButtonText}>GET UPGRADE</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.productCaptureSelect}>
                        <Text style={styles.productCaptureSelectTitle}>Product Capture Priority</Text>
                        <Text style={styles.productCaptureSelectDescription}>
                            {this.state.selectedIndex2 === 0 && 'Capturing products that must be done in this store'}
                            {this.state.selectedIndex2 === 1 && 'Capturing high-priority products that are likely in this store'}
                            {this.state.selectedIndex2 === 2 && 'Capturing any possible product that needs capture'}
                        </Text>
                        <View style={styles.productCaptureSelectTabContainer}>
                            <SegmentedControlTab
                                tabsContainerStyle={[styles.tabContainerStyle, { width: 342 * scale.widthRatio }]}
                                values={["STORE LIST", "HIGH PRIORITY", "ALL PRODUCTS"]}
                                selectedIndex={this.state.selectedIndex2}
                                onTabPress={(index) => this.handleIndexChange(2, index)}
                                activeTabStyle={styles.activeTabStyle}
                                tabStyle={styles.tabStyle}
                                activeTabTextStyle={styles.activeTabTextStyle}
                                tabTextStyle={styles.tabTextStyle}
                            />
                        </View>
                    </View>
                    <View style={styles.sessionCaptureStatus}>
                        <TouchableOpacity style={styles.sessionCaptureMoveDetailButton} onPress={this.handleCaptureResultScreen}>
                            <View style={styles.sessionCaptureMoveDetailButtonTextContainer}>
                                <Text style={styles.sessionCaptureMoveDetailButtonText}>Session Capture Status</Text>
                            </View>
                            <Image source={Images.arrowRight} style={styles.arrowIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.sessionCaptureDetail}>125 Captured; 68 Synched; 57 Pending Synch</Text>
                        <View style={styles.barStyle}>
                            <View style={styles.activeBarStyle} />
                        </View>
                        <Text style={styles.statusDetail}>Synch Status: 57% synched to server</Text>
                        <TouchableOpacity style={styles.manualSyncButton} onPress={this.handleSyncScreen}>
                            <Text style={styles.manualSyncButtonText}>FORCE MANUAL SYNC</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.messageSection}>
                        <View style={styles.messageStatus}>
                            <View style={styles.messageStatusText}>
                                <View style={styles.messageStatusTitleTextContainer}>
                                    <Text style={styles.messageStatusTitleText}>Your Messages</Text>
                                </View>
                                <Image source={Images.arrowRight} style={styles.arrowIcon}/>
                            </View>
                            <Text style={styles.messageStatusDetail}>0 messages</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.handleProductChecklist} style={styles.buttonContainer}>
                        <Image source={Images.diary} style={[styles.leftIcon, { width: 20 * scale.widthRatio, height: 20 * scale.widthRatio }]} />
                        <Text style={[styles.rightText, { color: '#4a7ffb' }]}>View Product Checklist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Image source={Images.sms} style={[styles.leftIcon, { width: 20 * scale.widthRatio, height: 13 * scale.widthRatio }]} />
                        <Text style={[styles.rightText, { color: '#4a7ffb' }]}>Message Support</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleResetAllTheData} style={styles.buttonContainer}>
                        <Image source={Images.delete} style={[styles.leftIcon, { width: 17 * scale.widthRatio, height: 20 * scale.widthRatio }]} />
                        <Text style={[styles.rightText, { color: '#f54370' }]}>Reset All Data & Restart Session</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePressLogout} style={styles.buttonContainer}>
                        <Image source={Images.logout} style={[styles.leftIcon, { width: 18 * scale.widthRatio, height: 18 * scale.widthRatio }]} />
                        <Text style={[styles.rightText, { color: '#f54370' }]}>Log Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const enhance = compose(
    withAuth,
    withData,
    withPropsOnChange(
        (props, nextProps) =>
            _get(props, 'auth.session.isAuthenticated', false) !== _get(nextProps, 'auth.session.isAuthenticated', false),
        ({auth}) => ({
            isAuthenticated: _get(auth, 'session.isAuthenticated', false),
            user: _get(auth, 'session.user', {
                displayName: '',
                email: ''
            })
        })
    ),
    connect(
        ({sage: {tag, autoQuickSync, userStats}}) => ({tag, autoQuickSync, userStats}),
        {
            setTag: SageActions.setTag,
            setAutoQuickSync: SageActions.setAutoQuickSync,
            resetUserStats: SageActions.resetUserStats
        }
    ),
    withApollo(
        'mutation prUserUpdate',
        {store: 'String', priority: 'String'},
        '... Session',
        require('../../GraphQL/Account/fragments/session').default
    ),
    withLogout,
    withAuth,
    withApollo('query prStores')
);

export default enhance(Index)

// const Info = ({label, value}) => (
//     <View style={styles.info}>
//         <Text style={styles.infoLabel}>{label}</Text>
//         <Text>{value}</Text>
//     </View>
// );
