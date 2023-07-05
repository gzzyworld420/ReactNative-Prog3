// la idea de este archivo es permitir capturar y gestionar fotos 

// a traves de expo importamos las dependencias 
// importamos los componentes relacionados con la biblioteca expo camera
// importamos camera, cameratype para usarlos en el codigo de mi app 
// camera sirve para mostrar y controlar la camara en mi app, capturar imagenes, etc
// cameratype es una estructura de datos que enumera conjunto de valores posibles
// cameratype se utiliza para definir posibles camaras (frontal y trasera)
import { Camera, CameraType } from "expo-camera";

// importo los modulos react y component de la biblioteca react 
// me permite utilizar las funcionalidades de react y la clase component para crear componentes 
// react es la biblioteca principal de javascript para construir interfaces de usuario iteractivas y reutilizables 
// react proporciona metodos y herramientas para crear componentes y gestionar el estado de la app 
// component es una clase base que permite crear componentes personalizados con funcionalidades especificas 
import React, { Component } from "react";

// importamos varios componentes y modulos de la biblioteca react native 
// view componente es un contenedor flexible para otros componentes, organizamos elementos en al interfaz 
// view es similar a un DIV
// en react se puede usar <P> en vez de <text>, no en native
// en react cualquier elemento puede ser clickeable con el onclick, no en native
// text componente se usa para renderizar texto en la interfaz de usuario 
// stylesheet es un modulo para crear y gestionar estilos 
// touchableOpacity componente para envolver otros componentes y agregar respuesta tactil al interactuar 
// hay muchos tipos de touchable, como touchablenativefeedback, no solo touchableopacity 
// image es un componente para mostrar imagenes en la interfaz 
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// importamos varios conjunto sde iconos para agragar graficos y visuales 
// contenemos iconos de difenretes fuentes como fontawesome, ionicos, antdesign. 
// los utilizamos con la linea de codigo <FontAwesome name="check" size={24} color="green" />
import { FontAwesome, Ionicons, AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';

// importamos el objeto storage desde el archivo de configuracion de firebase 
// '../firebase/config' es una ruta relativa 
// utilizamos firebase para almacenar y adminsitrar datos 
// el objeto storage proporciona metodos y funcionalidades para interactuar con el almacenamiento 
import { storage } from '../firebase/config';

// la clase cameraPost es un componente de React de la clase base "Component"
// camerapost es un componente personalizado que puedo usar en la app 
class CameraPost extends Component{

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
            // permission variable booleana que indica si se otorgo permiso para la camara 
            // photo cadena que representa la URL de la foto capturada 
            // showCamera es una variable booleana que determina si se muestra o no la interfaz 
            props: props,
            permission: false,
            photo: '',
            showCamera: false
        }
    };

    // el metodo componentDidMount es un metodo del ciclo de vida de un componente en react 
    // se llama automaticamente despues de que el componente se haya montado en el DOM
    // el DOM es una interfaz que permite acceder y manipular los elementos y contenido de un documento de manera programatica 
    // el DOM organiza los elementos del documento en una etrucutra de arbol, donde cada elemento es un nodo en el arbol 
    // en este caso se utiliza para solicitar los permisos de la camara cuando el componente CameraPost se monta 
    componentDidMount() {
        // dentro del metodo componentdidmount llamamos a Camera.requestCameraPermissionsAsync() que es una funcion 
        // esta funcion nos la proporciona la biblioteca expo-camera 
        // la funcion solicita los permisos de la camara al usuario de la aplicacion 
        // una vez resulta la promesa devuelta por requestCameraPermissionAsync se actualiza el estado del componente mediante setstate
        Camera.requestCameraPermissionsAsync()
        // el metodo then() se utiliza en promesas para especificar una funcion de devolucion 
        // el operador => es un arrow function en javascript, define funciones de manera mas concisa 
        .then(() => {
            // la funcion setState se utiliza para actualizar el estado del componente 
            // es un metodo proporcionado por la clase component de react 
            this.setState({
                // en javascript el this se utiliza para referirse a la instancia actual del componente 
                // si los permisos son concedidos, se establece el estado de permission en true y showcamera en true 
                // indica que el permiso se ha otorgado y debe mostrar la camara 
                permission: true,
                showCamera: true
            })
        })
        // catch es un metodo utilizado en javascript para capturar y manejar errores de bloques de codigo 
        // capturamos cualquier error que pueda ocurrir durante la solicitud 
        // si se produce un error se registra en la consola, y lo podemos manejar de manera adecuada
        .catch(error => console.log(error))
    }

    // el metodo takepicture se utiliza para capturar una foto utilizando la camara 
    // takepicture es un metodo de la clase camerapost 
    takePicture() {
        // intento acceder a un objeto que se llama metodosdecamara y llamar al metodo takepictureasync
        this.metodosDeCamara.takePictureAsync()
            // se encadena un then (metodo) para manejar la resolucion de la promesa devuelta por takepictureasync
            .then(photo => {
                // utilizamos setState para actualizar el estado del componente 
                // actualizo las propiedades photo y showcamera 
                this.setState({
                    photo: photo.uri,
                    showCamera: false
                })
            })
            // catch es un metodo utilizado en javascript para capturar y manejar errores de bloques de codigo 
            // capturamos cualquier error que pueda ocurrir durante la solicitud 
            // si se produce un error se registra en la consola, y lo podemos manejar de manera adecuada
            .catch(error => console.log(error))
    }

    // la funcion clearphoto se utiliza para borrar la foto capturada y vovler a mostrar interfaz de camara
    clearPhoto() {
        // llamamos a setState para actualizar las propiedades photo y showcamera 
        // al poner '' en photo, en vez de como arriba, se elimina la URL de la foto capturada 
        // al estar showcamera true, indica que se debe mostrar nuevamente la interfaz de la camara 
        this.setState({
            photo: '',
            showCamera: true,
        })
    }

    // la funcion savephoto se utiliza para guardar la foto capturada en el almacenamiento, en este caso firebase storage
    savePhoto(){
        // se llama a la funcion fetch pasando la URL de la foto capturada (this.satte.photo)
        // la funcion fetch se usa para realizar una solicitud http para obtener datos de imagen 
        fetch(this.state.photo)
         // despues del primer then, se obtiene la respuesta de la solicitud de http 
         // se llama a res.blob, la funcion blob convierte la respuesta en un objeto 
         // el objeto blob es un tipo de dato utilizado para datos binarios, como imagenes 
         .then(res=>res.blob()) 
         // aca en el siguiente then, se recibe el objeto blob que representa la imagen 
         .then(image =>{
            // se crea la referencia ref en firebase storage usando el metodo storage.ref()
            // proporciona una ruta unica para la imagen 
            // se usa el date.now para que imagen tenga un nomrbe unico 
           const ref=storage.ref(`photos/${Date.now()}.jpg`)
           // se llama al metodo put() de referencia ref, pasando el objeto blob 
           // esto sube la imagen al almacenamiento remoto de firebase 
           ref.put(image)
                // se completa la carga de la imagen) 
                .then(()=>{
                    // se llama al metodo getdownloadURL de ref para obtener la URL de descarga 
                   ref.getDownloadURL()
                        .then(url => {
                            // se obtiene la url de descarga y se pasa a this.props.onimageupload(url)
                            // es una funcion pasada como prop al componente camerapost
                            // esta funcion se encarga de manejar la URL de la imagen en algun otro componente 
                            this.props.onImageUpload(url);
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
            // view es un componente de react native que crea un contenedor en la interfaz de usuario 
            // se aplica a traves de propiedades style 
            // style es un objeto que define los estilos especificos 
            // container es una clase o estilo definido en algun lugar del codigo
            
            // this.state.showcamera, determina que contenido se mostrara en la interfaz 
            // si es true, se renderiza el contenido del bloque react.fragment 
            // este bloque contiene 2 componentes, camera y touchableopacity 
            // camera lo obtengo de expo-camera, permite mostrar y controlar la camara 
            // dentro de camara se elijio la trasera, type back 
            // touchableopacity para agregar respuesta tactic 
            // el null del final, es por si no se muetra nada en la interfaz de usuario   

            // this.state.photo, se utiliza para renderizar difernetes elementos del estado photo 
            // la expresion this.state.photo !== '' ? verifica si la propiedad photo en el estado no esta vacia 
            // si es verdadero, renderiza el fragmento 
            // dentro del fragmento se muestra una imagen usando el componente Image de react naative 
            // source es una propiedad con la URL de la foto almacenada 
            // luego se renderiza el contenedor view llamado checksDiv 
            // contiene botones para realizar acciones como borrado de foto o guardarla 
            // si la propiedad photo esta vacia se renderiza null y no muestra nada 
            <View style={style.container}>
                {this.state.showCamera===true ?
                    <React.Fragment>
                        <Camera
                            style={style.camera}
                            type={Camera.Constants.Type.back}
                            ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                        />
                        <TouchableOpacity onPress={() => this.takePicture()} style={style.btnCapture}>
                            <Ionicons name="radio-button-on-sharp" size={66} color="green" />
                        </TouchableOpacity>
                    </React.Fragment>
                : null}
                {this.state.photo !== '' ?
                    <React.Fragment>
                        <Image
                            style={style.image}
                            source={{ uri: this.state.photo }}
                        />
                        <View style={style.checksDiv}>
                            <TouchableOpacity onPress={() => this.clearPhoto()}>
                                <Ionicons name="md-trash-sharp" size={40} color="red" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.savePhoto()}>
                                <AntDesign name="checkcircle" size={40} color="green" />
                            </TouchableOpacity>
                        </View>
                    </React.Fragment>
                    :
                    null
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
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    camera: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    btnCapture: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,  
        alignItems: 'center'
    },
    btnOff: {
        position: 'absolute',  
        right: 5, 
        top: 5
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    checksDiv:{ 
        position: 'absolute', 
        flexDirection: 'row',
        flex: 2,
        left: 0, 
        right: 0, 
        bottom: 0,  
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

// export default indica que se esta exportando el componente (archivo entero)
// al usar export default no es necesario especificar un nombre para importar el componente en destino 
// solo se puede tener una exportacion predeterminada por archivo 
// esta listo para poder importarlo desde otro modulo 
export default CameraPost;
