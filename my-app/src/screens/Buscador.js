import React, { Component } from 'react'
import { FlatList, TextInput, View, Text } from 'react-native'
import { db } from '../firebase/config'

class Buscador extends Component {

    constructor(props){
        super(props)
        this.state={
            busqueda:'',
            usuarios:[],
            usuariosBackup: []
        }
    }

    componentDidMount(){
    db.collection('users').onSnapshot(
        docs => {
            let arrUsers = []
            docs.forEach(doc => {arrUsers.push({
                id:doc.id,
                data: doc.data() //info que trae del documento
            })
        })
        this.setState({usuarios, usuariosBackup:arrUsers})
        }
    )
    }

    metodoQueFiltra(filtro){
        let arrFiltrado = this.state.usuariosBackup
        .filter(usuario => usuario.data.owner.toLowerCase().includes(filtro.toLowerCase()))
        this.setState({usuarios:arrFiltrado})
    }

  render() {
    return (
      <View>
          <Text>Buscador</Text>
          <TextInput
          placeholder='Ingresa Mail'
          onChangeText={(text) => this.setState({busqueda:text})}
          />
          <FlatList
          data={this.state.usuarios}
          keyExtractor={item => item.id.toString()}
          renderItem = {({item})=> <Text>{item.data.owner}</Text>}
          />
      </View>
    )
  }
}

export default Buscador