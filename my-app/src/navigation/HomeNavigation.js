import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AntDesign} from '@expo/vector-icons'
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from '../screens/Login';


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