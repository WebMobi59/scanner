import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text } from 'react-native'

const ValueType = PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])

export default class InlineSelect extends PureComponent {
  static propTypes = {
    value: ValueType,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        key: ValueType,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
      })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    compact: PropTypes.bool
  }

  render () {
    const { value, options, onChange, compact, style } = this.props

    return (
      <View style={[Styles.root, style]}>
        {options.map(({ key, label }, index) => (
          <TouchableOpacity
            key={key}
            onPress={() => onChange(key)}
            style={[
              Styles.option,
              compact && Styles.option_compact,
              index < options.length - 1 ? Styles.optionBorder : null,
              key === value ? Styles.selected : null
            ]}
          >
            <Text style={[Styles.text, compact && Styles.text_compact]}>{label}</Text>
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
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.white,
    overflow: 'hidden'
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.baseMargin
  },
  option_compact: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: 4
  },
  optionBorder: {
    borderRightWidth: 1,
    borderColor: Colors.border
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
