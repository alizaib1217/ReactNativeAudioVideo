import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Button extends Component {
  render() {
    const {text, style} = this.props;
    return (
      <TouchableOpacity onPress={this.props.onPress}
                        style={[styles.containerStyle, style]}>
        <Text style={[styles.textStyle]}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: "red",
    marginHorizontal:10,
    marginTop:10,
    borderRadius:5,

  },
  textStyle: {
    color:"#fff",
    fontSize:15,

  }


}
