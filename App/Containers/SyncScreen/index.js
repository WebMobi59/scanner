import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {compose, withPropsOnChange} from 'recompose';
import {get as _get} from 'lodash';
import {Metrics, Images, Colors, Fonts, ApplicationStyles} from '@Themes';
import styles from './styles';
import * as scale from '../../Utils/Scale';

// React Apollo
import {withAuth, withCreateAccount, withLogin} from '@GraphQL/Account/decorators';

class SyncScreen extends Component {
    constructor() {
        super();

        this.circularProgress = null;

        this.state = {
            fill: 100
        }
    }

    componentDidMount(): void {
        this.circularProgress.animate(100, 8000);
    }

    render() {
        return (
            <Animatable.View style={styles.container}>
                <Animatable.View style={styles.title}>
                    <Animatable.Text style={styles.titleText}>Manual Synch</Animatable.Text>
                    <TouchableOpacity style={styles.closeImageWrapper}>
                        <Animatable.Image source={Images.closeBlack} style={styles.close} />
                    </TouchableOpacity>
                </Animatable.View>
                <Animatable.View style={styles.progressCircle}>
                    <AnimatedCircularProgress
                        size={240}
                        width={8}
                        fill={this.state.fill}
                        tintColor="#00dc92"
                        backgroundColor="rgba(31, 41, 82, 0.08)"
                        ref={(ref) => this.circularProgress = ref}
                    >
                        {
                            (fill) => {
                                return (
                                    <Animatable.View style={styles.points}>
                                        <Animatable.Text style={styles.progressNum}>
                                            {Math.round(fill)}
                                        </Animatable.Text>
                                        <Animatable.Text style={styles.description}>
                                            Products to Synch
                                        </Animatable.Text>
                                    </Animatable.View>
                                )
                            }
                        }
                    </AnimatedCircularProgress>
                </Animatable.View>
                <TouchableOpacity style={styles.progressButton}>
                    <Animatable.Text style={styles.buttonText}>Start Synch</Animatable.Text>
                </TouchableOpacity>
            </Animatable.View>
        )
    }
}

const enhance = compose(
    withAuth,
    withPropsOnChange(
        (props, nextProps) =>
            _get(props, 'auth.session.isAuthenticated', false) !== _get(nextProps, 'auth.session.isAuthenticated', false),
        ({auth}) => ({isAuthenticated: _get(auth, 'session.isAuthenticated', false)})
    ),
    withLogin,
    withCreateAccount
);

export default enhance(SyncScreen);
