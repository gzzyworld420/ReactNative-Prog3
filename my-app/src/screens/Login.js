import React, { Component } from 'react'
import { View } from 'react-native'
import LoginForm from '../components/LoginForm'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }

  render() {
    return (
      <View>
          <LoginForm navigation={this.props.navigation}/>
      </View>  
    )
  }
}
