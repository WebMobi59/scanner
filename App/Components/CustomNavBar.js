import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import styles from './Styles/CustomNavBarStyles';
import * as scale from '../Utils/Scale';

export default class CustomNavBar extends Component {
    render() {
        const {onPress, title, baseScreen} = this.props;
        return (
            <View style={styles.container}>
                {
                    !baseScreen &&
                    <TouchableOpacity style={styles.backButton} onPress={onPress}>
                        <IonIcons name={'ios-arrow-back'} size={26 * scale.heightRatio} color={'grey'} />
                    </TouchableOpacity>
                }
                <Text style={styles.title}>{title}</Text>
            </View>
        )
    }
}
