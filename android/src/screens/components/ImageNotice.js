import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Alert, Image } from 'react-native';
import { List } from 'react-native-paper';
import Swipeout from 'react-native-swipeout';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient';

function ImageNotice({notice,navigation}){
    console.log(notice.imageUrl);

    return(
        <View style={{width:'100%',marginTop:'4%'}}>
                
                <Image
            style={styles.noticeImage}
            source={{
              uri: notice.imageUrl,
            }}/>

        <View style={{alignContent:"center",padding:'8%'}}>
                <TouchableOpacity
                            style={styles.signIn}
                            onPress={()=>navigation.goBack()}
                        >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={styles.signIn}
                                    >
                                    <Text    
                                        style={[styles.textSign, {color:'#fff'}]}>
                                                Back
                                    </Text>
                                </LinearGradient>
                        </TouchableOpacity>
                        </View>
        </View>
    );

}

export default ImageNotice;


const styles = StyleSheet.create({

    noticeElement:{
        margin:5,
        padding:5,
        backgroundColor: "#52aba4",
    },
    userDetails: {
      flex: 1,
      fontSize: 12,
      color:'#013636',
      padding:10,
      alignContent: "center",
      textAlign: "justify",
    },
    noticeImage: {
       width: 250,
       height: 250,
      },
      button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        padding: '5%',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
  
    detailsText:{
        color: "#1c6161",
        fontSize: 18,
    }


})
