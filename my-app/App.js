import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login.js';
import Register from './src/screens/Register.js';
import TabNavigation from './src/screens/TabNavigation';
import Comment from './src/screens/Comment';
import UsersProfile from './src/screens/UsersProfile.js';
import RegisterAddPhoto from './src/screens/RegisterAddPhoto.js';

export default function App() {

  const Stack = createNativeStackNavigator();
  
    return(
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
