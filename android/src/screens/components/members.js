import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Alert } from 'react-native';
import { List } from 'react-native-paper';
import Swipeout from 'react-native-swipeout';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient';

function Members({item}){

    return(
        <View style={{width:'100%',marginTop:'4%'}}>
                
                                <Text style={styles.detailsText}>
                                {item.name}
                                </Text>
  
        </View>
    );

}

export default Members;


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
    details: {
        flex: 1,
        flexDirection: 'row', 
        padding:10,
        justifyContent: 'space-between',
        
      },
    //   notice:{
    //       fontSize: 20,
    //       fontFamily: 'arial'
    //   }
    // ,
    detailsText:{
        color: "#1c6161",
        fontSize: 18,
    }


})
