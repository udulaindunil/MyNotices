import React,{useState,useEffect,useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList, Image

} from 'react-native';

import firestore from "@react-native-firebase/firestore"
import { UserDetails } from '../../../../contextFiles/userDetailsContext';
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient';
import ImageNotice from '../components/ImageNotice';
import Icon from 'react-native-vector-icons/Ionicons'



NoticeImageScreen = ({navigation,route})=> {
   
    const id = route.params.key;
    const [notice,setNotice] = useState('')
    const [imageUrl,setImageUrl] = useState('')

    const swipeSettinngs={
        autoClose:true,
        right:[{
            onPress: ()=>{
                deleted(doc.key)
            },
            type: 'Delete',
            text: 'Delete'
        }]
    }



  const userDetails = useContext(UserDetails);

  useEffect(()=>{     
    let status = 'active'
    let temp;
    const tempNotice =firestore().collection('notices').doc(id).get().then(res=>{
      setNotice(res.data())
    })
       return(()=>{
         setNotice('');
       }) 
    },[id])

  return (
    <>
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
      <Text style={{color:'#fff',fontSize:26, fontWeight:"bold"}}>Notice</Text>
      </View>

          
      </View>
      <View style={styles.container}>
        <View>
         
         <ImageNotice notice={notice} navigation={navigation}/>

          
        </View>
        
      </View>

    </>
  );
};

export default NoticeImageScreen;

const styles = StyleSheet.create({
  header:{
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 26,
    backgroundColor:'#009387',
    flexDirection: "row"
},
  container:{
    width:'100%',
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#fff"
  },
  textComment:{
    fontSize: 18,
    color: "#01423d"
  },
  commentElement:{
    margin:5,
    padding:5,
    backgroundColor: "#52aba4",
    borderRadius: 8
  },
  comment: {
    flex: 1,
    fontSize: 16,
    color:'#013636',
    padding:10,
    alignContent: "center",
    textAlign: "justify",
  },
  intro:{
    alignContent: "flex-end"
  },
  details: {
    flex: 1,
    flexDirection: 'row', 
    padding:10,
    justifyContent: 'space-between',
  },
  detailsText:{
    color: "#1c6161"
    }
});