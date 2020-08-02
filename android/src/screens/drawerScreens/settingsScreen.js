import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../../../contextFiles/context'
import Icon from 'react-native-vector-icons/Ionicons'

SettingsScreen = ({navigation})=> {

  const {signOut} = React.useContext(AuthContext);

  function updatePassword(){
    if((data.password===data.confirm_password)&&(data.password.length>5)){
      auth().currentUser.updatePassword(data.password);
      Alert.alert('Password Updated','Done'[
        {text:'logOut now', onPress:()=>{signOut()}
        }])
    }else{
      Alert.alert('Opps!','Passwords Not matched or need more than 6 charactors',[
        {text:'Try again', onPress:()=>console.log("alrert closed")
        }
    ])
    }
  }

  const [data, setData] = React.useState({
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    });


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

  return (<>
  <View style={{padding:'2%',flex:1}}>
     
                      <View style={styles.header}>

                          <View>
                          <Icon.Button 
                                name="ios-menu"
                                size={25}
                                onPress={()=>navigation.openDrawer()}
                                backgroundColor="#009387"
                            >
                            </Icon.Button>

                          </View>

                          <View>

                             <Text style={{color:'#fff',fontSize:26, fontWeight:"bold"}}>Update password</Text>
                          </View>

               


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


                      <View style={styles.button}>
                        
                    <TouchableOpacity
                            style={styles.signIn}
                            onPress={()=>{updatePassword()}}
                        >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={styles.signIn}
                                    >
                                    <Text    
                                        style={[styles.textSign, {color:'#fff'}]}>
                                              Update Password
                                    </Text>
                                </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                           onPress={() => navigation.navigate("Home")}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 5
                            }]}
                         >
                             <Text style={[styles.textSign, {
                                    color: '#009387'
                                    }]}>
                                    Home
                            </Text>
                        </TouchableOpacity>

                    </View>

            </View>
</>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 1,
      justifyContent: 'center',
      paddingBottom: 50,
      backgroundColor: '#009387',
      flexDirection: "row"
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
