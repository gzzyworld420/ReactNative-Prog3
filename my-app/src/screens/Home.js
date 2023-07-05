

// importo los modulos react y component de la biblioteca react 
// me permite utilizar las funcionalidades de react y la clase component para crear componentes 
// react es la biblioteca principal de javascript para construir interfaces de usuario iteractivas y reutilizables 
// react proporciona metodos y herramientas para crear componentes y gestionar el estado de la app 
// component es una clase base que permite crear componentes personalizados con funcionalidades especificas 
import React, { Component } from 'react';

// importamos varios componentes y modulos de la biblioteca react native 
// view componente es un contenedor flexible para otros componentes, organizamos elementos en al interfaz 
// text componente se usa para renderizar texto en la interfaz de usuario 
// stylesheet es un modulo para crear y gestionar estilos 
// touchableOpacity componente para envolver otros componentes y agregar respuesta tactil al interactuar 
// image es un componente para mostrar imagenes en la interfaz 
// flatlist para renderizar listas de datos de forma eficiente 
// activityIndicator sirve para mostrar un indicador de carga o progreso en una interfaz de usario 
import { TouchableOpacity, View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';

// importo una imagen ubicada en assets 
import logo from '../../assets/logo.png';

// importo el componente card generado por nosotros 
import Card from '../components/Card';

// importamos los objetos db desde el archivo de firebase 
// '../firebase/config' es una ruta relativa 
// db proporciona metodos y funcionalidades para interactuar, operaciones de lectura, escritura, actualizacion y eliminacion 
import { db } from '../firebase/config';

// la clase home es un componente de React de la clase base "Component"
// home es un componente personalizado que puedo usar en la app 
class Home extends Component{

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
            // las siguientes 2 son propiedades 
            // posteos se utiliza para almacenar una lista de publicaciones o post en mi app 
            // posteos es un array vacio 
            // loader sirve para indicar que se esta cargando contenido, ture muestra un indicador de carga 
            posteos: [],
            loader: true
        }
    }

    

    // el metodo componentDidMount es un metodo del ciclo de vida de un componente en react 
    // se llama automaticamente despues de que el componente se haya montado en el DOM
    // el DOM es una interfaz que permite acceder y manipular los elementos y contenido de un documento de manera programatica 
    // el DOM organiza los elementos del documento en una etrucutra de arbol, donde cada elemento es un nodo en el arbol 
    
    componentDidMount() {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
            let posts = [];
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            this.setState({
                posteos: posts,
                loader: false
            })
        })
    };

    // el metodo render es parte del ciclo de vida de un componente en React 
    // se usa para renderizar y mostrar el contenido del componente en la interfaz de usuario 
    render(){
        // return es una declaracion utilizada en las funciones para devolver un valor o un conjunto de elementos 
        // return marca el inicio del retorno del JSX (javascript XML)
        // es una sintaxis similar a HTML utilizada en react para definir una estructura 
        return(
            <View style={style.container}>
                <Image
                    style={style.image}
                    source={logo}
                />
                {this.state.loader === true ?
                    <ActivityIndicator size='large' color='green' />
                    :
                    <FlatList
                        style={style.flatList}
                        data={this.state.posteos}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Card data={item} homeProps={this.props} />}
                    />
                    
                }
            </View>
        )
    }



    
}

// se utiliza const para declarar una constante en javascript
// en este caso declare la variable style como una constante y le asigne el objeto StyleSheet.create
// se define un objeto style utilizando un metodo StyleSheet.create de react native 
// el objeto contiene estilos CSS que se usan para dar estilo a los componentes 
// estos estilos se aplican a los componentes correspondientes en el codigo JSX para darles apariencia 
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(0,0,0)',
        color: 'rgb(255,255,255)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        textAlign: 'center',
        width: '40%',
        height: undefined,
        aspectRatio: 20 / 10,
        margin: 10
    },
    title: {
        fontWeight: 600,
        color: 'rgb(255,255,255)',
        fontSize: 24,
        textAlign: 'center'
    },
    flatList: {
        width: '100%'
    }
})

// export default indica que se esta exportando el componente (archivo entero)
// al usar export default no es necesario especificar un nombre para importar el componente en destino 
// solo se puede tener una exportacion predeterminada por archivo 
// esta listo para poder importarlo desde otro modulo 
export default Home;