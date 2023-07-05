

// importo los modulos react y component de la biblioteca react 
// me permite utilizar las funcionalidades de react y la clase component para crear componentes 
// react es la biblioteca principal de javascript para construir interfaces de usuario iteractivas y reutilizables 
// react proporciona metodos y herramientas para crear componentes y gestionar el estado de la app 
// component es una clase base que permite crear componentes personalizados con funcionalidades especificas 
import React, { Component } from 'react'

// importamos varios componentes y modulos de la biblioteca react native 
// view componente es un contenedor flexible para otros componentes, organizamos elementos en al interfaz 
// text componente se usa para renderizar texto en la interfaz de usuario 
// stylesheet es un modulo para crear y gestionar estilos 
// touchableOpacity componente para envolver otros componentes y agregar respuesta tactil al interactuar 
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native'

// importamos los objetos db y auth desde el archivo de firebase 
// '../firebase/config' es una ruta relativa 
// db proporciona metodos y funcionalidades para interactuar, operaciones de lectura, escritura, actualizacion y eliminacion 
// auth proporciona metodos para gestionar la autenticacion de usuarios (registrar, iniciar sesion, etc)
import {db, auth} from '../firebase/config'

// importo el componente formpost generado por nosotros 
import FormPost from '../components/FormPost'


// la clase newpost es un componente de React de la clase base "Component"
// newpost es un componente personalizado que puedo usar en la app 
class NewPost extends Component{

  // el constructor es un metodo en javascript, sirve para inicializar el estado y las propiedades del objeto q creamos 
  // recibe como parametro las props, las cuales son inmutables, no cambian
  // las props son un objeto que contiene los valores de propiedades pasadas desde el componente padre 
  constructor(props){
      // super(props) se utiliza para llamar al constructor de la clase base "component"
      // permite que el constructor realice cualquier inicializacion o configuracion necesaria con las props 
      // se asegura que inicien correctamente las propiedades heredadas 
      // es importante para mantener la herencia y el comportamiento correcto de las props 
      super(props);
      // this.state refiere al objeto de estado de un componente en react 
      // el estado es un objeto que contiene datos que pueden cambiar a lo largo del ciclo de vida del componente 
      // se utiliza para iniciar el estado del componente 
      this.state = {
      // las siguientes 4 son propiedades 
      // descripcion almacena el texto asociado al post 
      // foto guarda la informacion o referencia de la imagen sacada 
      // likes es un array que contiene los datos de los usuarios que indicaron uqe les gusta 
      // comments es un array que guarda los comentarios realizados por los usuarios en el post 
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
      // catch es un metodo utilizado en javascript para capturar y manejar errores de bloques de codigo 
      // capturamos cualquier error que pueda ocurrir durante la solicitud 
      // si se produce un error se registra en la consola, y lo podemos manejar de manera adecuada
      .catch(err => console.log(err))

  }



    // el metodo render es parte del ciclo de vida de un componente en React 
    // se usa para renderizar y mostrar el contenido del componente en la interfaz de usuario 
    render(){
      // return es una declaracion utilizada en las funciones para devolver un valor o un conjunto de elementos 
      // return marca el inicio del retorno del JSX (javascript XML)
      // es una sintaxis similar a HTML utilizada en react para definir una estructura 
      return(
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

// export default indica que se esta exportando el componente (archivo entero)
// al usar export default no es necesario especificar un nombre para importar el componente en destino 
// solo se puede tener una exportacion predeterminada por archivo 
// esta listo para poder importarlo desde otro modulo 
export default NewPost