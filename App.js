/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{ useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabsScreen from './android/src/screens/mainTabScreen';
import DrawerContent from './android/src/screens/drawerContent';
import AddNoticeScreen from './android/src/screens/drawerScreens/addNoticeScreen';
import SettingsScreen from './android/src/screens/drawerScreens/settingsScreen';
import BookMarkScreen from './android/src/screens/drawerScreens/boockMarkScreen';
import UpdateNoticesScreen from './android/src/screens/drawerScreens/updateNotices';
import UpdateNoticeScreen from './android/src/screens/components/UpdateNotice';
import CommentNoticeScreen from './android/src/screens/components/commentNotice';
import NoticeCommentsScreen from './android/src/screens/drawerScreens/noticeComments';
import NoticeHistoryScreen from './android/src/screens/drawerScreens/noticeHistoryScreen';
import NoticeImageScreen from './android/src/screens/drawerScreens/noticeImageScreen';
import RootStackScreen from './android/src/screens/rootStackScreen';
import { View } from 'react-native-animatable';
import {ActivityIndicator } from 'react-native-paper';
import {AuthContext } from './contextFiles/context';

import {UserDetails } from './contextFiles/userDetailsContext';
import auth from '@react-native-firebase/auth';
// import PushNotification from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");
export const userDetailsContext = React.createContext();

const Drawer = createDrawerNavigator();

function App() {

  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },

    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
  
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);

    },

    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,

    requestPermissions: true,
  });

  const [isLoading, setIsLoading] = useState('');
  const [error,setError] = useState('');

  const initialLoginState={
    isLoading:true,
    userEmail : null,
    userId : null,
    role: null,
    username: null,
    name: null,
    error:null,
  }

  const loginReducer =(prevState,action)=>{
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return{
          ...prevState,
          userId: action.uid,
          role:null,
          isLoading : false,
        };

      case 'SIGNIN':
        return{
          ...prevState,
          userEmail: action.email,
          userId: action.uid,
          role:action.role,
          username: action.username,
          name: action.name,
          isLoading : false,
          profileImage: action.profileImage
        };

      case 'SIGNUP':
        return{
          ...prevState,
          userEmail: action.email,
          userId: action.uid,
          role:action.role,
          username: action.username,
          name: action.name,
          profileImage: action.profileImage,
          isLoading : false,
        };

      case 'LOGOUT':
        return{
          ...prevState,

          userEmail: null,
          userId: null,
          role: null,
          username: null,
          name: null,
          isLoading : false,
        };
      
      case 'REGISTER':
        return{
          ...prevState,
          isLoading : false,
        };

        
    
    }
  }


  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  const authContext = React.useMemo(()=>({
    signIn:(email,userId,role,username,name,profileImage)=>{
      let userToken;
      userToken= null;
      dispatch({type:'SIGNIN',email: email, uid :userId, role:role,username:username,name:name,profileImage:profileImage});       
    },
    signOut:()=>{
      auth().signOut().then(() => {
        console.log('User signed out!');
        dispatch({type:'LOGOUT'});
    },error=>{
      dispatch({type:'LOGOUT'});
    });
    },
    signUp:(name,profileImage,username,email,role,userId)=>{
      let userToken;
      userToken= null;
      dispatch({type:'SIGNUP',email: email, uid :userId, role:role,username:username,name:name,profileImage:profileImage});       
    }
  }));

  useEffect(() => {



    setTimeout(()=>{

      // for testing 
      // authContext.signIn('udulaindunil@gmail.com','123456')
      // authContext.signIn('shenal@gmail.com','1234567')
      
      // this under code is for orginal
      setIsLoading(false);
      let userId;
      userId = null
      dispatch({type:'RETRIVE_TOKEN', uid :userId});
    },1000);



  }, []);



  if(loginState.isLoading){
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <UserDetails.Provider value={loginState}>

              <NavigationContainer>
                {loginState.userId !== null ?(
                  <Drawer.Navigator drawerContent={props=><DrawerContent{...props}/>}>
                    <Drawer.Screen name="HomeDrawer" component={MainTabsScreen}  />
                    <Drawer.Screen name="AddNoticeScreen" component={AddNoticeScreen} />
                    <Drawer.Screen name="UpdateNoticesScreen" component={UpdateNoticesScreen} />
                    <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                    <Drawer.Screen name="BookMarkScreen" component={BookMarkScreen}  initialParams={{ userId: loginState.userId}}/>
                    <Drawer.Screen name="UpdateNoticeScreen" component={UpdateNoticeScreen} />
                    <Drawer.Screen name="CommentNoticeScreen" component={CommentNoticeScreen} />
                    <Drawer.Screen name="NoticeCommentsScreen" component={NoticeCommentsScreen} />
                    <Drawer.Screen name="NoticeHistoryScreen" component={NoticeHistoryScreen} />
                    <Drawer.Screen name="NoticeImageScreen" component={NoticeImageScreen} />
                    
                    
                    
                    {/*  */}
                    
                  </Drawer.Navigator>
                ): (    
                  
                    <RootStackScreen />
                                                           
                  )}
              </NavigationContainer>
      </UserDetails.Provider>
    </AuthContext.Provider>
  );
}

export default App;
 