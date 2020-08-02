import React,{useState,useEffect,useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList

} from 'react-native';

import firestore from "@react-native-firebase/firestore"
import { UserDetails } from '../../../../contextFiles/userDetailsContext';
import  PublicNotices  from '../components/publicNotices';


HomeScreen = ({navigation})=> {

  const userDetails = useContext(UserDetails);

  const [notices,setNotices] = useState()

  useEffect(()=>{     
    const subscriber = firestore().collection('notices').where('state','==','active').onSnapshot(querySnapshot=>{
        const notices = [];
        querySnapshot.forEach(documentSnapshot=>{
          notices.push({
                ... documentSnapshot.data(),
                key: documentSnapshot.id,
            });            
        });
        setNotices(notices);
    });
    return () => subscriber();       
},[])


  return (
    <>
    <FlatList
    data={notices}
    keyExtractor={(item)=>item.key}
    renderItem={({ item }) => (<PublicNotices item={item} navigation={navigation}/>)}
    />
  </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  a:{
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },
  b:{
   color:"blue"
  }
});