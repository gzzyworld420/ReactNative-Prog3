

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
// image es un componente para mostrar imagenes en la interfaz 
import { Text, TextInput, View, StyleSheet } from 'react-native'

// el codigo de este componente esta escrito como un componente de clase, pero no tiene constructor 
// no se usa ningun estado interno en el componente 
// recibe datos y funcionalidades a traves de las propiedades this.props y muestra un campo de entrada de texto 
// dado que no se necesita inicializar el estado ni enlazar metodos, no se requiere constructor 

// creo un componente de clase llamado formPost, que exstiende la clase component 
// la sintaxis esta significa que cuando importe este archivo en otro lugar, puedo asignare cualquier nombre 
export default class FormPost extends Component {
  
    // el metodo render es parte del ciclo de vida de un componente en React 
    // se usa para renderizar y mostrar el contenido del componente en la interfaz de usuario 
    render(){
      // return es una declaracion utilizada en las funciones para devolver un valor o un conjunto de elementos 
      // return marca el inicio del retorno del JSX (javascript XML)
      // es una sintaxis similar a HTML utilizada en react para definir una estructura 
      return(

      // el componente textimput tiene varias propiedades
      // keyboardtype establece el tipo de teclado que se muestra cuando el usuario interactua con el componente de entrada de texto 
      // value no tiene ningun valor asignado por lo q se muestra vacio
      // onchangetaxt es un controlador de eventos que se ejecuta cunado se realiza un cambio 
      // se llama a la funcion actualizardescripcion pasandole texto 

      // este codigo renderiza un componente de entrada de texto para actualizar descripcion 
      <View>
        <TextInput
        style
        keyboardType='default'
        value= ''
        onChangeText={(text)=> this.props.actualizarDescripcion(text)}
        />
      </View>
    )
  }
}

// se utiliza const para declarar una constante en javascript
// en este caso declare la variable style como una constante y le asigne el objeto StyleSheet.create
// se define un objeto style utilizando un metodo StyleSheet.create de react native 
// el objeto contiene estilos CSS que se usan para dar estilo a los componentes 
// estos estilos se aplican a los componentes correspondientes en el codigo JSX para darles apariencia 
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'red',
        padding: 10
    }
})