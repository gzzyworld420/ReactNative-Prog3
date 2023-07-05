

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
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

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
import { FontAwesome, AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';

//importo el componente comment 
import Comment from "../screens/Comment";

// la clase card es un componente de React de la clase base "Component"
// card es un componente personalizado que puedo usar en la app 
class Card extends Component{

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
            // cantidad de likes es una variable q almacena cantidad de likes 
            // this.props.data.data.likes.length accede a la propiedad likes dentro del objeto data 
            // milike es una variable booleana que indica si el usuario ha dado like o no, se inicializa con false 
            // owner es una variable booleana que indica si el usuario es el propietario, se inicializa con false 
            props: props,
            cantidadDeLikes: this.props.data.data.likes.length,
            miLike: false,
            owner: false
        }
    };


    // el metodo componentDidMount es un metodo del ciclo de vida de un componente en react 
    // se llama automaticamente despues de que el componente se haya montado en el DOM
    // el DOM es una interfaz que permite acceder y manipular los elementos y contenido de un documento de manera programatica 
    // el DOM organiza los elementos del documento en una etrucutra de arbol, donde cada elemento es un nodo en el arbol 
    // en el componente este se realizan comprobaciones y actualizaciones
    // estas 2 comprobaciones se realizan cuando el componente se monta en el DOM 
    // asegurandose de que el estado refleje correctamente los datos iniciales e interacciones del usuario con el componente 
    componentDidMount() {
        // en esta primera condicion se verifica si el correo electronico del usuario esta incluido en la lista de likes 
        // auth.currentUser.email es el usuario actual 
        // this.props.data.data es donde corroboro los datos 
        // si el correo esta, entonces establece el estado miLike en true 
        // eso indica que el usuario dio like 
        if (this.props.data.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                miLike: true
            })
        } 
        // en esta segunda condicion se verifica si el correo del usuario actual es igual al propietario owner
        // si coinciden, se establece el estado de owner, en true e indica que el usuario es el propietario de los datos 
        if (auth.currentUser.email === this.props.data.data.owner){
            this.setState({
                owner: true
            })
        }
    }

    // el metodo botonLike es una funcion que se utiliza para gesitonar el evento de hacer clic en el like 
    // se encarga de alternar el estado del like y realizar actualizaciones 
    botonLike(){
        // en la primera condicion se verifica si el estado miLike es true, lo que indica si el usuario dio like 
        if(this.state.miLike === true){
            // en ese caso se actualiza el estado estableciendo miLike, en false para indicar que el usuario quito el like
            // tambien reduce 1 la cantidad de likes
            this.setState({
                miLike: false,
                cantidadDeLikes: this.state.cantidadDeLikes -1,
            })
            // ademas llama a la funcion disLike, para realizar acciones necesarias con el dislike 
            // envia una solicitud al servidor para registrar que el usuario dio un dislike 
            this.disLike()
        // en la segunda condicion, si la primera no se cumple, significa que el usuario aun no ha dado like 
        // se actualiza con el like en true
        // se incrementa en 1 la cantidad de likes 
        } else{
            this.setState({
                miLike: true,
                cantidadDeLikes: this.state.cantidadDeLikes +1,
            })
            // envia solicitud al servidor indicando que se dio un like 
            this.likes()
        }
    }

    // la funcion likes realiza una operacion en la base de datos para agregar el correo electronico del usuario 
    // se agrega al array de likes en un documento especifico de posts 
    likes() {
        // accede a la coleccion posts utilizando db.collection('post')
        db.collection('posts')
        // obtengo un documento especifico .doc(this.props.data.id), lo de adentro es el identificador al q le asigno el like
        .doc(this.props.data.id)
        // utilizo el metodo update para actualizar el documento 
        // firebase.firestore.FieldValue.arrayUnion uso para agregar el coreo al array existente dee likes 
        // el motodo update devuelve una promesa 
        .update({
            // actualizo el campo likes de un documento de firestore 
            // el mail que agrego es el auth.currectUser.email
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        // utiliza then para deolver la promesa 
        // realiza una accion despues de que se completo la actualizacion, muestra like en la consola 
        .then(()=> 
        console.log('like')
           )
        // catch es un metodo utilizado en javascript para capturar y manejar errores de bloques de codigo 
        // capturamos cualquier error que pueda ocurrir durante la solicitud 
        // si se produce un error se registra en la consola, y lo podemos manejar de manera adecuada
        .catch(error=>console.log(error))
    }

    // la funcion dislike realiza una operacion en la base de datos para quitar el correo electronico del usuario 
    // se quita al array de likes en un documento especifico de posts 
    disLike() {
        // accede a la coleccion posts utilizando db.collection('post')
        db.collection('posts')
        // obtengo un documento especifico .doc(this.props.data.id), lo de adentro es el identificador al q le quito el like
        .doc(this.props.data.id)
        // utilizo el metodo update para actualizar el documento 
        // firebase.firestore.FieldValue.arrayUnion uso para quitar el coreo al array existente de likes 
        // el motodo update devuelve una promesa 
        .update({
            // actualizo el campo likes de un documento de firestore 
            // el mail que quito es el auth.currectUser.email
            // cambie a arrayRemove 
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> 
            // utiliza then para deolver la promesa 
            // realiza una accion despues de que se completo la actualizacion, muestra dislike en la consola 
            console.log('disLike')
           )
        // catch es un metodo utilizado en javascript para capturar y manejar errores de bloques de codigo 
        // capturamos cualquier error que pueda ocurrir durante la solicitud 
        // si se produce un error se registra en la consola, y lo podemos manejar de manera adecuada
        .catch(error=>console.log(error))
    }

    // esta funcion se encarga de eliminar un post especifico de la coleccion posts en firebase firestone 
    deletePost(){
        // esto nos hace refenencia a la coleccion posts en firestone 
        db.collection("posts")
        // con esto accedo a un documento especifico dentro de la coleccion 
        .doc(this.props.data.id)
        // llamo al metodo delete en el documento para eliminarlo de la coleccion 
        .delete()
        // uso el metodo then para realizar alguna accion despues que la eliminacion se haya completado
        // en este caso se imprime post eliminado 
        .then(() => {
            console.log('Post eliminado');
        })
        // catch es un metodo utilizado en javascript para capturar y manejar errores de bloques de codigo 
        // capturamos cualquier error que pueda ocurrir durante la solicitud 
        // si se produce un error se registra en la consola, y lo podemos manejar de manera adecuada
        .catch((e) => { console.log(e);
        });
    }

    // el metodo render es parte del ciclo de vida de un componente en React 
    // se usa para renderizar y mostrar el contenido del componente en la interfaz de usuario 
    render(){
        // return es una declaracion utilizada en las funciones para devolver un valor o un conjunto de elementos 
        // return marca el inicio del retorno del JSX (javascript XML)
        // es una sintaxis similar a HTML utilizada en react para definir una estructura 
        return(
            // en este componente se representa un post en forma de tarjeta 
            // contiene la informacion del creador del post 

            // en el primer view se muestra el componente que renderiza el nombre del creador del post 
            // en caso de que el usuario sea el propietario del post, se muestra un boton de eliminacion 
            // la propiedad flex se utiliza para controlar como se distribuye el espacio dispnible 
            // se usa la funcion navigate del objeto navigation para redirigir a la pantalla de perfil de usuario 
            // verifica si el usuario es con el true

            // image es un componente de react native que utilizo para mostrar imagenes 
            // le asignamos la URL para la ubicacion de la imagen, sea local o en la web

            // text es un componente de react native para mostrar texto en la interfaz 
            // para la descripcion del post 

            // el ultimo view contiene los botones like y comment 
            // icono corazon botones 
            // icono comentario botones 
            // esta conectado con miLike 

            // el ultimo text, sirve para mostrar la cantidad de likes del post 
            // el valor se obtiene de this.state.cantidaddelikes 

            // el touchable opacity onpress es para los comentarios 
            // al tocar el elemento, se ejecuta la accion 
            // permite navegar a la pantalla de comentarios y pasar el indentificador del post como parametro 
            <View style={style.cardContainer}>
                    <View style={style.flex}>
                        <TouchableOpacity onPress={() => this.props.homeProps.navigation.navigate('UsersProfile', { email: this.props.data.data.owner })}>
                            <Text style={style.creador}>{this.props.data.data.owner}</Text>
                        </TouchableOpacity>   

                        {this.state.owner === true ? 
                            <TouchableOpacity onPress={() => this.deletePost()}>
                                <FontAwesome name="trash-o" size={24} color="red" />
                            </TouchableOpacity>
                        : null }
                    </View>
                    <Image
                        style={style.image}
                        source={{ uri: this.props.data.data.photo }}
                    />
                    <Text style={style.contenido}>{this.props.data.data.description}</Text>
                    <View style={style.btnContainer}>
                        <TouchableOpacity onPress={() => this.botonLike()}>
                            {this.state.miLike === false ?
                                <AntDesign name="hearto" size={24} color="white" />

                                : <AntDesign name="heart" size={24} color="#0d9900" />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.props.homeProps.navigation.navigate('Comment', {id: this.props.data.id})}>
                            <FontAwesome5 style={style.btnComment} name="comment" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={style.contenido}>{this.state.cantidadDeLikes} likes</Text>
                    <TouchableOpacity onPress={()=> this.props.homeProps.navigation.navigate('Comment', {id: this.props.data.id})}>
                        <Text style={style.contenido}>{this.props.data.data.comments.length} comentarios</Text>
                    </TouchableOpacity>
                    
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
    cardContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'rgb(180,180,180)',
        borderStyle: 'solid',
        width: '100vw'
    },
    flex: {
        flexDirection: 'row',
        flex: 2,
        width: '100%',
        justifyContent: 'space-between'
    },
    creador: {
        fontWeight: 600,
        color: 'rgb(230,230,230)',
        fontSize: 18,
        marginBottom: 3
    },
    btnContainer: {
        flexDirection: 'row',
        flex: 2,
    },
    btnComment: {
        marginLeft: 8
    },
    contenido: {
        fontSize: 16,
        color: 'rgb(230,230,230)',
        marginTop: 3
    },
    image: {
        width: '100%',
        height: 200
    },
    containerComments: {
        height: '100vh',
        width: '100vw',
    },
    crossComments: {
        marginBottom: 15
    }
})

// export default indica que se esta exportando el componente (archivo entero)
// al usar export default no es necesario especificar un nombre para importar el componente en destino 
// solo se puede tener una exportacion predeterminada por archivo 
// esta listo para poder importarlo desde otro modulo 
export default Card;