import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login'
import Register from '../screens/Register'

class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            userName:'',
            bio:'',
            alert: false,
            fotoDePerfil:''
        }
    }

resgistrarUsuario(email, password, userName, bio){
    if(email === ''|| password ===''|| userName=== ''){
        this.setState({
            alert: true
        })

    } else (
        auth.createUserWithEmailAndPassword(email, password)
        .then(data => {
            db.collection('users').add({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                userName: this.state.userName,
                bio: this.state.bio,
                fotoDePerfil: this.state.fotoDePerfil
            },
            this.props.navigation.navigate('Login'))
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
        })

    )

}

  render() {
    return (

    <View style={style.container}>

        <TextInput style={style.field}
            keyboardType='email-address'
            placeholder='Introduzca su email aqui'
            onChangeText={ text => this.setState({email:text})}
            value={this.state.email}
            />
        <TextInput style={style.field}
            placeholder='Contraseña'
            secureTextEntry= {true}
            onChangeText={ text => this.setState({password:text})}
            value={this.state.password}
            />
        <TextInput style={style.field}
            placeholder='Nombre de Usuario'
            onChangeText={ text => this.setState({userName:text})}
            value={this.state.userName}
            />
        <TextInput style={style.field}
            placeholder='Mini bio'
            onChangeText={ text => this.setState({bio:text})}
            value={this.state.bio}
            />

        {this.state.alert && (
                <View>
                    <Text>El campo debe completarse</Text>
                </View>
        )}

        <TouchableOpacity style={style.button}
            onPress={() => this.resgistrarUsuario(this.state.email, this.state.password, this.state.bio) }>
            <Text style={style.buttonText}> Registrarme </Text>
        </TouchableOpacity>
        
          <TouchableOpacity style={style.button}
            onPress={()=> this.props.navigation.navigate('Login')}>
            <Text style={style.buttonText}> Ya estoy registrado </Text>
        </TouchableOpacity>


    </View>
    )
  }
}

const style = StyleSheet.create({

    container:{ 
 
     },
    field:{
        bortherWidth: 2,
        borderColor: 'black',
        backgroundColor: 'yellow',
        margin: '5px',
        padding: '5px'
    },
    button:{
       margin: '5px',
       alignItems:'center',
       backgroundColor: 'black',
       padding: '5px'
    },

    buttonText:{
        color: 'white',
    }
    })
export default RegisterForm