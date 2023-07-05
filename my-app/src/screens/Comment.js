

// importo los modulos react y component de la biblioteca react 
// me permite utilizar las funcionalidades de react y la clase component para crear componentes 
// react es la biblioteca principal de javascript para construir interfaces de usuario iteractivas y reutilizables 
// react proporciona metodos y herramientas para crear componentes y gestionar el estado de la app 
// component es una clase base que permite crear componentes personalizados con funcionalidades especificas 
import {React, Component} from "react";

// importamos varios componentes y modulos de la biblioteca react native 
// view componente es un contenedor flexible para otros componentes, organizamos elementos en al interfaz 
// text componente se usa para renderizar texto en la interfaz de usuario 
// stylesheet es un modulo para crear y gestionar estilos 
// touchableOpacity componente para envolver otros componentes y agregar respuesta tactil al interactuar 
// image es un componente para mostrar imagenes en la interfaz 
// flatlist para renderizar listas de datos de forma eficiente 
// textinput proporciona una caja de texto editable donde los usuarios ingresan texto 
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from "react-native";

// importamos los objetos db y auth desde el archivo de firebase 
// '../firebase/config' es una ruta relativa 
// db proporciona metodos y funcionalidades para interactuar, operaciones de lectura, escritura, actualizacion y eliminacion 
// auth proporciona metodos para gestionar la autenticacion de usuarios (registrar, iniciar sesion, etc)
import { db, auth } from '../firebase/config';

//importo el moduo firebase de biblioteca firebase para acceder a diferentes servicios 
import firebase from "firebase";

// importamos varios conjunto sde iconos para agragar graficos y visuales 
// contenemos iconos de difenretes fuentes como fontawesome, ionicos, antdesign. 
// los utilizamos con la linea de codigo <FontAwesome name="check" size={24} color="green" />
import { FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

// importo el componente commetnscard generado por nosotros 
import CommentsCard from "../components/CommentsCard";

// la clase comment es un componente de React de la clase base "Component"
// comment es un componente personalizado que puedo usar en la app 
class Comment extends Component{

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
            // las siguientes 3 son propiedades 
            // props hace referencia a las props recibidas por el componente
            // comentarios[] se inicializa como un arrray vacio para almacenar los comentarios relacionados con algun contenido 
            // comentrios "" se inicia como una cadena vacia para representar el valor de un nuevo comentario
            // en array [] a medida q agregan comentarios se añaden al array 
            // el string '' me sirve para almacenar un comentario individual en el momento que se esta ingresando 
            props: props,
            comentarios: [],
            comentario: ''
        }
    };


    // el metodo componentDidMount es un metodo del ciclo de vida de un componente en react 
    // se llama automaticamente despues de que el componente se haya montado en el DOM
    // el DOM es una interfaz que permite acceder y manipular los elementos y contenido de un documento de manera programatica 
    // el DOM organiza los elementos del documento en una etrucutra de arbol, donde cada elemento es un nodo en el arbol 
    //
    componentDidMount() {
        db.collection('posts').where(firebase.firestore.FieldPath.documentId(), '==', this.props.route.params.id).onSnapshot(
            docs => {
                docs.forEach(doc => {
                    this.setState({
                        comentarios: doc.data().comments.reverse()
                    })
                });
            }
        )

    }

    comment(){
        this.setState({
            comentario: ''
        })
        db.collection('posts')
        .doc(this.props.route.params.id)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                createdAt: Date.now(),
                owner: auth.currentUser.email,
                content: this.state.comentario
            })
        })
        .then(()=> this.setState({
            comentario: ''
        }))
        // catch es un metodo utilizado en javascript para capturar y manejar errores de bloques de codigo 
        // capturamos cualquier error que pueda ocurrir durante la solicitud 
        // si se produce un error se registra en la consola, y lo podemos manejar de manera adecuada
        .catch((e)=> console.log(e))
    }

    // el metodo render es parte del ciclo de vida de un componente en React 
    // se usa para renderizar y mostrar el contenido del componente en la interfaz de usuario 
    render(){
        // return es una declaracion utilizada en las funciones para devolver un valor o un conjunto de elementos 
        // return marca el inicio del retorno del JSX (javascript XML)
        // es una sintaxis similar a HTML utilizada en react para definir una estructura 
        return(
            <View style={style.container}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('TabNavigation')}>
                    <AntDesign name="back" size={32} color="white" style={style.back}/>
                </TouchableOpacity>
                {this.state.comentarios.length === 0 ?
                 <Text style={style.noComments}>Aún no hay comentarios. Se el primero en comentar!</Text>
                :
                <FlatList
                    data={this.state.comentarios}
                    renderItem={({ item }) => <CommentsCard data={item} commentsProps={this.props}/>}
                /> 
                }
                <View style={style.flex}>
                    <TextInput
                        style={style.input}
                        keyboardType='default'
                        placeholder='Comentá acá...'
                        onChangeText={text => this.setState({ comentario: text, error: '' })}
                        value={this.state.comentario}
                    />
                    <TouchableOpacity onPress={() => this.comment()}>
                        <MaterialCommunityIcons name="send" size={24} color="#0d9900" style={style.btnSend} />
                    </TouchableOpacity>
                </View>
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
        flex: 2,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0,0,0)'
    },
    back:{
        marginBottom: 15,
        marginTop: 10,
        marginLeft: 10
    },
    noComments: {
        color: 'rgb(255,255,255)',
        fontSize: 16,
        margin: 10
    },
    whiteText: {
        color: 'rgb(255,255,255)'
    },
    input: {
        backgroundColor: 'rgb(0,0,0)',
        padding: 10,
        fontSize: 16,
        marginVertical: 10,
        color: 'rgb(255,255,255)',
        height: 50,
        bottom: 0,
        width: '85vw'
    },
    flex: {
        flexDirection: 'row',
        flex: 2,
        position: 'absolute',
        bottom: 0,
        alignItems: 'end',
        justifyContent: 'space-between',
        width: '100%'
    },
    btnSend: {
        width: '10vw',
        height: 50
    }
})

// export default indica que se esta exportando el componente (archivo entero)
// al usar export default no es necesario especificar un nombre para importar el componente en destino 
// solo se puede tener una exportacion predeterminada por archivo 
// esta listo para poder importarlo desde otro modulo 
export default Comment;