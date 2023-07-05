// punto de entrada principal de mi aplicacion React Native 
// se configuran y registran pantallas y navegadores de la app 

// statusbar es un componente proporcionado por expo para personalizar la barra de estado 
import { StatusBar } from 'expo-status-bar';

// se utiliza para importar los componentes y estilos de react native 
// stylesheet es un modulo proporciona una forma conveniente de definir estilos para los componentes 
// el componente text se utiliza para mostrar texto en la interfaz de usuario 
// el componente view se usa para crear contenedores y agrupar otros componentes (como un DIV)
// en este caso se utilizo unicamente el stylesheet abajo 
import { StyleSheet, Text, View } from 'react-native';

//importamos el componente navigationcontainer de la biblioteca de react 
// es fundamental para la navegacion y enrutamientos 
// podria usar stackNavigator o TabNavigator 
// para usar el stackNavigator se necesita importar el createnativestacknavigator y configurar rutas 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importamos los componentes generados por nosotros 
// lo usamos dentro de una pila de navegacion para permitir navegar entre pantallas
import Login from './src/screens/Login.js';
import Register from './src/screens/Register.js';
import TabNavigation from './src/screens/TabNavigation';
import Comment from './src/screens/Comment';
import UsersProfile from './src/screens/UsersProfile.js';
import RegisterAddPhoto from './src/screens/RegisterAddPhoto.js';

// declaramos la funcion llamada app que se exporta 
// export se usa para que la funcion app pueda ser importada y utilizada en otros archivos 
// al ser export default estoy indicando que esta funcion es la exportacion principal 
export default function App() {

  // creo un objeto stack que representa un stack navigator en react navigation
  // uso la funcion createNativeStackNavigator que importe 
  // el objeto stack se usa para configurar y definir la navegacion mediante una pila de pantallas 
  const Stack = createNativeStackNavigator();

  // el stack.navigator permite la navegacion mediante una pila de pantallas 
  // es util para inicios de sesion, registros, perfil de usuario, 
  // el return determina que renderiza en la interfaz de usuario 
    return(
      // en el componente NavigationContainer esta provisto por react navigation
      // contenedor para la configuracion de navegacion de la alicacion 
      // options={{headerShown: false}}: indica que no se mostrara el encabezado de pantalla 
      // no se mostrara la barra de navegacion en la parte superior de la pantalla 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/> 
          <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
          <Stack.Screen name='Comment' component={Comment} options={{headerShown: false}} />
          <Stack.Screen name='UsersProfile' component={UsersProfile} options={{headerShown: false}} />
          <Stack.Screen name='RegisterAddPhoto' component={RegisterAddPhoto} options={{headerShown: false}} />
          <Stack.Screen name='TabNavigation' component={TabNavigation} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer> 
    )
}

// declaro la constante style en javascript 
// almacena los estilos definidos para la aplicacion 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// DATA DE OTRAS PAGINAS - ESTRUCTURA 

// assets almaceno recursos estaticos 
// node_modules paquetes de terceros 
// src archivos fuente de mi app, componentes relacionados a la logica 
// components componentes reutilizables (botones, encabezados, etc)
// screens pantallas de la app, define como se comportan y ven
// navigation tab navigator y rutas de navegacion 
// package.json contiene la informacion del proyecto y las dependencias 
// las dependencias son paquetes de software externos que necesitamos para funcionar correctamente 
// estos paquetes son desarrollados y mantenidos por terceros 
