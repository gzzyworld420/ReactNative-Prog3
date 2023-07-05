

// importo los modulos react y component de la biblioteca react 
// me permite utilizar las funcionalidades de react y la clase component para crear componentes 
// react es la biblioteca principal de javascript para construir interfaces de usuario iteractivas y reutilizables 
// react proporciona metodos y herramientas para crear componentes y gestionar el estado de la app 
// component es una clase base que permite crear componentes personalizados con funcionalidades especificas 
import React,{Component} from 'react';

// importamos varios componentes y modulos de la biblioteca react native 
// view componente es un contenedor flexible para otros componentes, organizamos elementos en al interfaz 
// text componente se usa para renderizar texto en la interfaz de usuario 
// stylesheet es un modulo para crear y gestionar estilos 
// touchableOpacity componente para envolver otros componentes y agregar respuesta tactil al interactuar 
// image es un componente para mostrar imagenes en la interfaz 
// textinput proporciona una caja de texto editable donde los usuarios ingresan texto 
import {TouchableOpacity,View, Text, StyleSheet, TextInput, Image } from 'react-native';

// importamos los objetos db y auth desde el archivo de firebase 
// '../firebase/config' es una ruta relativa 
// db proporciona metodos y funcionalidades para interactuar, operaciones de lectura, escritura, actualizacion y eliminacion 
// auth proporciona metodos para gestionar la autenticacion de usuarios (registrar, iniciar sesion, etc)
// importamos el objeto storage desde el archivo de configuracion de firebase 
// utilizamos firebase para almacenar y adminsitrar datos 
// el objeto storage proporciona metodos y funcionalidades para interactuar con el almacenamiento 
import {db, auth, storage} from '../firebase/config';

