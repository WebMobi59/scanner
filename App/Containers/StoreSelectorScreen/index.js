import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { compose, withPropsOnChange } from 'recompose';
import { get as _get } from 'lodash';
import RNPickerSelect from 'react-native-picker-select';
import {Metrics, Images, Colors, Fonts, ApplicationStyles} from '../../Themes';
import styles from './styles';

// import * as inputValidators from '../../Lib/InputValidators'
// import { keyboardDidShow, keyboardDidHide } from '../../Lib/ComponentEventHandlers'
// import Button from '../../Components/Button'
// import ValidatedTextInput from '../../Components/ValidatedTextInput'

// React Apollo
import { withAuth, withCreateAccount, withLogin } from '../../GraphQL/Account/decorators'
import * as scale from '../../Utils/Scale';

const items = [
    {
        label: 'Ohio - Andersown Township',
        value: 'township',
        texts: {
            up: 'Anderson Township',
            bottom: 'Cincinatti, Ohio'
        }
    },
    {
        label: 'Ohio - Florence Marketplace',
        value: 'marketplace',
        texts: {
            up: 'Florence Marketplace',
            bottom: 'Cincinatti, Ohio'
        }
    },
    {
        label: 'Ohio - Greenwood (Ralph\'s)',
        value: 'ralph',
        texts: {
            up: 'Greenwood (Ralph\'s)',
            bottom: 'Cincinatti, Ohio'
        }
    }
];

class StoreSelectorScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleHeight: Metrics.screenHeight,
            selectedStore: '',
            selectedStoreLabel: ''
        };
    }

    handleEnterPhotoMode = () => {
        this.props.navigation.navigate('PartnerSelectorScreen', { transition: 'card' })
    };

    handleEnterRunnerMode = () => {
        this.props.navigation.navigate('PartnerSelectorScreen', { transition: 'card' })
    };

    selectStore = (value) => {
        this.setState({ selectedStore: value }, () => {
            this.setState({ selectedStoreLabel: items.filter(item => item.value === value)[0].texts });
        });
    };

    render() {
        const { selectedStore, selectedStoreLabel } = this.state;

        return (
            <Animatable.View style={styles.container}>
                <Animatable.View style={styles.imageWrapper}>
                    <Animatable.Image source={Images.store} style={styles.store} animation="fadeIn" />
                </Animatable.View>
                <Animatable.View style={styles.welcomeTextWrapper}>
                    <Animatable.Text style={styles.welcomeText}>Select a Store</Animatable.Text>
                </Animatable.View>
                <Animatable.Text style={styles.selectText}>Are you taking photos in a physical store?</Animatable.Text>
                <TouchableOpacity style={styles.selectOption}>
                    <Animatable.View style={[{width: 30 * scale.widthRatio, height: 28 * scale.heightRatio}]}>
                        <Animatable.Image source={Images.store} style={styles.option} animation="fadeIn" />
                    </Animatable.View>
                    <Animatable.View style={styles.text}>
                        <RNPickerSelect
                            placeholder={{ label: 'Choose One' }}
                            placeholderTextColor={'#1f2952'}
                            items={items}
                            onValueChange={this.selectStore}
                            value={selectedStore}
                        >
                            {
                                !!selectedStore ?
                                    <React.Fragment>
                                        <Animatable.Text style={styles.upText}>{selectedStoreLabel.up}</Animatable.Text>
                                        <Animatable.Text style={styles.bottomText}>{selectedStoreLabel.bottom}</Animatable.Text>
                                    </React.Fragment>  :
                                    <Animatable.Text style={styles.placeholderText}>
                                        Select Store
                                    </Animatable.Text>
                            }
                        </RNPickerSelect>
                    </Animatable.View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.finishButton}>
                    <Animatable.Text style={styles.finishText}>Finish</Animatable.Text>
                </TouchableOpacity>
                <Animatable.View style={styles.textGroup}>
                    <Animatable.Text style={styles.text1}>I’m not in a store</Animatable.Text>
                    <Animatable.Text style={styles.text2}>Skip store selection</Animatable.Text>
                    <Animatable.View style={styles.underLine} />
                </Animatable.View>
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
    withCreateAccount
);

export default enhance(StoreSelectorScreen);
