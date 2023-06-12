import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AntDesign} from '@expo/vector-icons'
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import NewPost from '../screens/NewPost';
import Buscador from '../screens/Buscador';

const Tab =  createBottomTabNavigator()

export default function HomeNavigation(){
    return (
        <Tab.Navigator>

            <Tab.Screen name="Home" component={ Home } options={
                {tabBarIcon: () => <AntDesign name="home" size={24} color="violet"/>}
            } />
            <Tab.Screen name="NewPost" component={ NewPost } options={
                {tabBarIcon: () => <AntDesign name="plus" size={24} color="violet"/>}
            } />
            <Tab.Screen name="Profile" component={ Profile } options={
                {tabBarIcon: () => <AntDesign name="profile" size={24} color="violet"/>}
            } />
             <Tab.Screen name="Buscador" component={ Buscador } options={
                {tabBarIcon: () => <AntDesign name="profile" size={24} color="violet"/>}
            } />


        </Tab.Navigator>
    )
}