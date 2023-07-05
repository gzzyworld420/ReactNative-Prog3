

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
// image es un componente para mostrar imagenes en la interfaz 
// flatlist para renderizar listas de datos de forma eficiente 
// activityIndicator sirve para mostrar un indicador de carga o progreso en una interfaz de usario 
// touchableNativeFeedBack responden a toques de usuario, cambia de color, reduce opacidad, etc. 
import { TouchableOpacity, View, TextInput, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'

// importamos los objetos db y auth desde el archivo de firebase 
// '../firebase/config' es una ruta relativa 
// db proporciona metodos y funcionalidades para interactuar, operaciones de lectura, escritura, actualizacion y eliminacion 
// auth proporciona metodos para gestionar la autenticacion de usuarios (registrar, iniciar sesion, etc)
import { auth, db } from '../firebase/config';

// importo el componente camerapost generado por nosotros 
import CameraPost from '../components/CameraPost';

// importamos varios conjunto sde iconos para agragar graficos y visuales 
// contenemos iconos de difenretes fuentes como fontawesome, ionicos, antdesign. 
// los utilizamos con la linea de codigo <FontAwesome name="check" size={24} color="green" />
import { Entypo, AntDesign } from '@expo/vector-icons';

// la register newpost es un componente de React de la clase base "Component"
// register es un componente personalizado que puedo usar en la app 
class Register extends Component{

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
            // las siguientes 11 son propiedades 
            // props hace referencia a las props recibidas por el componente 
            // email es una variable que almacena el correo electronico 
            // password almacena la contraseña ingresada por el usuario 
            // error almacena mensajes de error relacionados con la autenticacion
            // user almacena datos de usuario 
            // bio almacena una descripcion o biografia del usuario 
            // check yu double check son arrays vacios que almacenan listas de verificacion o historiales 
            // camera open variable booleana que se inicia con false, indicado que la camara no esta abierta 
            // las variables userErr y mailErr almacenan mensajes de error 
            props: props,
            email: '',
            user: '',
            password: '',
            bio: '',
            error: '',
            check: [],
            doubleCheck: [],
            cameraOpen: false,
            userErr:'',
            mailErr:''
        }
    }

    onImageUpload(url) {
        this.setState({
            photo: url,
            cameraOpen: false
        })
    }

    onSubmit() {
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                db.collection('users').add({
                    owner: this.state.email.toLowerCase(),
                    userName: this.state.user,
                    bio: this.state.bio,
                    createdAt: Date.now(),
                    photo: ''
                })
                    .then((createdUser) => this.props.navigation.navigate('RegisterAddPhoto', { id: createdUser.id }))
            })
            // el metodo setstate se utiliza dentro del onsubmit para actualizar el estado del componente 
            // se asignan el mensaje de error error.message al estado error
            // es util para mostrar el mensaje de error en la interfaz de usuario 
            .catch(error => this.setState({
                error: error.message
            }))
    }

    /* mostrarCamara() {
        this.setState({
            cameraOpen: true
        })
    } */



    // el metodo render es parte del ciclo de vida de un componente en React 
    // se usa para renderizar y mostrar el contenido del componente en la interfaz de usuario 
    render(){
        // los console log estan para imprimir los valores de this.state.check y this.state.doublecheck
        // se imprimen en la consola antes de que se devuelva el JSX en el return 
        // es util para verificar los valores de las propiedades del estado
        // me aseguro que esten correctas antes de mostrarselas a la interfaz de usuario 
        console.log(this.state.check)
        console.log(this.state.doubleCheck);
        // return es una declaracion utilizada en las funciones para devolver un valor o un conjunto de elementos 
        // return marca el inicio del retorno del JSX (javascript XML)
        // es una sintaxis similar a HTML utilizada en react para definir una estructura 
        return (
            <View style={style.container} >
                <Text style={style.title}>REGISTER</Text>
                
                {this.state.userErr !== '' ? <Text style={style.error}>{this.state.userErr}</Text> : null}
                {this.state.mailErr !== '' ? <Text style={style.error}>{this.state.mail}</Text> : null}
                {this.state.cameraOpen === false ?
                    <View>
                        <TextInput style={style.input}
                            keyboardType='email-address'
                            placeholder='email'
                            onChangeText={text => this.setState({ email: text })}
                            value={this.state.email} />
                        <TextInput style={style.input}
                            keyboardType='default'
                            placeholder='usuario'
                            onChangeText={text => this.setState({ user: text })}
                            value={this.state.user} />
                        <TextInput style={style.input}
                            keyboardType='default'
                            placeholder='contraseña'
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ password: text })}
                            value={this.state.password} />
                        <TextInput style={style.input}
                            keyboardType='default'
                            placeholder='bio'
                            onChangeText={text => this.setState({ bio: text })}
                            value={this.state.bio} />
                        {/* <TouchableOpacity onPress={() => this.mostrarCamara()} style={style.input}>
                            <Text style={style.textBtn}><AntDesign name="camerao" size={24} color="black" /> Foto de perfil</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => this.onSubmit()} style={style.btnLogin}>
                            <Text style={style.btnLoginTxt}>Registrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={style.btnLogin}>
                            <Text style={style.btnLoginTxt}>Si ya tenés un usuario, logueate acá</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={style.camView}>
                        <CameraPost style={style.cameraComponent} onImageUpload={(url) => this.onImageUpload(url)} />
                        <TouchableOpacity onPress={() => this.setState({ cameraOpen: false })} style={style.btnOff}>
                            <Entypo name="circle-with-cross" size={40} color="red" />
                        </TouchableOpacity>
                    </View>
    }


            </View>
        );
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
        padding: 15,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 600,
        color: 'rgb(255,255,255)',
        fontSize: 24,
        textAlign: 'center'
    },
    btnLogin: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(255,255,255)',
        backgroundColor: 'rgb(0,0,0)',
        margin: 10,
        padding: 10,
        textAlign: 'right'
    },
    btnLoginTxt: {
        color: 'rgb(255,255,255)'
    },
    error: {
        fontSize: 10,
        color: 'rgb(255,0,0)'
    },
    input: {
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)',
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        margin: 10
    }
})

// export default indica que se esta exportando el componente (archivo entero)
// al usar export default no es necesario especificar un nombre para importar el componente en destino 
// solo se puede tener una exportacion predeterminada por archivo 
// esta listo para poder importarlo desde otro modulo 
export default Register;