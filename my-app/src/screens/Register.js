import { Text, View } from 'react-native'
import React, { Component } from 'react'
import RegisterForm from '../components/RegisterForm'

class Register extends Component {
  render() {
    return (
      <View>
        <Text>Registrate aqui</Text>
        <RegisterForm/>
      </View>
    )
  }
}

export default Register