import React,{useContext,useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Dimensions,
    Button,
    ScrollView
} from 'react-native'

import {Formik} from 'formik'

import * as yup from 'yup';

import LinearGradient from 'react-native-linear-gradient';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { color } from 'react-native-reanimated';
import {AuthContext} from '../../../contextFiles/context';
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore"

const SignInScreen = ({navigation})=>{


    // const userDetails = useContext(UserDetails);
    const {signIn} = React.useContext(AuthContext);



    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        confirm_secureTextEntry: true,
    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const signInFunctoion=(email,password)=>{
        if(email.length>3 && password.length>5){
            signInFirebaseFunction(email,password);
        }else if(password.length<6){
            Alert.alert('Opps!','Invalid password length',[
                {text:'Try again', onPress:()=>console.log("alrert closed")
                }
            ])
        }else if(!ValidateEmail(email)){
            Alert.alert('Opps!','Invalid email',[
                {text:'Try again', onPress:()=>console.log("alrert closed")
                }
            ])
        }
    }

    function signInFirebaseFunction(email,password){
        auth().signInWithEmailAndPassword(email,password).then((res)=>{
            console.log(res.user.email);
            firestore().collection('users').where('uid','==',res.user.uid).get().then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot=>{
                
                 let role=documentSnapshot.data().role;
                 let username=documentSnapshot.data().username;
                 let name=documentSnapshot.data().name;
                 let profileImage= documentSnapshot.data().profileImage;
                 console.log("goin app");
                    signIn(email,res.user.uid,role,username,name,profileImage);
                });
            });
          },error=>{
            
            console.log(error);
            errorCode = error.code;
            errorMessage = error.message;
            message="";
            
            if (errorCode === 'auth/wrong-password') {
                console.log("Wrong password");
                message="Invalid Credentials"
            } else if (errorCode === 'auth/too-many-requests'){
                message="Too many unsuccessfull logins, Please try again later"
            }else{
                message="Invalid Credentials!"
            }
            Alert.alert('Opps!',message,[
                {text:'Try again', onPress:()=>console.log("alrert closed")
                }
            ])

            return error;
          })    
    }


    function ValidateEmail(mail){
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (mail.match(mailformat))
            {
                return (true)
            }
                alert("You have entered an invalid email address!")
                return (false)
            }

        return (
            <ScrollView style={styles.container}>
               <StatusBar backgroundColor='#009387' barStyle="light-content"/>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Welcome</Text>
                </View>
                <Animatable.View 
                    animation="fadeInUpBig"
                    style={[styles.footer,{
                        backgroundColor:'white'
                    }]}                    >
                    <Text style={styles.text_footer}>
                        Email
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome 
                            name="user-o"
                            color="#05375a"
                            size={20}/>
                        <TextInput
                            keyboardType='email-address'
                            placeholder="Your Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            />
                            {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn">
                                <Feather
                                    name="check-circle"
                                    color ="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    <Text style={[styles.text_footer,{marginTop:25}]}>
                            Password
                    </Text>
                    <View style={styles.action}>
                        <Feather 
                            name="lock"
                            color="#05375a"
                            size={20}/>
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                            />
                        <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                        <Feather
                            name="eye-off"
                            color ="gray"
                            size={20}
                        />
                        :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                     </TouchableOpacity>
                    </View>
                    
                    
                    
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={()=>{signInFunctoion(data.email,data.password)}}
                        >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={styles.signIn}
                                    >
                                    <Text    
                                        style={[styles.textSign, {color:'#fff'}]}>
                                                Sign In
                                    </Text>
                                </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=> navigation.navigate('SignUpScreen')}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 5
                            }]}
                         >
                             <Text style={[styles.textSign, {
                                    color: '#009387'
                                    }]}>
                                    Sign Up
                            </Text>
                        </TouchableOpacity>

                    </View>
                
                </Animatable.View>
            </ScrollView>
        )
};

export default SignInScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
