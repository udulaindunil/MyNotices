import React from 'react'
import { createDrawerNavigator, createStackNavigator } from '@react-navigation/stack';

import { crea} from '@react-navigation/stack'

import SplashScreen from './splashScreen';
import SignInScreen from './signInScreen';
import SignUpScreen from './signUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation})=>{
    return (
        <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
            <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        </RootStack.Navigator>
    );
}
export default RootStackScreen;