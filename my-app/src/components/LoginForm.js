import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
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
          <TextInput
            style={style.field}

            placeholder='Email'
            keyboardType='email-address'
            onChangeText={(text)=> this.setState({email: text}) }
            value={this.state.email}
          />
          <TextInput
            style={style.field}
            placeholder='Contraseña'
            secureTextEntry= {true}
            onChangeText={(text)=> this.setState({password: text}) }
            value={this.state.password}
          />
          <TouchableOpacity
          style={style.button}
          onPress={()=> this.logearUsuario(this.state.email, this.state.password)}>
            <Text style={style.buttonText}>Login</Text>
          </TouchableOpacity>
        
              <TouchableOpacity style={style.button}
              onPress={()=> this.props.navigation.navigate('Register')}>
                  <Text style={style.buttonText}>No estoy registrado</Text>
              </TouchableOpacity>
         
        <TextInput
            placeholder='Password'
            keyboardType='password'
            secureTextEntry={true}
            type='password'
            onChangeText={(text)=> this.setState({password: text}) }
            value={this.state.password}
          />

          <Home {...this.props}/>
          <Profile/>
      </View>
    )
  }
}

const style = StyleSheet.create({
    field:{
        bortherWidth: 2,
        borderColor: 'black',
        backgroundColor: 'yellow',
        margin: '5px',
        padding: '5px'
    },

    button:{
        alignItems:'center',
        margin: '5px',
        backgroundColor: 'black',
        padding: '5px'
    },

    buttonText:{
        color: 'white'
    }
})

export default LoginForm
