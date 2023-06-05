import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'

class RegisterForm extends Component {
  render() {
    return (
      <View>
        <TextInput
            style={styles.input}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        bortherWidth: 1,
        borderColor: '#d3d3d3',
    }
})
export default RegisterForm