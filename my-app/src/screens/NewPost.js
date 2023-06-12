import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import {db, auth} from '../firebase/config'
import FormPost from '../components/FormPost'

class NewPost extends Component {
  constructor (props){
    super(props)
    this.state = {
      descripcion: '',
      foto: '',
      likes:[],
      comments:[]

    }
  }

  actualizarDescripcion(text){
    this.setState({
      descripcion: text
    })
  }
 
  crearPosteo({ descripcion, foto, likes, comments }) {
    db.collection('posteos').add({
      owner: auth.currentUser.email,
      descripcion: descripcion,
      foto: foto,
      createdAt: Date.now(),
      likes: likes,
      comments: comments,
    })
      .then((resp) => {
        this.props.navigation.navigate('Home')
      })
      .catch(err => console.log(err))

  }



  render() {
    return (
      <View>
        <FormPost actualizarDescripcion={(text) => this.actualizarDescripcion(text) }></FormPost>
        <TouchableOpacity
          onPress={() => this.crearPosteo({
            descripcion: this.state.descripcion,
            foto: this.state.foto,
            likes: this.state.likes,
            comments: this.state.comments
          })}
        >
          <Text>Enviar Posteo</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default NewPost