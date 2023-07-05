

// importo los modulos react y component de la biblioteca react 
// me permite utilizar las funcionalidades de react y la clase component para crear componentes 
// react es la biblioteca principal de javascript para construir interfaces de usuario iteractivas y reutilizables 
// react proporciona metodos y herramientas para crear componentes y gestionar el estado de la app 
// component es una clase base que permite crear componentes personalizados con funcionalidades especificas 
import { React, Component } from 'react';

// importamos varios componentes y modulos de la biblioteca react native 
// view componente es un contenedor flexible para otros componentes, organizamos elementos en al interfaz 
// text componente se usa para renderizar texto en la interfaz de usuario 
// stylesheet es un modulo para crear y gestionar estilos 
// touchableOpacity componente para envolver otros componentes y agregar respuesta tactil al interactuar 
// image es un componente para mostrar imagenes en la interfaz 
// activityIndicator sirve para mostrar un indicador de carga o progreso en una interfaz de usario 
import { TouchableOpacity, View, TextInput, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

// importamos los objetos auth desde el archivo de firebase 
// '../firebase/config' es una ruta relativa 
// auth proporciona metodos para gestionar la autenticacion de usuarios (registrar, iniciar sesion, etc)
import { auth } from '../firebase/config';

// importo una imagen ubicada en assets 
import logo from '../../assets/logo.png';

// la clase login es un componente de React de la clase base "Component"
// login es un componente personalizado que puedo usar en la app 
class Login extends Component{

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
            // las siguientes 10 son propiedades 
            // props hace referencia a las props recibidas por el componente 
            // email es una variable que almacena el correo electronico 
            // password almacena la contraseña ingresada por el usuario 
            // error almacena mensajes de error relacionados con la autenticacion
            // succes almacena mensajes de exito relacionados con la autenticacion
            // login es una variable booleana que indica si el usuario ha iniciado sesion correctamente, true para exitoso 
            // rememberme variable booleana que indica si el usuario marco recordarme, si el valor es true se utiliza para recordar
            // username almacena el nombre de usario 
            // completed se usa para seguimiento del estado de finalizacion de alguna tarea, true es completado
            // se establece con false por defecto, indica que no se completo inicialmente 
            // loaderactive se utiliza para controlar la visibilidad de carga, true muestra el indicador de carga 
            props: props,
            email: '',
            password: '',
            error: '',
            success: '',
            login: false,
            rememberMe:false,
            username:'',
            completed: false,
            loaderActive: true
        }  
    }  

    // el metodo componentDidMount es un metodo del ciclo de vida de un componente en react 
    // se llama automaticamente despues de que el componente se haya montado en el DOM
    // el DOM es una interfaz que permite acceder y manipular los elementos y contenido de un documento de manera programatica 
    // el DOM organiza los elementos del documento en una etrucutra de arbol, donde cada elemento es un nodo en el arbol 
    componentDidMount(){
        auth.onAuthStateChanged(
            user => {
                if(user) {
                    this.props.navigation.navigate('TabNavigation')
                } else {
                    this.setState({
                        loaderActive: false
                    })
                }
            }
        )
    }

    onSubmit() {
        if(this.state.completed === true){
            auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                this.setState({ login: true })
                this.props.navigation.navigate('TabNavigation')
            })
            // el metodo setstate se utiliza dentro del onsubmit para actualizar el estado del componente 
            // se asignan el mensaje de error error.message al estado error
            // es util para mostrar el mensaje de error en la interfaz de usuario 
            .catch(error => this.setState({
                error: error.message,
            }))
        } else {
            // en este caso, se establece directamente el estado error con un mensaje de error predefinido 
            // esto se realiza cuando el valor de this.state.completed es false 
            // lo que indica que los campos no estan completos 
            // se utiliza setstate, para actualizar el estado del componente y mostrar un mensaje de error especifico 
            this.setState({
                error: 'Tenés que completar los campos para iniciar sesión'
            })
        }
            
    }

    onChangeMail(text){
        this.setState({
            email: text,
            error: ''
        })
        if(text.length >= 4 && this.state.password.length >= 4){
            this.setState({
                completed: true
            })
        } else {
            this.setState({
                completed: false
            })
        }   
    }

    onChangePassword(text){
        this.setState({
            password: text,
            error: ''
        })
        if(this.state.email.length >= 4 && text.length >= 4){
            this.setState({
                completed: true
            })
        } else {
            this.setState({
                completed: false
            })
        }
    }

    


    // el metodo render es parte del ciclo de vida de un componente en React 
    // se usa para renderizar y mostrar el contenido del componente en la interfaz de usuario 
    render(){
        // return es una declaracion utilizada en las funciones para devolver un valor o un conjunto de elementos 
        // return marca el inicio del retorno del JSX (javascript XML)
        // es una sintaxis similar a HTML utilizada en react para definir una estructura 
        return(
            <View style={style.container}>
                {this.state.loaderActive === true ?
                    <View>
                        <Image
                            style={style.imageLoader}
                            source={logo}
                        />
                        <ActivityIndicator size='large' color='green' />
                    </View>
                :
                    <View style={style.container}>
                        <Image
                            style={style.image}
                            source={logo}
                        />
                        <Text style={style.title}>LOG IN</Text>
                        {this.state.error !== '' ? 
                        <Text style={style.error}>{this.state.error}
                        </Text> : null}
                        {this.state.success !== '' ? 
                        <Text style={style.success}>{this.state.success}
                        </Text> : null}

                        <TextInput 
                        style={style.input} 
                        keyboardType='email-address' 
                        placeholder='email' 
                        onChangeText={text => this.onChangeMail(text)} 
                        value={this.state.email} />

                        <TextInput 
                        style={style.input} 
                        keyboardType='default' 
                        secureTextEntry={true} 
                        placeholder='password' 
                        onChangeText={text => this.onChangePassword(text)} value={this.state.password}/>
                        {this.state.completed === false ?
                        
                            <TouchableOpacity onPress={() => this.onSubmit()} style={style.btnLoginDisabled}>
                                <Text style={style.btnLoginTxtDisabled}>Ingresar</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.onSubmit()} style={style.btnLogin}>
                                <Text style={style.btnLoginTxt}>Ingresar</Text>
                            </TouchableOpacity>
                        }

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={style.btnLogin}>
                            <Text style={style.btnLoginTxt}>Registrate acá</Text>
                        </TouchableOpacity>
                    </View>
                }

            </View>
        );
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    imageLoader: {
        textAlign: 'center',
        width: '40vw',
        height: undefined,
        aspectRatio: 20 / 10,
        margin: 10
    },
    image: {
        width: '50vw',
        height: undefined,
        aspectRatio: 20 / 10,
        margin: 10,
        alignItems: 'center'
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
        textAlign: 'right',
        width: '100%'
    },
    btnLoginTxt: {
        color: 'rgb(255,255,255)'
    },
    btnLoginDisabled: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(130,130,130)',
        backgroundColor: 'rgb(0,0,0)',
        margin: 10,
        padding: 10,
        textAlign: 'right',
        width: '100%'
    },
    btnLoginTxtDisabled: {
        color: 'rgb(130,130,130)'
    },
    error: {
        fontSize: '10px',
        color: 'rgb(255,0,0)'
    },
    success: {
        fontSize: '10px',
        color: 'rgb(0,255,0)'
    },
    input: {
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)',
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        margin: 10,
        width: '100%'
    }
});

// export default indica que se esta exportando el componente (archivo entero)
// al usar export default no es necesario especificar un nombre para importar el componente en destino 
// solo se puede tener una exportacion predeterminada por archivo 
// esta listo para poder importarlo desde otro modulo 
export default Login;