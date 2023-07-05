

// importo los modulos react y component de la biblioteca react 
// me permite utilizar las funcionalidades de react y la clase component para crear componentes 
// react es la biblioteca principal de javascript para construir interfaces de usuario iteractivas y reutilizables 
// react proporciona metodos y herramientas para crear componentes y gestionar el estado de la app 
// component es una clase base que permite crear componentes personalizados con funcionalidades especificas 
import React, { Component } from "react";

// importo la funcion createbottomtabnavigator del paquete de react 
// proporciona un conjunto de herramientas para la navegacion en aplicaciones react 
// la funcion me permite crear un navegador de pestaneas en la parte inferior 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// importamos varios conjunto sde iconos para agragar graficos y visuales 
// contenemos iconos de difenretes fuentes como fontawesome, ionicos, antdesign. 
// los utilizamos con la linea de codigo <FontAwesome name="check" size={24} color="green" />
import { FontAwesome, Ionicons, AntDesign, Entypo } from '@expo/vector-icons';

// importo los componentes generados por nosotros 
import Profile from "./Profile";
import AddPost from "./AddPost";
import Search from "./Search";
import Home from "./Home";

// el archivo TabNavigation utiliza un enfoque funcional para definir el componente en lugar de un componente de clase 
// no requiere un constructor porque no utiliza un estado interno, ni enlaza metodos de clase 
// este enfoque funcional es preferible cuando no se requiere un estaod interno complejo 
// permite un codigo mas limpio y legible al eliminar la necesidad de escribir un constructor 
// los hooks proporcionan una forma mas intuitiva y flexible de trabajar 


export default function TabNavigation() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator 
      screenOptions={{ tabBarShowLabel: false,
        
          "tabBarActiveBackgroundColor": "#000000",
          "tabBarInactiveBackgroundColor": "#181818",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]
      }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={
          { tabBarIcon: ({focused, color}) => <FontAwesome name="home" size={24} color={focused ? "#0d9900" : "white"}/>, headerShown: false }
        }
      />
      <Tab.Screen
        name='AddPost'
        component={AddPost}
        options={
          { tabBarIcon: ({focused, color}) => <AntDesign name="plus" size={24} color={focused ? "#0d9900" : "white"} />, headerShown: false }
        }
      />
      {<Tab.Screen
        name='Search'
        component={Search}
        options={
          { tabBarIcon: ({focused, color}) => <Entypo name="magnifying-glass" size={24} color={focused ? "#0d9900" : "white"} />, headerShown: false }
        }
      />}
      {<Tab.Screen
        name='Profile'
        component={Profile}
        options={
          { tabBarIcon: ({focused, color}) => <Ionicons name="person-circle-outline" size={24} color={focused ? "#0d9900" : "white"} />, headerShown: false }
        }
      />}
    </Tab.Navigator>
  )
}