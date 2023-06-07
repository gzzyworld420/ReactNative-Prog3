import { Text, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'


class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state={
            email: '',
            password:'',
            alert: false
        }
    }

logearUsuario(email, password){
    auth.signInWithEmailAndPassword(email, password)
        .then(data => this.props.navigation.navigate('HomeNavigation'))
        .catch(error => this.setState({
            alert: true
        }))
}
  render() {
    return (
      <View>
          <TextInput
            placeholder='Email'
            keyboardType='email-address'
            onChangeText={(text)=> this.setState({email: text}) }
            value={this.state.email}
          />

      </View>
    )
  }
}

export default LoginForm
