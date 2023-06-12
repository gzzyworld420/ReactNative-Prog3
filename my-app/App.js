import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login.js';
import Register from './src/screens/Register.js';
import TabNavigation from './src/screens/TabNavigation.js';
import Comment from './src/screens/Comment.js';
import UsersProfile from './src/screens/UsersProfile.js';
import RegisterAddPhoto from './src/screens/RegisterAddPhoto.js';

const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name='Register' component={ Register }/>
        <Stack.Screen name='Login' component={ Login }/>
<<<<<<< HEAD
        <Stack.Screen name='HomeNavigation' component={ HomeNavigation }/>
=======
        <Stack.Screen name='Comment' component={Comment} options={{headerShown: false}} />
        <Stack.Screen name='UsersProfile' component={UsersProfile} options={{headerShown: false}} />
        <Stack.Screen name='RegisterAddPhoto' component={RegisterAddPhoto} options={{headerShown: false}} />
        <Stack.Screen name='TabNavigation' component={TabNavigation} options={{headerShown: false}} />
>>>>>>> 14e2cad2aa7fe91d4d903320f1bdb9484c422626
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
