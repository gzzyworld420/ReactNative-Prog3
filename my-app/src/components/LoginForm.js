import { Text, TextInput, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'
import Home from '../screens/Home'
import Profile from '../screens/Profile'


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
          {/* <TextInput
            placeholder='Email'
            keyboardType='email-address'
            onChangeText={(text)=> this.setState({email: text}) }
            value={this.state.email}
          />
          <TextInput
            placeholder='Password'
            keyboardType='password'
            secureTextEntry={true}
            type='password'
            onChangeText={(text)=> this.setState({password: text}) }
            value={this.state.password}
          /> */}

          <Home {...this.props}/>
          <Profile/>
      </View>
    )
  }
}

export default LoginForm
