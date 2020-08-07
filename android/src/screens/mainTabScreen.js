import React from 'react';
import {
  View,
  Text,
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from './stackScreens/homeScreen'
import DetailsScreen from './stackScreens/detailsScreen'
import ProfileScreen from './stackScreens/profileScreen'
import ExploreScreen from './stackScreens/exploreScreen'

import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SupportScreen from './drawerScreens/addNoticeScreen';
import UpdateNoticesScreen from './drawerScreens/updateNotices';
import AddNoticesScreen from './drawerScreens/addNoticeScreen';


const Tab = createMaterialBottomTabNavigator();

const MainTabsScreen = ()=>{
    return (
        <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        style={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Home"
          component={homeStackScreen}   // here U need to set home screen ()homestackscreen
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#009387',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-home" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Details"
          component={detailsStackScreen}
          options={{
            tabBarLabel: 'Details',
            tabBarColor: '#009387',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-contacts" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={profileStackScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#009387',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-person" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Explore"
          component={exploreStackScreen}
          options={{
            tabBarLabel: 'Explore',
            tabBarColor: '#009387',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-paper" color={color} size={26} />
            ),
          }}
        />


      </Tab.Navigator>

      
    );
}


const homeStack = createStackNavigator();
const detailsStack = createStackNavigator();
const profileStack = createStackNavigator();
const exploreStack = createStackNavigator();


const homeStackScreen =({navigation})=>{
    return (
    <homeStack.Navigator screenOptions={{
          headerStyle:{
             backgroundColor: '#009387'
          },
          headerTintColor: '#fff',
          headerTitleStyle:{
            fontWeight: 'bold'
          }
        }}>
          <homeStack.Screen 
            name="Home" 
            component={HomeScreen} 
            options ={{
              title:"NoticeBoard",
              headerLeft: ()=>{
                return (
                <Icon.Button 
                    name="ios-menu"
                    size={25}
                    onPress={()=>navigation.openDrawer()}
                    backgroundColor="#009387"
                 >
                </Icon.Button>)
              },

              headerRight: ()=>{
                return (
                  <>
                  <View style={{flexDirection:"column"}}>
                  <Text style={{color:'red',size:10}}>Y.A.U.I.Sensly</Text>
                  <Text style={{color: 'red',size:10}}>17001625</Text>
                  </View>
                  </>
                  )
              }
            }}
               />
        </homeStack.Navigator> 
        );
  }

  
  const detailsStackScreen =({navigation})=>{
    return (
    <detailsStack.Navigator screenOptions={{
          headerStyle:{
             backgroundColor: '#009387'
          },
          headerTintColor: '#fff',
          headerTitleStyle:{
            fontWeight: 'bold'
          }
        }}>
          <detailsStack.Screen 
            name="Details" 
            component={DetailsScreen}
            options ={{
                title:"Details",
                headerLeft: ()=>{
                  return (
                  <Icon.Button 
                      name="ios-menu"
                      size={25}
                      onPress={()=>navigation.openDrawer()}
                      backgroundColor="#009387"
                   >
                  </Icon.Button>)
                }
              }} 
               />
        </detailsStack.Navigator> 
        )
  }

  const profileStackScreen =({navigation})=>{
    return (
    <homeStack.Navigator screenOptions={{
          headerStyle:{
             backgroundColor: '#009387'
          },
          headerTintColor: '#fff',
          headerTitleStyle:{
            fontWeight: 'bold'
          }
        }}>
          <homeStack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options ={{
              title:"Profile",
              headerLeft: ()=>{
                return (
                <Icon.Button 
                    name="ios-menu"
                    size={25}
                    onPress={()=>navigation.openDrawer()}
                    backgroundColor="#009387"
                 >
                </Icon.Button>)
              }
            }}
               />
        </homeStack.Navigator> 
        );
  }

  const exploreStackScreen =({navigation})=>{
    return (
    <homeStack.Navigator screenOptions={{
          headerStyle:{
             backgroundColor: '#009387'
          },
          headerTintColor: '#fff',
          headerTitleStyle:{
            fontWeight: 'bold'
          }
        }}>
          <homeStack.Screen 
            name="Expolre" 
            component={ExploreScreen} 
            options ={{
              title:"Explore",
              headerLeft: ()=>{
                return (
                <Icon.Button 
                    name="ios-menu"
                    size={25}
                    onPress={()=>navigation.openDrawer()}
                    backgroundColor="#009387"
                 >
                </Icon.Button>)
              }
            }}
               />
        </homeStack.Navigator> 
        );
  }

  export default MainTabsScreen;
  