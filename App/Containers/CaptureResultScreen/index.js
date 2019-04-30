import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { CustomHeader } from '../../Components/CustomHeader';
import { Images } from '@Themes';
import * as scale from '../../Utils/Scale';
import styles from './styles';

class CaptureResultScreen extends Component {
    constructor() {
        super();

        this.state = {
            index: 0,
            routes: [
                { key: 'errors', title: 'ERRORS' },
                { key: 'captured', title: 'CAPTURED' },
                { key: 'synched', title: 'SYNCHED' },
                { key: 'pending', title: 'PENDING' }
            ]
        };
    }

    _renderScene = ({ route }) => {
        const { index } = this.state;
        switch (route.key) {
            case 'errors':
                return index === 0 &&
                    <Animatable.Text>ERROR TAB</Animatable.Text>;
            case 'captured':
                return index === 1 &&
                    <Animatable.Text>CAPTURED</Animatable.Text>;
            case 'synched':
                return index === 2 &&
                    <Animatable.Text>SYNCHED</Animatable.Text>;
            case 'pending':
                return index === 3 &&
                    <Animatable.Text>PENDING</Animatable.Text>;
            default:
                return index === 0 &&
                    <Animatable.Text>PENDING</Animatable.Text>;
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
                                onPress={() => this.setState({ index: index })}
                            >
                                <Animatable.Text style={[styles.tabTitle, { color: this.state.index === index ? '#1f2952' : '#232f5b' }]}>{route.title}</Animatable.Text>
                                <Animatable.View style={[styles.tabIndicator, {backgroundColor: this.state.index === index ? '#233162' : 'white'}]} />
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
                <CustomHeader title={'Capture Status'} />
                <TouchableOpacity style={styles.manualRefresh}>
                    <Animatable.Text style={styles.refreshText}>FORCE MANUAL RESYNCH</Animatable.Text>
                </TouchableOpacity>
                <Animatable.View style={styles.captureStatus}>
                    <Animatable.View style={styles.warning}>
                        <Animatable.Image source={Images.warning} style={styles.warningImage} />
                        <Animatable.Text style={styles.warningResult}>3 Errors</Animatable.Text>
                    </Animatable.View>
                    <Animatable.View style={styles.pending}>
                        <Animatable.Image source={Images.pending} style={styles.pendingImage} />
                        <Animatable.Text style={styles.pendingResult}>57 Pending Synch</Animatable.Text>
                    </Animatable.View>
                </Animatable.View>
                <Animatable.View style={styles.tabContainer}>
                    <TabView
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderTabBar={this._renderTabBar}
                        onIndexChange={index => this.setState({ index })}
                        initialLayout={{ width: 1 * scale.deviceWidth, height: 0 }}
                    />
                </Animatable.View>
            </Animatable.View>
        )
    }
}

export default CaptureResultScreen;
