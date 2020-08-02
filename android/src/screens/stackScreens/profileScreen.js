import React,{useContext,useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button, ImageBackground,Alert

} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { UserDetails } from '../../../../contextFiles/userDetailsContext';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';



ProfileScreen = ({navigation})=> {
  const userDetails = useContext(UserDetails);
  const [image, setImage] = useState();
  const [response,setResponse] = useState('');
  const [url,setUrl] = useState(userDetails.profileImage);

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

  const updateProfileImage = ()=>{
    if(image){
      const reference = storage().ref(`notices/${image}`);
      const task = reference.putFile(image)
      task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      });
      
      task.then(() => {
        task.snapshot.ref.getDownloadURL().then(res=>{
  
          var ts = new Date();
          var date = ts.toISOString();
          firestore().collection('users').doc(userDetails.userId).update({profileImage:res}).then(() => {
            console.log("Image updated");
            setUrl(res);
            setImage('');
            setResponse('Success')
          },error=>{
            Alert.alert('oops!','Something went wrong',
            [{text:'understodd',onPress:()=> console.log('alert closed')
            }])
          })
  
        })
        console.log('Image uploaded to the bucket!');
      });
    }else{
      Alert.alert('Opps!','No Image to Upload',[
        {text:'Try again', onPress:()=>console.log("alrert closed")
        }
    ])

    }

  }

  return (
        <ScrollView style={styles.container}>
         
          
          <View style={{justifyContent:"center",flex:3}}>
           

                  <View style={{flex:1,alignItems:"center"}}>
                    <ImageBackground
                      source={{
                        uri: url,
                      }}
                      style={{height: 120, width: 120}}
                      imageStyle={{borderRadius: 5}}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                      </View>
                    </ImageBackground>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.th}>User Name</Text>
                      <Text style={styles.td}>{userDetails.username}</Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.th}>Name</Text>
                      <Text style={styles.td}>{userDetails.name}</Text>
                    </View>

                  

                    <View style={styles.row}>
                      <Text style={styles.th} >Email</Text>
                      <Text style={styles.td}>{userDetails.userEmail}</Text>
                    </View>
          </View>

          <View style={{flex:2,alignItems:"center"}}>
            <Text style={{paddingTop:4, color:"#03544e",fontWeight: "bold"}} >Update Profile Image</Text>
            <Text style={styles.th,{padding:4,color:'green'}} >{response}</Text>
            
            <View style={{flexDirection:"row"}}>
            <View style={{alignContent:"center",alignItems:"center",flex:1}}>
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

            <TouchableOpacity
              style={styles.panelButton}
              onPress={updateProfileImage}>
                <Icon2 name="ios-checkmark-circle" color="#fff" size={26} />
              <Text style={styles.panelButtonTitle}>Update</Text>
            </TouchableOpacity>

            

            </View>

            </View>

            <View >
            
          </View>
                          
          </View>

        </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
 container:{
   flex:1,
   padding: 8,
   paddingBottom: 15
 },
 row:{
  marginTop:10,
  padding:10,
  flexDirection: "column",
  justifyContent: 'center',
 },
 th:{
   color:"#03544e",
   fontWeight: "bold",
   
 },
 td:{
   color:"#353838"
 },
 panelButton: {
  width:80,
  borderRadius: 10,
  backgroundColor: '#009387',
  alignItems: 'center',
  margin:4
},
panelButtonTitle: {
  fontSize: 10,
  fontWeight: 'bold',
  color: 'white',
},
panel:{
  flex:1,
  alignItems:"center"
}
});