import React, {Component} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {CustomHeader} from '../../Components/CustomHeader';
import {Images} from '@Themes';
import * as scale from '../../Utils/Scale';
import styles from './styles';
import {capturedData} from '../../Utils/StaticData';

class CaptureResultScreen extends Component {
    constructor() {
        super();

        this.state = {
            index: 0,
            routes: [
                {key: 'errors', title: this.renderTitle('errors')},
                {key: 'captured', title: this.renderTitle('captured')},
                {key: 'synched', title: this.renderTitle('synched')},
                {key: 'pending', title: this.renderTitle('pending')}
            ]
        };
    }

    renderTitle = (tab) => {
      switch (tab) {
          case 'errors':
              const errorNum = capturedData.filter(captureRow => captureRow.syncStatus === 'synch failed').length;
              return `ERRORS (${errorNum})`;
          case 'captured':
              return `CAPTURED (${capturedData.length})`;
          case 'synched':
              const syncedNum = capturedData.filter(captureRow => captureRow.syncStatus === 'synched').length;
              return `SYNCHED (${syncedNum})`;
          case 'pending':
              const pendingNum = capturedData.filter(captureRow => captureRow.syncStatus === 'pending synch').length;
              return `PENDING (${pendingNum})`;
          default:
              return `CAPTURED (${capturedData.length})`;
      }
    };

    renderSyncStatus = (syncRow, i) => {
        return (
            <Animatable.View style={styles.syncRowContainer} key={i}>
                <Animatable.View style={styles.syncRowUp}>
                    <Animatable.View style={styles.syncDetail}>
                        <Animatable.Text style={styles.syncId}>{syncRow.id}</Animatable.Text>
                        <Animatable.Text style={styles.syncName}>
                            { syncRow.syncName };{ syncRow.date }
                        </Animatable.Text>
                    </Animatable.View>
                    <Animatable.View style={[styles.syncStatus, { backgroundColor: this.getBackground(syncRow.syncStatus) }]}>
                        <Animatable.Text style={styles.syncStatusText}>{syncRow.syncStatus}</Animatable.Text>
                    </Animatable.View>
                </Animatable.View>
                {
                    syncRow.syncStatus === 'synch failed' &&
                    <Animatable.Text style={styles.errorText}>
                        Some status message that we can give the user.
                    </Animatable.Text>
                }
                <Animatable.View style={styles.syncRowDown}>
                    {
                        syncRow.images && syncRow.images.map((image, index) => {
                            return <Animatable.Image source={image} key={index} style={styles.syncFailedImage} />
                        })
                    }
                </Animatable.View>
            </Animatable.View>
        )
    };

    getBackground = (status) => {
        if (status === 'pending synch') {
            return '#c7c9d4';
        } else if (status === 'synching') {
            return '#a65dfb';
        } else if (status === 'synch failed') {
            return '#f54370';
        } else if (status === 'synched') {
            return '#00dc92';
        }
    };

    _renderScene = ({route}) => {
        const {index} = this.state;
        switch (route.key) {
            case 'errors':
                return index === 0 &&
                    <ScrollView style={styles.tabView}>
                        {
                            capturedData.filter(captureRow => captureRow.syncStatus === 'synch failed').map((row, i) => {
                                return this.renderSyncStatus(row, i);
                            })
                        }
                    </ScrollView>;
            case 'captured':
                return index === 1 &&
                    <ScrollView>
                        {
                            capturedData.map((row, i) => {
                                return this.renderSyncStatus(row, i);
                            })
                        }
                    </ScrollView>;
            case 'synched':
                return index === 2 &&
                    <ScrollView>
                        {
                            capturedData.filter(captureRow => captureRow.syncStatus === 'synched').map((row, i) => {
                                return this.renderSyncStatus(row, i);
                            })
                        }
                    </ScrollView>;
            case 'pending':
                return index === 3 &&
                    <ScrollView>
                        {
                            capturedData.filter(captureRow => captureRow.syncStatus === 'pending synch').map((row, i) => {
                                return this.renderSyncStatus(row, i);
                            })
                        }
                    </ScrollView>;
            default:
                return index === 0 &&
                    <ScrollView>
                        {
                            capturedData.map((row, i) => {
                                return this.renderSyncStatus(row, i);
                            })
                        }
                    </ScrollView>;
        }
    };

    _renderTabBar = (props) => {
        return (
            <Animatable.View style={styles.tabBar}>
                {
                    props.navigationState.routes.map((route, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.tabItem}
                                onPress={() => this.setState({index: index})}
                            >
                                <Animatable.Text
                                    style={[styles.tabTitle, {color: this.state.index === index ? '#1f2952' : '#232f5b'}]}>{route.title}</Animatable.Text>
                                <Animatable.View
                                    style={[styles.tabIndicator, {backgroundColor: this.state.index === index ? '#233162' : 'white'}]}/>
                            </TouchableOpacity>
                        )
                    })
                }
            </Animatable.View>
        )
    };

    render() {
        return (
            <Animatable.View style={styles.container}>
                <CustomHeader title={'Capture Status'}/>
                <TouchableOpacity style={styles.manualRefresh}>
                    <Animatable.Text style={styles.refreshText}>FORCE MANUAL RESYNCH</Animatable.Text>
                </TouchableOpacity>
                <Animatable.View style={styles.captureStatus}>
                    <Animatable.View style={styles.warning}>
                        <Animatable.Image source={Images.warning} style={styles.warningImage}/>
                        <Animatable.Text style={styles.warningResult}>3 Errors</Animatable.Text>
                    </Animatable.View>
                    <Animatable.View style={styles.pending}>
                        <Animatable.Image source={Images.pending} style={styles.pendingImage}/>
                        <Animatable.Text style={styles.pendingResult}>57 Pending Synch</Animatable.Text>
                    </Animatable.View>
                </Animatable.View>
                <Animatable.View style={styles.tabContainer}>
                    <TabView
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderTabBar={this._renderTabBar}
                        onIndexChange={index => this.setState({index})}
                        initialLayout={{width: 1 * scale.deviceWidth, height: 0}}
                    />
                </Animatable.View>
            </Animatable.View>
        )
    }
}

export default CaptureResultScreen;
