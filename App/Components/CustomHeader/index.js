import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Images } from '@Themes';
import styles from './styles';

export const CustomHeader = ({ title }) => {
  return (
      <Animatable.View style={styles.title}>
          <Animatable.Text style={styles.titleText}>{title}</Animatable.Text>
          <TouchableOpacity style={styles.closeImageWrapper}>
              <Animatable.Image source={Images.closeBlack} style={styles.close} />
          </TouchableOpacity>
      </Animatable.View>
  )
};
