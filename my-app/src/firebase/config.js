import app from 'firebase/app';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AntDesign} from '@expo/vector-icons'
import Home from '../screens/Home';
import Profile from '../screens/Profile';

const Tab =  createBottomTabNavigator()

export default function config(){
    return (
        <Tab.Navigator>

            <Tab.Screen name="NewPost" component={NewPost} options={
                {tabBarIcon: () => <AntDesign name="plus" size={24} color="violet"/>}
            } />
            <Tab.Screen name="Home" component={ Home } options={
                {tabBarIcon: () => <AntDesign name="home" size={24} color="violet"/>}
            } />
            <Tab.Screen name="Profile" component={ Profile } options={
                {tabBarIcon: () => <AntDesign name="profile" size={24} color="violet"/>}
            } />

        </Tab.Navigator>
    )
}

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCt4WVNALgW42E5F4ON4ckeUdFDoJJ06D4",
    authDomain: "proyecto-integrador-d0a35.firebaseapp.com",
    projectId: "proyecto-integrador-d0a35",
    storageBucket: "proyecto-integrador-d0a35.appspot.com",
    messagingSenderId: "995019175844",
    appId: "1:995019175844:web:c41f01ad30a88f8d83b331"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();