import React,{useState,useEffect,useContext} from 'react';
import {View,StyleSheet} from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons' 
import Icon2 from 'react-native-vector-icons/Ionicons'
import { floor } from 'react-native-reanimated';
import {AuthContext} from '../../../../contextFiles/context';
import auth from '@react-native-firebase/auth';
import User from '@react-native-firebase/app'
import { UserDetails } from '../../../../contextFiles/userDetailsContext';

export function AdminDrawerContent(props){

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const {signOut} = React.useContext(AuthContext);
    const userDetails = useContext(UserDetails);
    const toggleTheme =()=>{
        setIsDarkTheme(!isDarkTheme);
    }
    const paperTheme = useTheme();

    const letter = userDetails.userEmail.substring(0,1);


  
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: userDetails.profileImage
                                }}
                                size={50}
                            />

                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>
                                    {userDetails.username}
                                </Title>
                                <Caption style={styles.caption}> {userDetails.name}
                                </Caption>
                            </View>
                        </View>


                    </View>


                    <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem 
                                    icon={({color, size}) => (
                                        <Icon2 
                                        name="ios-create" 
                                        color={color}
                                        size={size}
                                        />
                                    )}
                                    label="New Notice"
                                    onPress={() => {props.navigation.navigate('AddNoticeScreen')}}
                                />

                                <DrawerItem 
                                    icon={({color, size}) => (
                                        <Icon2 
                                        name="ios-sync" 
                                        color={color}
                                        size={size}
                                        />
                                    )}
                                    label="Update Notices"
                                    onPress={() => {props.navigation.navigate('UpdateNoticesScreen')}}
                                />

                                <DrawerItem 
                                    icon={({color, size}) => (
                                        <Icon2 
                                        name="ios-filing" 
                                        color={color}
                                        size={size}
                                        />
                                    )}
                                    label="Notices History"
                                    onPress={() => {props.navigation.navigate('NoticeHistoryScreen')}}
                                />  

                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="To Dos"
                            onPress={() => {props.navigation.navigate('BookMarkScreen')}}
                        />      

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        />

                        
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color,size})=>{
                        <Icon
                        name = "exit-to-app"
                        color={color}
                        size={size}
                        />
                    }}
                    label="Sign Out"
                    onPress={()=>{signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 12,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 2,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    emailBox:{
        backgroundColor:'#009387'
        ,width: 50,
        borderRadius: 50/2,
        alignItems: "center",
        alignContent:"center",
        textAlignVertical:"center",
        justifyContent: "center"
    }
  });


export default AdminDrawerContent;