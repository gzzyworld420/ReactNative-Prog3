

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

// importo una imagen ubicada en assets 
import avatar from '../../assets/avatar.jpeg';

// la clase cardsearch es un componente de React de la clase base "Component"
// cardsearch es un componente personalizado que puedo usar en la app 
class CardSearch extends Component{

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

    // se difinio una funcion llamada cortartexto que recibe un parametro texto 
    // se usa para cortar el texto si tiene mas de 80 caracteres 
    // si la longitud es mayor a 80, utiliza el metodo substring para tomar los primeros 77 caracteres
    // se agrega, ... al final del texto acortado 
    cortarTexto(texto){
        return texto.length > 80 ? texto.substring(0, 77) + '...' : texto
    }

    // el metodo render es parte del ciclo de vida de un componente en React 
    // se usa para renderizar y mostrar el contenido del componente en la interfaz de usuario 
    render(){
        // return es una declaracion utilizada en las funciones para devolver un valor o un conjunto de elementos 
        // return marca el inicio del retorno del JSX (javascript XML)
        // es una sintaxis similar a HTML utilizada en react para definir una estructura 
        return(
            // el codigo muestra una tarjeta de perfil con informacion del propietario 
            // tambien muestra una imagen, y una breve descripcion del usuario 
            
            // el componente view tiene un estilo definido 
            // el touchable opacity lo uso para permitir interaccion al hacer click 
            // se asocio a una funcion de navegacion al evento onpress 
            // el evento onPress, ejecuta la funcion de navegacion 

            // dentro del elemento de tqoue hau un elemento text 
            // tambien hay un componente de vista que contiene la imagen 

            // la imagen verifdica this.props.data.data.photo, 
            // si esta vacio, utiliza la imagen predeterminada, que es el avatar 
            // de lo contrario se utiliza la imagen proporcionada 

            // en el ultimo view, style.contenidoBold muestra texto con estilos 
            <View style={style.cardContainer}>
                <TouchableOpacity onPress={() => this.props.searchProps.navigation.navigate('UsersProfile', { email: this.props.data.data.owner })}>
                    <Text style={style.creador}>{this.props.data.data.owner}</Text>
                    <View style={style.imgYTxt}>
                        <Image
                            style={style.image}
                            source={this.props.data.data.photo === '' ? avatar : this.props.data.data.photo}
                        />
                        <View style={style.text}>
                            <Text style={style.contenidoBold}>{this.props.data.data.userName}</Text>
                            <Text style={style.contenido}>{this.cortarTexto(this.props.data.data.bio)}</Text>
                        </View>
                    </View>
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
        width: '100%'
    },
    creador: {
        fontWeight: 600,
        color: 'rgb(230,230,230)',
        fontSize: 18,
        marginBottom: 3
    },
    contenido: {
        fontSize: 16,
        color: 'rgb(230,230,230)',
        marginTop: 3
    },
    contenidoBold: {
        fontSize: 16,
        color: 'rgb(230,230,230)',
        marginTop: 3,
        fontWeight: '600'
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        marginRight: 5
    },
    imgYTxt: {
        flexDirection: 'row',
        flex: 2
    },
    text: {
        width: '85%'
    }
})

// export default indica que se esta exportando el componente (archivo entero)
// al usar export default no es necesario especificar un nombre para importar el componente en destino 
// solo se puede tener una exportacion predeterminada por archivo 
// esta listo para poder importarlo desde otro modulo 
export default CardSearch;