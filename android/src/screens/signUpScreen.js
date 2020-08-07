import React,{useState ,useContext} from 'react'
import {Picker} from '@react-native-community/picker';
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

import LinearGradient from 'react-native-linear-gradient';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { color } from 'react-native-reanimated';
import {AuthContext} from '../../../contextFiles/context'
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore"

const SignUpScreen = ({navigation})=>{

    const {signUp} = React.useContext(AuthContext);
    
    function ValidateEmail(mail)    
    {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (mail.match(mailformat))
            {
                return (true)
            }
                alert("You have entered an invalid email address!")
                return (false)
            }

        

   
    

    const [role, setRole] = useState('')


    const [data, setData] = React.useState({
        name: '',
        profileImage: 'https://firebasestorage.googleapis.com/v0/b/reactnative-13e22.appspot.com/o/default%2Fman-avatar-profile-round-icon_24640-14044.jpg?alt=media&token=4844fe61-4ddf-49b9-8b53-f5c32974ff20',
        username: '',
        email:'',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });


    const nameTextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                name: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                name: val,
                check_textInputChange: false
            });
        }
    }


    const usernameTextInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }



    const emailTextInputChange = (val) => {
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

     const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
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

    const signUpHandle=(name,profileImage,username,email,password,confirmPassword,role)=>{
        console.log(data.name);

        if(username.length<3){
            Alert.alert('Opps!',"User Name need more than 3 charactors",[
                {text:'Try again', onPress:()=>console.log("alrert closed")
                }
            ])
        }else if(name.length<3){
            
            Alert.alert('Opps!'," Name need more than 3 charactors",[
                {text:'Try again', onPress:()=>console.log("alrert closed")
                }
            ])
        }else if(!ValidateEmail(email)){
        
            
        }else if(password.length<5){
            Alert.alert('Opps!',"need more than 5 charactors for password",[
                {text:'Try again', onPress:()=>console.log("alrert closed")
                }
            ])

        }else if(!(password===confirmPassword)){
            Alert.alert('Opps!',"Password mismatch , please check again",[
                {text:'Try again', onPress:()=>console.log("alrert closed")
                }
            ])
        
        }else if(!(role=='admin' || role=='staff')){
            Alert.alert('Opps!',"Please select 'admin' or 'staff'",[
                {text:'Try again', onPress:()=>console.log("alrert closed")
                }
            ])
        }else{           
            auth().createUserWithEmailAndPassword(email,password).then((res)=>{
                console.log("user created");
                console.log(res.user.email);
                firestore().collection('users').doc(res.user.uid).set({name:name,profileImage:profileImage,username:username,email:res.user.email,uid:res.user.uid,role:role});
                signUp(name,profileImage,username,email,role,res.user.uid)
         
                // dispatch({type:'SIGNUP',email: res.user.email, uid :res.user.uid, role:role,username:username,name:name,profileImage:profileImage});
              },error=>{   
                console.log(error);
                errorCode = error.code;
                console.log(error.code);
                errorMessage = error.message;
                message="";
                if (errorCode === 'auth/email-already-in-use') {
                    console.log("The email address is already in use by another account");
                    message="The email address is already in use by another account"
                } else if (errorCode === 'auth/too-many-requests'){
                    message="Too many unsuccessfull logins, Please try again later"
                }else{
                    message="Invalid details!"
                }
                Alert.alert('Opps!',message,[
                    {text:'Try again', onPress:()=>console.log("alrert closed")
                    }
                ])
                return error;
              })

            }
    }

        return (
            <ScrollView style={styles.container}>
               <StatusBar backgroundColor='#009387' barStyle="light-content"/>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Register</Text>
                </View>
                <Animatable.View 
                    animation="fadeInUpBig"
                    style={[styles.footer,{
                        backgroundColor:'white'
                    }]}
                    
                    >

                    <Text style={styles.text_footer}>
                        User Name
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome 
                            name="user-o"
                            color="#05375a"
                            size={20}/>
                        <TextInput
                            placeholder="eg: JohnD"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => usernameTextInputChange(val)}
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

                    <Text style={styles.text_footer}>
                        Name
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome 
                            name="user-o"
                            color="#05375a"
                            size={20}/>
                        <TextInput
                            placeholder="eg: John doily"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => nameTextInputChange(val)}
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
                            onChangeText={(val) => emailTextInputChange(val)}
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


                    <Text style={[styles.text_footer,{marginTop:25}]}>
                            Confirm Password
                    </Text>
                    <View style={styles.action}>
                        <Feather 
                            name="lock"
                            color="#05375a"
                            size={20}/>
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                            />
                        <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
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




                    <Text style={[styles.text_footer,{marginTop:25,marginBottom:10}]}>
                            Your Role
                    </Text>

                    <View>
                    <Picker
                            selectedValue={role}
                            style={{height: 50, width: '100%'},styles.textInput}
                            onValueChange={(val)=>{setRole(val);
                            console.log(val);
                            }}>
                            <Picker.Item label={'Select your role'} value={''} />
                            <Picker.Item label={'Admin'} value={'admin'} />
                            <Picker.Item label={'Staff'} value={'staff'} />
                            </Picker>
                    </View>                    

                    {/* buttons here is */}
                    <View style={styles.button}>
                        
                    <TouchableOpacity
                            style={styles.signIn}
                            onPress={()=>{signUpHandle(data.name,data.profileImage,data.username,data.email,data.password,data.confirm_password,role)}}
                        >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={styles.signIn}
                                    >
                                    <Text    
                                        style={[styles.textSign, {color:'#fff'}]}>
                                                Sign Up
                                    </Text>
                                </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=> navigation.navigate('SignInScreen')}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 5
                            }]}
                         >
                             <Text style={[styles.textSign, {
                                    color: '#009387'
                                    }]}>
                                    Sign In
                            </Text>
                        </TouchableOpacity>

                    </View>
                
                </Animatable.View>
            </ScrollView>
        )
};

export default SignUpScreen;


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
        fontSize: 16
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 15
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
