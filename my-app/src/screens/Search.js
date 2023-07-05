

// importo los modulos react y component de la biblioteca react 
// me permite utilizar las funcionalidades de react y la clase component para crear componentes 
// react es la biblioteca principal de javascript para construir interfaces de usuario iteractivas y reutilizables 
// react proporciona metodos y herramientas para crear componentes y gestionar el estado de la app 
// component es una clase base que permite crear componentes personalizados con funcionalidades especificas 
import { React, Component } from "react";

// importamos varios componentes y modulos de la biblioteca react native 
// view componente es un contenedor flexible para otros componentes, organizamos elementos en al interfaz 
// text componente se usa para renderizar texto en la interfaz de usuario 
// stylesheet es un modulo para crear y gestionar estilos 
// touchableOpacity componente para envolver otros componentes y agregar respuesta tactil al interactuar 
// image es un componente para mostrar imagenes en la interfaz 
// flatlist para renderizar listas de datos de forma eficiente 
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";

// importo el componente cardsearch generado por nosotros 
import CardSearch from "../components/CardSearch";

// importamos los objetos db desde el archivo de firebase 
// '../firebase/config' es una ruta relativa 
// db proporciona metodos y funcionalidades para interactuar, operaciones de lectura, escritura, actualizacion y eliminacion 
import { db } from '../firebase/config';

// la Search newpost es un componente de React de la clase base "Component"
// Search es un componente personalizado que puedo usar en la app 
class Search extends Component{

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
            // las siguientes 8 son propiedades 
            // props hace referencia a las props recibidas por el componente 
            // users almacena una lista de usuarios 
            // searchtext se utiliza para almacenar texto de busqueda 
            // filteredUsers y filteredMail almacenan resultados filtrados de busqueda, se actualizan con una busqueda
            // las variables userErr y mailErr almacenan mensajes de error 
            // almacena un mensaje indicador cuando la busqueda realizada no arrlojo ningun resultado 
            // filter tiene el valor username, se esta realizando un filtro basado en el usuario 
            users: [],
            searchText: '',
            filteredUsers: [],
            filteredMail: [],
            userErr: false,
            mailErr: false,
            emptysearch: '',
            filter: 'username'
        }
    };


    // el metodo componentDidMount es un metodo del ciclo de vida de un componente en react 
    // se llama automaticamente despues de que el componente se haya montado en el DOM
    // el DOM es una interfaz que permite acceder y manipular los elementos y contenido de un documento de manera programatica 
    // el DOM organiza los elementos del documento en una etrucutra de arbol, donde cada elemento es un nodo en el arbol 
    
    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
            let users = [];
            docs.forEach(doc => {
                users.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            this.setState({
                users: users
            })
        })
    }

    preventSubmmit() {

        let textTofilter = this.state.searchText.toLowerCase()

        const filteredUsers = this.state.users.filter(users => users.data.userName.toLowerCase().includes(textTofilter))
        const filteredMail = this.state.users.filter(users => users.data.owner.toLowerCase().includes(textTofilter))

        if (filteredUsers === '') {
            this.setState({ userErr: true, filteredUsers: '' })
        } else { this.setState({ userErr: false, filteredUsers: filteredUsers }) }


        if (filteredMail === '') {
            this.setState({ mailErr: true, filteredMail: '' })
        } else { this.setState({ mailErr: false, filteredMail: filteredMail }) }


    }

    clear() {
        this.setState({
            results: [],
            searchText: '',
            userErr: false,
            mailErr: false
        })
    }

    // el metodo render es parte del ciclo de vida de un componente en React 
    // se usa para renderizar y mostrar el contenido del componente en la interfaz de usuario 
    render(){
        // return es una declaracion utilizada en las funciones para devolver un valor o un conjunto de elementos 
        // return marca el inicio del retorno del JSX (javascript XML)
        // es una sintaxis similar a HTML utilizada en react para definir una estructura 
        return(
            <View style={style.container}>
                {this.state.emptysearch !== '' ?
               
               <Text style={style.error}>{this.state.emptysearch}</Text>
                
                : null}
            
                <TextInput style={style.input}
                    keyboardType='search'
                    placeholder='Busca a tus amigos'
                    onChangeText={text => {
                        if (text === '') {
                            this.setState({ emptysearch: 'Ingrese datos de busqueda', searchText: text, userErr: false, mailErr: false });
                        } else {
                            this.setState({ emptysearch: '', searchText: text });
                            this.preventSubmmit()
                            console.log(this.state.filteredUsers)
                            console.log(this.state.filteredMail);
                        }
                    }}

                    value={this.state.searchText}
                />

                <TouchableOpacity onPress={() => this.clear()} style={style.btnSearch}>
                    <Text style={style.btnSearchTxt}> Borrar busqueda </Text>
                </TouchableOpacity>

                <View style={style.filterBtns}>
                    <TouchableOpacity onPress={() => this.setState({filter: 'username'})} style={this.state.filter==='username' ? style.btnFilterSelected : style.btnFilter}>
                        <Text style={this.state.filter==='username' ? style.btnSearchSelected : style.btnSearchTxt}> Nombre de usuario</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({filter: 'email'})} style={this.state.filter==='email' ? style.btnFilterSelected : style.btnFilter}>
                        <Text style={this.state.filter==='email' ? style.btnSearchSelected : style.btnSearchTxt}> Email </Text>
                    </TouchableOpacity>
                </View>
                {this.state.filter === 'username' ?
                <View>
                {this.state.userErr ?

                    <Text style={style.error}>El usuario {this.state.searchText} no existe</Text>
                    :
                    this.state.searchText != '' ?

                            <FlatList
                                data={this.state.filteredUsers}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => <CardSearch data={item} searchProps={this.props}/>}
                            />
                        :
                        <></>
                }
                </View>
                : null}

                {this.state.filter === 'email' ?
                <View>
                {this.state.mailErr ?

                    <Text style={style.error}>El mail {this.state.searchText} no existe</Text>
                    :
                    this.state.searchText != '' ?
                            <FlatList
                                data={this.state.filteredMail}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => <CardSearch data={item} searchProps={this.props}/>}
                            />

                        :
                        <></>
                }
                </View>
                : null }




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
        backgroundColor: 'rgb(0,0,0)',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center'
    },
    title: {
        fontWeight: 600,
        color: 'rgb(255,255,255)',
        fontSize: 24,
        textAlign: 'center'
    },
    btnSearch: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(255,255,255)',
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        textAlign: 'right'
    },
    btnFilter: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(255,255,255)',
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        textAlign: 'center',
        width: '45%'
    },
    btnFilterSelected: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(255,255,255)',
        backgroundColor: '#0d9900',
        margin: 10,
        padding: 10,
        textAlign: 'center',
        width: '45%'
    },
    btnSearchSelected: {
        color: 'white'
    },
    filterBtns: {
        flexDirection: 'row',
        flex: 2,
        width: '100%',
        justifyContent: 'space-between'
    },
    btnSearchTxt: {
        color: 'black'
    },
    error: {
        fontSize: 12,
        color: 'rgb(255,0,0)'
    },
    input: {
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'white',
        padding: 10,
        margin: 10
    }
})


// export default indica que se esta exportando el componente (archivo entero)
// al usar export default no es necesario especificar un nombre para importar el componente en destino 
// solo se puede tener una exportacion predeterminada por archivo 
// esta listo para poder importarlo desde otro modulo 
export default Search;