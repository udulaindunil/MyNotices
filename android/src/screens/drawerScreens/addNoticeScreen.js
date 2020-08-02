import React, { useState,useContext,useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ImageBackground,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment'
import { UserDetails } from '../../../../contextFiles/userDetailsContext';

import {useTheme} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons'
var PushNotification = require("react-native-push-notification");



const usersCollection = firestore().collection('notices')






AddNoticeScreen = ({navigation})=> {


  const [image, setImage] = useState();
  const {colors} = useTheme();
  const userDetails = useContext(UserDetails);  
  const [notice,setNotice] = useState('');
  const [response,setResponse] = useState('');
  const [imageUrl, setImageUrl] = useState()


  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }

  const removeImage = () => {
    setImage('');
  }

  useEffect(() => {
    return()=>{
      setResponse('');
    }
  }, []);


  // const dataSave=()=>{
  //   var ts = new Date();
  //   console.log(ts.toISOString());
  //   var date = ts.toISOString();
  //   console.log(imageUrl);
  //             usersCollection.add({ 
  //               notice: notice,
  //               date: date,
  //               role: userDetails.role,
  //               uid: userDetails.userId,
  //               author: userDetails.name,
  //               imageUrl: imageUrl,
  //               state: "active",
  //             }).then(() => {
  //               console.log("Notice Added");
  //               setTimeout(()=>{
  //                 setResponse('Notice added!');
  //               },1000);
  //             },error=>{
  //               Alert.alert('oops!','Something went wrong',
  //               [{text:'understodd',onPress:()=> console.log('alert closed')
  //               }])
  //             })

  // }

  const dataRecord = ()=>{      
        const reference = storage().ref(`notices/${image}`);
        const task = reference.putFile(image)
        task.on('state_changed', taskSnapshot => {
          console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });
        
        task.then(() => {
          task.snapshot.ref.getDownloadURL().then(res=>{

            var ts = new Date();
            var date = ts.toISOString();
            usersCollection.add({ 
              notice: notice,
              date: date,
              role: userDetails.role,
              uid: userDetails.userId,
              author: userDetails.name,
              imageUrl: res,
              state: "active",
            }).then(() => {

              PushNotification.localNotification({
                title: "New Notice Added", // (optional)
                message: notice, // (required)
              });

              console.log("Notice Added");
              setTimeout(()=>{
                setResponse('Notice added!');
              },1000);
              setNotice();
              setImage('');
            },error=>{
              Alert.alert('oops!','Something went wrong',
              [{text:'understodd',onPress:()=> console.log('alert closed')
              }])
            })

          })
          console.log('Image uploaded to the bucket!');
        });
  }

  function publishNotice(){
    if(notice.length > 4){
      Alert.alert('Publish now','Are you sure, You want to permanantly delete this notice',
      [{text:'Confirm', onPress:()=>{dataRecord()}},{text:'Not now', onPress:()=>{}}]);
    }else{
    Alert.alert('Opps!','Notice should be over 4 characters long',[
        {text:'Unserstood', onPress:()=>console.log("alrert closed")
        }
    ])
}
}

  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>

   
         <ScrollView style={styles.container}>

          

              <View style={styles.header}>

                <View>
                <Icon2.Button 
                    name="ios-menu"
                    size={25}
                    onPress={()=>navigation.openDrawer()}
                    backgroundColor="#009387"
                 >
                </Icon2.Button>
                </View>
                <View>
                  <Text style={{color:'#fff',fontSize:26, fontWeight:"bold"}}>New Notices</Text>
                </View>
              </View>

          <View style={styles.noteInput}>
          <Text style={styles.text_footer}>
                        Notice
          </Text>
                    
                    <View style={styles.action}>
                      
                        <FontAwesome 
                            name="user-o"
                            color="#05375a"
                            size={20}/>
                        <TextInput
                            value={notice}
                            multiline={true}
                            numberOfLines={12}
                            placeholder="Your Notice"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setNotice(val)}
                            />
                      </View>


          <View style={{alignItems:"center",marginTop:'10%'}}>
          </View>
          

     
          <Text style={styles.text_footer}>
                        Upload Notice Image
          </Text>

          <View>
            <View style={{alignContent:"center",alignItems:"center"}}>
            <ImageBackground
                      source={{
                        uri: image,
                      }}
                      style={{height: 120, width: 120}}
                      imageStyle={{borderRadius: 15}}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name="camera"
                          size={35}
                          color="#009387"
                          style={{
                            opacity: 0.7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: '#009387',
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    </ImageBackground>
            </View>

          <View style={styles.panel}>
         
            <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
            <Icon2 name="ios-camera" color="#fff" size={26} />
              <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
            <Icon2 name="ios-images" color="#fff" size={26} />
              <Text style={styles.panelButtonTitle}>Gallery</Text>
            </TouchableOpacity>

            
            <TouchableOpacity
              style={styles.panelButton}
              onPress={removeImage}>
                <Icon2 name="ios-close-circle" color="#fff" size={26} />
              <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>

            </View>

            <View >
            
          </View>
                          
          </View>

          </View>


          <View style={{alignContent:"center"}}>
            <Text style={{color:'green',textAlign:"center"}}>{response}</Text>
          </View>


                        <View style={styles.butonSet}>

                                  <TouchableOpacity
                                      style={styles.signIn}
                                      onPress={() => publishNotice()}
                                  >
                                          <LinearGradient
                                              colors={['#08d4c4', '#01ab9d']}
                                              style={styles.signIn}
                                              >
                                              <Text    
                                                  style={[styles.textSign, {color:'#fff'}]}>
                                                        Publish notice
                                              </Text>
                                          </LinearGradient>
                                  </TouchableOpacity>

                                  <TouchableOpacity
                                      style={styles.signIn}
                                      onPress={() => navigation.navigate("Home")}
                                  >
                                          <LinearGradient
                                              colors={['#08d4c4', '#01ab9d']}
                                              style={styles.signIn}
                                              >
                                              <Text    
                                                  style={[styles.textSign, {color:'#fff'}]}>
                                                        Home
                                              </Text>
                                          </LinearGradient>
                                  </TouchableOpacity>

                        </View>
            
          </ScrollView>
      </TouchableWithoutFeedback>
  );
};

export default AddNoticeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff'
  },
  header: {
      alignItems: "center",
      paddingHorizontal: 20,
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
      fontSize: 20
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
  panel:{
    flexDirection: 'row',
    backgroundColor: '#fff'
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
      paddingLeft: 10,
      color: '#05375a',
  },
  panelButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#009387',
    alignItems: 'center',
  },
  panelButtonTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },

  noteInput:{
    marginTop: '5%',
    padding:'8%',
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
      alignItems: 'flex-end',
      width: '80%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginBottom:4
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  butonSet:{
    alignItems: "center",
    justifyContent: 'center',
  }
});
