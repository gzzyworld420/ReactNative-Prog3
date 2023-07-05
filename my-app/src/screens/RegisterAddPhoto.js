

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
import { TouchableOpacity, View,  Text, StyleSheet, Image } from 'react-native'

// importamos el objeto storage desde el archivo de configuracion de firebase 
// '../firebase/config' es una ruta relativa 
// utilizamos firebase para almacenar y adminsitrar datos 
// el objeto storage proporciona metodos y funcionalidades para interactuar con el almacenamiento
// importamos los objetos db y auth desde el archivo de firebase 
// '../firebase/config' es una ruta relativa 
// db proporciona metodos y funcionalidades para interactuar, operaciones de lectura, escritura, actualizacion y eliminacion 
// auth proporciona metodos para gestionar la autenticacion de usuarios (registrar, iniciar sesion, etc)
import { auth, db, storage } from '../firebase/config';

// importo el componenete camerapost generado por nosotros 
import CameraPost from '../components/CameraPost';

// importamos varios conjunto sde iconos para agragar graficos y visuales 
// contenemos iconos de difenretes fuentes como fontawesome, ionicos, antdesign. 
// los utilizamos con la linea de codigo <FontAwesome name="check" size={24} color="green" />
import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// la RegisterAddPhoto newpost es un componente de React de la clase base "Component"
// RegisterAddPhoto es un componente personalizado que puedo usar en la app 
class RegisterAddPhoto extends Component{

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
            // props hace referencia a las props recibidas por el componente 
            // error almacena mensajes de error relacionados con la autenticacion
            // camera open variable booleana que se inicia con false, indicado que la camara no esta abierta 
            // photo almacena la ruta o URL de la foto seleccionada o capturada 
            props: props,
            cameraOpen: false,
            photo: '',
            error: ''
        }
    }
        
    mostrarCamara() {
        this.setState({
            cameraOpen: true,
            error: ''
        })
    }

    onSubmit(){
        if (this.state.photo === '') {
            this.setState({
                error: 'Tenés que agregar una foto apretando el botón "Foto de perfil"'
            })
        } else {
            db.collection('users')
                .doc(this.props.route.params.id)
                .update({
                    photo: this.state.photo
                })
                .then(() => {
                    this.setState({
                        photo: ''
                    })
                    this.props.navigation.navigate('Login')
                })
                // catch es un metodo utilizado en javascript para capturar y manejar errores de bloques de codigo 
                // capturamos cualquier error que pueda ocurrir durante la solicitud 
                // si se produce un error se registra en la consola, y lo podemos manejar de manera adecuada
                .catch((e) => console.log(e))
        }
    }

    pickImage = async () => {
        let results = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1],
        })
        this.handleImagePicked(results);
       }

    handleImagePicked = async (results) => {
        try {
          if (!results.cancelled) {
            this.savePhoto(results.uri);
          }
        } catch (e) {
          console.log(e);
          alert("Image upload failed");
        }
    };

    savePhoto(uploadUrl){
        fetch(uploadUrl)
         .then(res=>res.blob())
         .then(image =>{
           const ref=storage.ref(`photos/${Date.now()}.jpg`)
           ref.put(image)
                .then(()=>{
                   ref.getDownloadURL()
                        .then(url => {
                            this.onImageUpload(url);
                         })
                 })
         })
        // catch es un metodo utilizado en javascript para capturar y manejar errores de bloques de codigo 
        // capturamos cualquier error que pueda ocurrir durante la solicitud 
        // si se produce un error se registra en la consola, y lo podemos manejar de manera adecuada
         .catch(e=>console.log(e))
       }

    onImageUpload(url) {
        this.setState({
            photo: url,
            cameraOpen: false,
        })
    }

    // el metodo render es parte del ciclo de vida de un componente en React 
    // se usa para renderizar y mostrar el contenido del componente en la interfaz de usuario 
    render(){
        // return es una declaracion utilizada en las funciones para devolver un valor o un conjunto de elementos 
        // return marca el inicio del retorno del JSX (javascript XML)
        // es una sintaxis similar a HTML utilizada en react para definir una estructura 
        return(
            <View style={style.container} >
                <Text style={style.title}>AGREGAR FOTO DE PERFIL</Text>
                {this.state.error !== '' ? <Text style={style.error}>{this.state.error}</Text> : null}
                {this.state.cameraOpen === false ?
                    <View>
                        <Text style={style.error}></Text>
                        <TouchableOpacity onPress={() => this.mostrarCamara()} style={style.btn}>
                            <Text style={style.textBtn}><AntDesign name="camerao" size={24} color="black" /> Foto de perfil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.pickImage()} style={style.btn}>
                            <Text style={style.mostrarCamaraTxt}><MaterialIcons name="add-photo-alternate" size={24} color="black" /> Agregar foto de la galeria</Text>
                        </TouchableOpacity>
                        {this.state.photo !== '' ? 
                        <Image 
                            style={style.image}
                            source={{uri: this.state.photo}}
                        />: null}
                        <TouchableOpacity onPress={() => this.onSubmit()} style={style.btn}>
                            <Text style={style.btnSend}>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={style.btn}>
                            <Text style={style.btnContinue}>Usar un avatar predeterminado</Text>
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
    btnOff: {
        position: 'absolute',  
        right: 5, 
        top: 5
    },
    camView: {
        width: '100%',
        height: '100%'
    },
    mostrarCamara: {
        backgroundColor: 'rgb(20,150,20)',
        padding: 10,
        marginBottom: 10,
    },
    btn: {
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)',
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        margin: 10
    },
    textBtn: {
        color: 'rgb(0,0,0)'
    },
    btnSend: {
        color: '#0d9900'
    },
    btnContinue: {
        color: 'rgb(200, 10, 10)'
    },
    image: {
        width: '90%',
        height: 400
    },
    error: {
        color: 'rgb(255,0,0)',
        fontSize: 10
    }
})

// export default indica que se esta exportando el componente (archivo entero)
// al usar export default no es necesario especificar un nombre para importar el componente en destino 
// solo se puede tener una exportacion predeterminada por archivo 
// esta listo para poder importarlo desde otro modulo 
export default RegisterAddPhoto;