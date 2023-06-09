import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import RegisterForm from '../components/RegisterForm'
import { auth } from '../firebase/config'
import { withSafeAreaInsets } from 'react-native-safe-area-context'

class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            props: props,
            email: '',
            password:'',

        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
          if(user){
            this.props.navigation.navigate('Login')
          }
        })
      }

  render() {
    return (
 <View>
        <RegisterForm navigation={this.props.navigation}/>
 </View>


      
    )
  }
}



export default Register