import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text } from 'react-native'

const ValueType = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

export default class PillList extends PureComponent {
  static propTypes = {
    value: ValueType,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        key: ValueType,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
      })
    ).isRequired,
    onChange: PropTypes.func.isRequired
  }

  render () {
    const { value, options, onChange, style } = this.props

    return (
      <View style={[Styles.root, style]}>
        {options.map(({ key, label }, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onChange(key)}
            style={[Styles.option, key === value ? Styles.selected : null]}
          >
            <Text style={Styles.text}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../Themes'

const Styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  option: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Metrics.doubleBaseMargin,
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 40,
    height: 40
  },
  selected: {
    backgroundColor: Colors.green
  },
  text: {
    color: Colors.text
  },
  text_compact: {
    ...Fonts.style.small
  }
})
