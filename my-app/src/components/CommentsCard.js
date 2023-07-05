

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
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";

// la clase commentscard es un componente de React de la clase base "Component"
// commentscard es un componente personalizado que puedo usar en la app 
class CommentsCard extends Component{

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
            // las siguiente es una propiedadad
            // props hace referencia a las props recibidas por el componente 
            props: props
        }
    };

    // el metodo render es parte del ciclo de vida de un componente en React 
    // se usa para renderizar y mostrar el contenido del componente en la interfaz de usuario 
    render(){
        // return es una declaracion utilizada en las funciones para devolver un valor o un conjunto de elementos 
        // return marca el inicio del retorno del JSX (javascript XML)
        // es una sintaxis similar a HTML utilizada en react para definir una estructura 
        return(
            // el componente view tiene un estilo definido 
            // el touchableopacity se usa para la iteraccion con el onpress
            // el onpress ejecuta la accion de navegacion navigate, se navega a la pantalla usersprofile 

            // este codigo muestrae una vista con el propietario de un comentario y el contenido del comentario 
            // al hacer clic, navega a la pantalla usersprofile
            <View style={style.container}>
                <TouchableOpacity onPress={()=> this.props.commentsProps.navigation.navigate('UsersProfile', {email: this.props.data.owner})}>
                    <Text style={style.owner}>{this.props.data.owner}</Text>
                </TouchableOpacity>
                <Text style={style.content}>{this.props.data.content}</Text>
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
        width: '100vw',
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: 'rgb(180,180,180)',
        borderStyle: 'solid',
    },
    owner: {
        color: 'rgb(255,255,255)',
        fontWeight: '600',
        fontSize: 16
    },
    content: {
        color: 'rgb(255,255,255)',
        fontSize: 16
    }
})

// export default indica que se esta exportando el componente (archivo entero)
// al usar export default no es necesario especificar un nombre para importar el componente en destino 
// solo se puede tener una exportacion predeterminada por archivo 
// esta listo para poder importarlo desde otro modulo 
export default CommentsCard;