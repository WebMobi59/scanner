import PropTypes from 'prop-types'
import React from 'react'
import {View, Text, Alert, ScrollView, SafeAreaView, TouchableOpacity, Image,} from 'react-native'
import {compose, withPropsOnChange} from 'recompose'
import {get as _get} from 'lodash'
import * as Animatable from 'react-native-animatable'
import {connect} from 'react-redux'
import _ from 'lodash'
import VersionNumber from 'react-native-version-number'

import withApollo from '../../Decorators/withApollo'
import toTitleCase from '../../Utils/toTitleCase'
import {Metrics, Colors, Images} from '../../Themes'
import ValidatedFormScreen from '../ValidatedFormScreen'
import Button from '../../Components/Button'
import CloseButton from '../../Components/CloseButton'
import ApolloClient from '../../Lib/Apollo'
import withData from '../../Decorators/withData'
import SageActions from '../../Redux/SageRedux'
import SegmentedControlTab from "react-native-segmented-control-tab";

// React Apollo
import {withAuth, withLogout} from '../../GraphQL/Account/decorators'

// Styles
import Styles from '../Styles/SettingsScreenStyles'

class Index extends ValidatedFormScreen {
    static propTypes = {
        settingApplicationData: PropTypes.bool,
        resettingApplicationData: PropTypes.bool,
        logout: PropTypes.func.isRequired,
        tag: PropTypes.string,
        setTag: PropTypes.func.isRequired,
        setAutoQuickSync: PropTypes.func.isRequired,
        resetUserStats: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            displayName: props.user.displayName,
            email: props.user.email,
            visibleHeight: Metrics.screenHeight,
            loading: false,
            selectedIndex1: 0,
            selectedIndex2: 0
        }

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
        const {user: oldUser} = this.props
        const {user: newUser} = newProps
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
                await this.props.logout()
                ApolloClient.resetStore()
                // this.setState({ loading: false })
                this.props.handleReset(this.state)
                this.props.resetNavigation()
            } catch (e) {
                this.setState({loading: false})
                this.props.handleReset(this.state)
                this.props.resetNavigation()
            }
        })
    }

    handleLearnHowToUsePress = () => {
        this.props.navigation.navigate('OnboardingScreen', {fromAccount: true})
    }

    handleResetAllTheData = () => {
        const resetAllTheData = () => {
            this.props.data.removeAllData()
            this.props.resetUserStats()
        }

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
    }

    handleClose = () => this.props.navigation.goBack()

    handleSelectStore = () => this.props.navigation.navigate('StoreSelectorScreen', {transition: 'card'})

    handleSelectPartner = () => this.props.navigation.navigate('PartnerSelectorScreen', {transition: 'card'})

    handleProductChecklist = () => this.props.navigation.navigate('ChecklistScreen', {transition: 'card'});

    handleSyncScreen = () => this.props.navigation.navigate('SyncScreen', {transition: 'card'});

    handleCaptureResultScreen = () => this.props.navigation.navigate('CaptureResultScreen', {transition: 'card'});

    render() {
        const {data, tag, setTag, autoQuickSync, setAutoQuickSync, auth, prStores, prUserUpdate} = this.props
        const {loading} = this.state

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <SafeAreaView style={{flex: 1}}>
                    <View style={{
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        paddingTop: 20
                    }}>
                        <TouchableOpacity style={{}} onPress={this.handleClose}>
                            <Image source={Images.closeBlack} style={{width: 24, height: 24}}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        style={{flex: 1, paddingHorizontal: 15}}
                        contentContainerStyle={{}}
                    >
                        <View>
                            <Text style={{
                                color: '#999',
                                fontSize: 18,
                                textTransform: 'uppercase'
                            }}>Hi, {auth.session.user.displayName}</Text>
                            <Text style={{color: 'rgb(30,38,82)', fontSize: 28,}}>Account</Text>
                        </View>
                        <View style={{marginTop: 35}}>
                            <Text style={{
                                color: 'rgb(30,38,82)',
                                fontSize: 16
                            }}>{this.state.selectedIndex1 == 0 ? 'Photo' : 'Runner'} Mode</Text>
                            <Text style={{
                                color: '#999',
                                fontSize: 14
                            }}>{this.state.selectedIndex1 == 0 ? 'Capturing photos of products' : 'Checking and pulling products'}</Text>
                            <View style={{marginTop: 15}}>
                                <SegmentedControlTab
                                    tabsContainerStyle={{width: '80%', height: 36}}
                                    values={["PHOTO MODE", "RUNNER MODE"]}
                                    selectedIndex={this.state.selectedIndex1}
                                    onTabPress={(index) => this.handleIndexChange(1, index)}
                                    activeTabStyle={{
                                        backgroundColor: 'rgb(68,113,250)',
                                        borderColor: 'rgb(68,113,250)'
                                    }}
                                    tabStyle={{borderColor: 'rgb(68,113,250)'}}
                                    activeTabTextStyle={{color: 'white', fontSize: 14}}
                                    tabTextStyle={{color: 'rgb(68,113,250)', fontSize: 14}}
                                />
                            </View>
                        </View>
                        <View style={{height: 0.5, backgroundColor: '#ccc', width: '100%', marginVertical: 25}}></View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{width: '60%'}}>
                                <Text style={{color: 'rgb(30,38,82)', fontSize: 16}}>Store</Text>
                                <Text style={{color: '#999', fontSize: 14}}>Kroger - Anderson Township</Text>
                            </View>
                            <TouchableOpacity onPress={this.handleSelectStore} style={{
                                backgroundColor: 'rgb(68,113,250)',
                                borderRadius: 3,
                                paddingVertical: 10,
                                width: '40%'
                            }}>
                                <Text style={{fontSize: 14, color: 'white', textAlign: 'center'}}>SELECT STORE</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 0.5, backgroundColor: '#ccc', width: '100%', marginVertical: 25}}></View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{width: '60%'}}>
                                <Text style={{color: 'rgb(30,38,82)', fontSize: 16}}>App Version</Text>
                                <Text style={{
                                    color: '#999',
                                    fontSize: 14
                                }}>{`v${VersionNumber.appVersion} — Build ${VersionNumber.buildVersion}`}</Text>
                            </View>
                            <TouchableOpacity style={{
                                backgroundColor: 'rgb(68,113,250)',
                                borderRadius: 3,
                                paddingVertical: 10,
                                width: '40%'
                            }}>
                                <Text style={{fontSize: 14, color: 'white', textAlign: 'center'}}>GET UPGRADE</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 0.5, backgroundColor: '#ccc', width: '100%', marginVertical: 25}}></View>

                        <View>
                            <Text style={{color: 'rgb(30,38,82)', fontSize: 16}}>Product Capture Priority</Text>
                            <Text style={{color: '#999', fontSize: 14}}>
                                {this.state.selectedIndex2 == 0 && 'Capturing products that must be done in this store'}
                                {this.state.selectedIndex2 == 1 && 'Capturing high-priority products that are likely in this store'}
                                {this.state.selectedIndex2 == 2 && 'Capturing any possible product that needs capture'}
                            </Text>
                            <View style={{marginTop: 15}}>
                                <SegmentedControlTab
                                    tabsContainerStyle={{width: '100%', height: 36}}
                                    values={["STORE LIST", "HIGH PRIORITY", "ALL PRODUCTS"]}
                                    selectedIndex={this.state.selectedIndex2}
                                    onTabPress={(index) => this.handleIndexChange(2, index)}
                                    activeTabStyle={{
                                        backgroundColor: 'rgb(68,113,250)',
                                        borderColor: 'rgb(68,113,250)'
                                    }}
                                    tabStyle={{borderColor: 'rgb(68,113,250)', fontSize: 14}}
                                    activeTabTextStyle={{color: 'white'}}
                                    tabTextStyle={{color: 'rgb(68,113,250)', fontSize: 14}}
                                />
                            </View>
                        </View>
                        <View style={{height: 0.5, backgroundColor: '#ccc', width: '100%', marginVertical: 25}}></View>
                        <View>
                            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} onPress={this.handleCaptureResultScreen}>
                                <View style={{width: '80%'}}>
                                    <Text style={{color: 'rgb(30,38,82)', fontSize: 16}}>Session Capture Status</Text>
                                </View>
                                <Image source={Images.arrowRight} sty={{width: 18, height: 18}}/>
                            </TouchableOpacity>
                            <Text style={{color: '#999', fontSize: 14}}>125 Captured; 68 Synched; 57 Pending
                                Synch</Text>

                            <View style={{
                                width: '80%',
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: '#ccc',
                                marginTop: 20
                            }}>
                                <View style={{
                                    width: '45%',
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: 'rgb(28,222,139)'
                                }}></View>
                            </View>
                            <Text style={{color: '#999', fontSize: 14, marginTop: 5}}>Synch Status: 57% synched to
                                server</Text>
                            <TouchableOpacity style={{
                                backgroundColor: 'rgb(68,113,250)',
                                borderRadius: 3,
                                marginTop: 20,
                                paddingVertical: 10,
                                width: '60%'
                            }} onPress={this.handleSyncScreen}>
                                <Text style={{fontSize: 14, color: 'white', textAlign: 'center'}}>FORCE MANUAL
                                    SYNC</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 0.5, backgroundColor: '#ccc', width: '100%', marginVertical: 25}}></View>
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <View style={{width: '80%'}}>
                                    <Text style={{color: 'rgb(30,38,82)', fontSize: 16}}>Your Messages</Text>
                                </View>
                                <Image source={Images.arrowRight} sty={{width: 18, height: 18}}/>
                            </View>
                            <Text style={{color: '#999', fontSize: 14}}>0 messages</Text>
                        </View>
                        <View style={{height: 0.5, backgroundColor: '#ccc', width: '100%', marginVertical: 25}}></View>
                        <TouchableOpacity onPress={this.handleProductChecklist} style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <Image source={Images.diary} style={{marginRight: 20}}/>
                            <Text style={{color: 'rgb(68,113,250)', fontSize: 16}}>View Product Checklist</Text>
                        </TouchableOpacity>
                        <View style={{height: 0.5, backgroundColor: '#ccc', width: '100%', marginVertical: 25}}></View>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Image source={Images.sms} style={{marginRight: 20}}/>
                            <Text style={{color: 'rgb(68,113,250)', fontSize: 16}}>Message Support</Text>
                        </View>
                        <View style={{height: 0.5, backgroundColor: '#ccc', width: '100%', marginVertical: 25}}></View>
                        <TouchableOpacity onPress={this.handleResetAllTheData} style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <Image source={Images.delete} style={{marginRight: 20}}/>
                            <Text style={{color: 'rgb(241,50,104)', fontSize: 16}}>Reset All Data & Restart
                                Session</Text>
                        </TouchableOpacity>
                        <View style={{height: 0.5, backgroundColor: '#ccc', width: '100%', marginVertical: 25}}></View>
                        <TouchableOpacity onPress={this.handlePressLogout} style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <Image source={Images.logout} style={{marginRight: 20}}/>
                            <Text style={{color: 'rgb(241,50,104)', fontSize: 16}}>Log Out</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
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
)

export default enhance(Index)

const Info = ({label, value}) => (
    <View style={Styles.info}>
        <Text style={Styles.infoLabel}>{label}</Text>
        <Text>{value}</Text>
    </View>
)
