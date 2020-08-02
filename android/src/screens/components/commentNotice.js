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
  Keyboard
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import { UserDetails } from '../../../../contextFiles/userDetailsContext';
import { ScrollView } from 'react-native-gesture-handler';
const usersCollection = firestore().collection('notices');

CommentNoticeScreen = ({navigation,route})=> {
    const initNotice= route.params.notice;
    const id = route.params.key;
    const userDetails = useContext(UserDetails);
   
    
    const [notice, setNotice] = useState(initNotice)
    const [response,setResponse] = useState('');
    const [comment, setComment] = useState('');
    
    useEffect(() => {
        setNotice(initNotice);
      }, []);

  function publishNotice(){
      if(notice.length > 4){

        var ts = new Date();
        console.log(ts.toISOString());
        var date = ts.toISOString();
        console.log(notice);
        usersCollection.doc(id).collection('comments').doc(userDetails.userId).set({ 
        comment: comment,
        date: date,
        role: userDetails.role,
        uid: userDetails.userId,
        author: userDetails.name,
        state: "active",
      })  
      .then(() => {
        console.log("Comment Added");
        setTimeout(()=>{
          setResponse('Comment Added');
        },1000)
      },error=>{
        Alert.alert('oops!','Something went wrong',
        [{text:'understodd',onPress:()=> console.log('alert closed')
        }])
      });

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
                <Text style={styles.text_header}>
                  Comment Notice
                </Text>
           </View>

          <View style={styles.noteInput}>
          <Text style={styles.text_footer}>
                        Notice
                    </Text>
          <View style={{justifyContent:"center",padding:2,marginBottom:5}}>
            <Text style={{textAlign:"justify"}}>
              {notice}
            </Text>
          </View>


          <Text style={styles.text_footer}>
                        Your Comment
          </Text>

                    <View style={styles.action}>
                        {/* <FontAwesome 
                            name="user-o"
                            color="#05375a"
                            size={20}/> */}
                        <TextInput
                            value={comment}
                            multiline={true}
                            numberOfLines={12}
                            placeholder="Comment here"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setComment(val)}
                            />

          </View>

          <View style={{alignContent:"center"}}>
              <Text style={{textAlign:"center",color:'green'}}>
                  {response}
              </Text>
          </View>
          
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
                                                        Add Comment
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
                                                  style={[styles.textSign, {color:'#fff',size:16}]}>
                                                        Home
                                              </Text>
                                          </LinearGradient>
                                  </TouchableOpacity>

                        </View>
            
          </ScrollView>
          </TouchableWithoutFeedback>
  );
};

export default CommentNoticeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff'
  },
  header: {
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: '#009387',
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