// importamos varios conjunto sde iconos para agragar graficos y visuales 
// contenemos iconos de difenretes fuentes como fontawesome, ionicos, antdesign. 
// los utilizamos con la linea de codigo <FontAwesome name="check" size={24} color="green" />
import { FontAwesome, Ionicons, AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';

// importamos el componente autogenerado por nosotros 
import CameraPost from '../components/CameraPost';

// importamos el modulo imagePicker de la biblioteca expo 
// funcionalidades para seleccionar imagenes de la galeria de dispositivo 
import * as ImagePicker from 'expo-image-picker';

// la clase addpost es un componente de React de la clase base "Component"
// addpost es un componente personalizado que puedo usar en la app 
class AddPost extends Component{

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
            // las siguientes 5 son propiedades 
            // no tiene props:props porque no requiere ninguna informacion para su inicializacion inicial  
            // description es una propiedad en el estado del componente que se inicia con una cadena vacia 
            // msj se inicializa con una caddena vacia para almacenar un mensaje 
            // cameraopen se inicializa con false para controlar si la camara esta abierta o cerrada
            // photo se inicia con una cadena vacia para almacenar la URL de la foto capturada
            // se inicializa como true para habilitar o deshabilitar un boton 
            description: '',
            msj: '',
            cameraOpen: false,
            photo: '',
            enableBtn: true
        }
    }

    // onimageupload es un metodo dentro del componente addpost 
    // se encarga de manejar la carga de una imagen en el componente 
    // recibe una url como parametro, que representa la ubicacion de la imagen cargada 
    onImageUpload(url) {
        // se actualiza el estado del componente utilizando this.setstate()
        // se asigna una URL con la propiedad photo 
        // se establece cameraopen en false, para que no este abierta 
        // msj es una cadena vacia 
        // una vez que cierra la camara, se restablece el mensaje a una cadena vacia 
        this.setState({
            photo: url,
            cameraOpen: false,
            msj: ''
        })
    }

    // mostrarcamara es un metodo dentro del componente addpost 
    // se utiliza para mostrar la camara en el componente 
    mostrarCamara() {
        // se actualiza el estado del componente utilizando this.setstate()
        // se establece la camaraopen en true 
        this.setState({
            cameraOpen: true
        })
    }

    // creamos un metodo "crearpost" dentro del componente addpost
    // se usa para crear un nuevo post, se realizan validaciones y se utiliza la funcion add de firebase firestore
    // agregamos un nuevo documento a la coleccion posts 
    crearPost() {
        this.setState({
            // primero deshabilita el boton de creacion del post establecido 
            // posteriormente se activaria cunado el usuario decide postear y hace clic 
            enableBtn: false
        })
        // validamos el metodo crearpost 
        // si la propiedad description del estado del componente esat vacia, se establece el mensaje "no hay descripcion"
        // se utiliza para que se haya ingresado una descripcion antes de crear el post 
        // === '' se utiliza para realizar una comparacion estricta entre valores. si desc es igual a vacio 
        if(this.state.description === '') {
            this.setState({
                msj: 'No hay descripcion'
            }) 
        } 
        // igual que antes, pero en vez de verificar description, verificamos photo 
        else if (this.state.photo === ''){
            this.setState({
                msj: 'No hay foto'
            }) 
        } 
        // se realiza una validacon para verificar si el boton de creacion del post esta habilitado o no 
        // la propiedad enablebtn del estado se utiliza para controlar el estado de habilitacion de boton
        // que este en false, significa que la carga del post ya se esta procesando 
        // se muestra un mensaje de error indicando que la carga del posteo ya esta en curso 
        // evita que un usuario realice multiples intentos de creacion del posteo mientras se esta procesando uno anterior 
        else if (this.state.enableBtn === false ) {
            this.setState({
                msj: 'La carga del posteo ya se esta procesando'
            })
        }
        // se realiza la creacion del posteo en la coleccion posts de la base de datos 
        // se utiliza el metood add() proporcionado por firebase para agregar un nuevo doc 
        else{
        // los datos del posteo se pasan como un objeto 
        db.collection('posts').add({
            owner: auth.currentUser.email, // es una funcionalidad de firebase que te ofrece todos los emtodos de autenticacion y ademas te ofrece toda la informacion del usuario autenticado
            description: this.state.description,
            createdAt: Date.now(), // devuelve la fecha en milisegundos
            likes: [], // array de usuarios que le dieron like
            comments: [], // array de comentarios
            photo: this.state.photo // url de la foto
        })
        // despues de agregar exitosamente el documento a la coleccion posts se ejecuta el bloque .then()
        .then(res => {
            // se actualizan los valores description, photo, msj una vez hecho el posteo 
            // utilizando this.setState({...}) vuelve a sus valores iniciales 
            this.props.navigation.navigate('TabNavigation') // redirecciona a la pantalla de inicio de la app una vez que se creo el posteo correctamente 
            this.setState({
                description: '',
                photo: '',
                msj: ''
            })
        })
        // catch es un metodo utilizado en javascript para capturar y manejar errores de bloques de codigo 
        // a diferencia de los otros catch, en este caso se actualiza el estado de un componente, en vez de mostrar en consola
        // se captura el error y se actualiza el estado de un componente con el mensaje de error 
        .catch(error => this.setState({
            msj: error.message
        })
        )
        }
    }

    // el metodo pickImage se utiliza para seleccionar una imagen de la galeria del dispositivo 
    // async () => se refiere a una funcion asincronica sin nombre que es utilizada para definir funciones asincronicas en javascript
    // => indica que la funcion no tiene parametros 
    pickImage = async () => {
        // se utiliza ImagePicker.launchImageLibraryAsync para abrir la galeria y permitir al usuario seleccionar una imagen
        // await se utilzia para esperar la resolucion de una promesa 
        // los resultados de la promesa resuleta, se asignan a la variable results 
        let results = await ImagePicker.launchImageLibraryAsync({
            // se establece en true, lo que permite al usuario recortar la imagen 
            // aspect se establece en 2/1, lo que especifica el aspecto de la imagen 
            allowsEditing: true,
            aspect: [2/1],
        })
        // una vez que el usuario selecciona una imagen, se obtienen los resultados y se pasa la funcion handleimagepicked
        // la funcion handleimagepicked se utiliza para realizar acciones adicionales, como guardarla en almacenamiento 
        this.handleImagePicked(results);
       }

    // el metodo handleimagepicked se utiliza para verificar si se selecciono una imagen valida 
    // async () => se refiere a una funcion asincronica sin nombre que es utilizada para definir funciones asincronicas en javascript
    // => indica que la funcion no tiene de parametro results que contiene la imagen seleccionada 
    handleImagePicked = async (results) => {
        // bloque try-catch se usa para capturar cualquier error que pueda ocurrir durante el proceso 
        try {
          // se verifica si la imagen no fue cancelada
          // signitica que se selecciono una imagen valida 
          if (!results.cancelled) {
            // se llama a la funcion savephoto 
            this.savePhoto(results.uri);
          }
        } 
        // si ocurre algun error durante el proceso, se captura en este bloque 
        // se muestra una alerta indicado que la carga ha fallado 
        catch (e) {
          console.log(e);
          alert("Image upload failed");
        }
    };

    // la funcion savephoto se encarga de guardar una imagen en el almacenamiento de firebase storage 
    // se recibe uploadurl que es la URL de la imagen seleccionada a cargar
    savePhoto(uploadUrl){
        // se utiliza el metodo fetch para realizar una solicitud de http a la URL de la imagen 
        fetch(uploadUrl)
         // con el metodo res.blob() se convierte en un objeto de tipo blob 
         // blob es una representacion de datos binarios 
         .then(res=>res.blob())
         // se crea una referencia ref en el almacenamiento de firebase 
         .then(image =>{
            // se utiliza la carpeta photos y genera un nombre de archivo unico con date.now 
           const ref=storage.ref(`photos/${Date.now()}.jpg`)
           // se utiliza el metodo put de la referencia para cargar el objeto blob 
           ref.put(image)
                .then(()=>{
                    // se utiliza el metodo getdownloadurl para obtener la URL 
                   ref.getDownloadURL()
                        .then(url => {
                            // se llama al metodo onimageupload, se le pasa la url
                            this.onImageUpload(url);
                         })
                 })
         })
        // catch es un metodo utilizado en javascript para capturar y manejar errores de bloques de codigo 
        // capturamos cualquier error que pueda ocurrir durante la solicitud 
        // si se produce un error se registra en la consola, y lo podemos manejar de manera adecuada
         .catch(e=>console.log(e))
       }

    // el metodo render es parte del ciclo de vida de un componente en React 
    // se usa para renderizar y mostrar el contenido del componente en la interfaz de usuario 
    render(){
        // return es una declaracion utilizada en las funciones para devolver un valor o un conjunto de elementos 
        // return marca el inicio del retorno del JSX (javascript XML)
        // es una sintaxis similar a HTML utilizada en react para definir una estructura 
        return(
            
            <View style={style.container}>
                {this.state.cameraOpen === false ?
                    <React.Fragment>
                        {this.state.msj !== '' ? <Text style={style.error}>{this.state.msj}</Text> : null}
                        <View style={style.inputsYBtns}>
                            <Text style={style.title}>Escribí lo que quieras postear</Text>
                            <TextInput
                                style={style.description}
                                keyboardType='default'
                                placeholder='Compartí lo que pensás'
                                onChangeText={text =>
                                    this.setState({ description: text, error: '', msj: '' })
                                }
                                value={this.state.description}
                            />
                            <TouchableOpacity onPress={() => this.mostrarCamara()} style={style.mostrarCamara}>
                                <Text style={style.mostrarCamaraTxt}><AntDesign name="camerao" size={24} color="white" /> Agregar foto</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.pickImage()} style={style.mostrarCamara}>
                                <Text style={style.mostrarCamaraTxt}><MaterialIcons name="add-photo-alternate" size={24} color="white" /> Agregar foto de la galeria</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.photo !== '' ?
                            <View style={style.imagenYDelete}>
                                <Image
                                    style={style.image}
                                    source={{ uri: this.state.photo }}
                                    // require: rutas relativas
                                    // uri: rutas absolutas
                                />
                                <TouchableOpacity onPress={() => this.setState({ photo: '' })} style={style.btnDelete}><Text style={style.delete}>Borrar imagen</Text></TouchableOpacity>
                            </View>
                            : null}
                        <TouchableOpacity onPress={() => this.crearPost()} style={style.btnPost}>
                            <Text style={style.textBtn}>Compartir</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                : 
                    <View style={style.camView}>
                        <CameraPost style={style.cameraComponent} onImageUpload={(url) => this.onImageUpload(url)} />
                        <TouchableOpacity onPress={() => this.setState({ cameraOpen: false })} style={style.btnOff}>
                            <Entypo name="circle-with-cross" size={40} color="red" />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }


};

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
        justifyContent: 'center'
    },
    error: {
        color: 'rgb(255, 0, 0)',
    },
    inputsYBtns: {
        flex: 1
    },
    imagenYDelete: {
        flex: 1
    },
    btnDelete:{
            border: 'solid',
            borderWidth: 1,
            borderColor: 'rgb(255, 0, 0)',
            borderLeftColor: 'red',
            borderTopColor: 'red',
            borderRightColor: 'red',
            borderBottomColor: 'red',
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderStyle: 'solid',
            padding: 7.5,
            width: '30%',
            marginVertical: 10,
        },
    delete: {
        color: 'rgb(255, 0, 0)',
        fontSize: 14,
    },
    description: {
        backgroundColor: 'rgb(255,255,255)',
        padding: 20,
        fontSize: 16,
        marginVertical: 15
    },
    title: {
        fontSize: 22,
        fontWeight: '600'
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
    btnPost: {
        border: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(150,150,150)',
        borderLeftColor: 'white',
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderBottomColor: 'white',
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderStyle: 'solid',
        padding: 7.5,
        width: '30%',
    },
    textBtn: {
        fontSize: 16,
        textAlign: 'center',
        color: 'rgb(230, 230, 230)'
    },
    mostrarCamara: {
        backgroundColor: 'rgb(20,150,20)',
        padding: 10,
        marginBottom: 15,
    },
    mostrarCamaraTxt: {
        color: 'rgb(240,240,240)'
    },
    image: {
        height: '50%',
        aspectRatio: 20 / 10
    }
})

// export default indica que se esta exportando el componente (archivo entero)
// al usar export default no es necesario especificar un nombre para importar el componente en destino 
// solo se puede tener una exportacion predeterminada por archivo 
// esta listo para poder importarlo desde otro modulo 
export default AddPost;