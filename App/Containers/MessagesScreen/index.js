import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, ActivityIndicator, StatusBar, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { compose, withPropsOnChange } from 'recompose';
import { get as _get } from 'lodash';

import { withAuth, withCreateAccount, withLogin } from '../../GraphQL/Account/decorators';
import withApollo from '../../Decorators/withApollo';
import { CustomHeader } from '../../Components/CustomHeader';

import styles from './styles';

const messages1 = [];

const messages2 = [];

class MessagesScreen extends Component {
    static propsTypes = {

    };

    constructor(props) {
        super(props);

        this.state = {}
    }

    handleClose = () => {
        this.props.navigation.goBack();
    };

    render() {

        StatusBar.setBarStyle('dark-content', true);
        return (
            <Animatable.View style={styles.container}>
                <CustomHeader
                    title={'Your Messages'}
                    onClose={this.handleClose}
                />
                <Animatable.View style={styles.innerContainer}>
                    <TouchableOpacity style={styles.messageSupport}>
                        <Animatable.Text style={styles.messageSupportText}>MESSAGE SUPPORT</Animatable.Text>
                    </TouchableOpacity>
                    <Animatable.Text style={styles.messageNumText}>Your Messages ({messages1.length})</Animatable.Text>
                </Animatable.View>
                <ScrollView style={styles.messageDetail}>
                    {
                        messages1.length === 0 &&
                            <Animatable.View>
                                <Animatable.View>
                                    {/*<Animatable.Image style={{ width: '100%', height: '100%' }} source={} />*/}
                                </Animatable.View>
                            </Animatable.View>
                    }
                </ScrollView>
            </Animatable.View>
        )
    }
}

const enhance = compose(
    withAuth,
    withPropsOnChange(
        (props, nextProps) =>
            _get(props, 'auth.session.isAuthenticated', false) !== _get(nextProps, 'auth.session.isAuthenticated', false),
        ({ auth }) => ({ isAuthenticated: _get(auth, 'session.isAuthenticated', false) })
    ),
    withLogin,
    withCreateAccount,
);

export default enhance(MessagesScreen);

