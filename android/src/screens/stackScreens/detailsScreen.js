import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  ScrollView

} from 'react-native';

import Members from '../components/members';
import firestore from "@react-native-firebase/firestore"

DetailsScreen = ({navigation}) => {

  const [admins,setAdmins] = useState();
  const [staff,setStaff] = useState();

  useEffect(()=>{     
    const subscriber = firestore().collection('users').where('role','==','admin').onSnapshot(querySnapshot=>{
        const admins = [];
        querySnapshot.forEach(documentSnapshot=>{
          admins.push({
                ... documentSnapshot.data(),
                key: documentSnapshot.id,
            });            
        });
        setAdmins(admins);
    });

    const subscriber2 = firestore().collection('users').where('role','==','staff').onSnapshot(querySnapshot=>{
      const staff = [];
      querySnapshot.forEach(documentSnapshot=>{
        staff.push({
              ... documentSnapshot.data(),
              key: documentSnapshot.id,
          });            
      });
      setStaff(staff);
  });
    return () => {subscriber2();
                  subscriber();}       
},[]);

useEffect(()=>{     
         
},[])


  return (
     <>    

     <ScrollView >
       <View style={styles.container}>
          <Text style={styles.topics}>
              Admins
          </Text>
          <View style={{flex:2,}}>
          <FlatList
          style={{flex: 1,width:'100%'}}
          data={admins}
          keyExtractor={(item)=>item.key}
          renderItem={({item})=><Members item={item}/>}
          />
          </View>
          <Text style={styles.topics}>
              Staff Members
          </Text>
          <View style={{flex:2}}>
          <FlatList
          style={{flex: 1,width:'100%'}}
          data={staff}
          keyExtractor={(item)=>item.key}
          renderItem={({item})=><Members item={item}/>}
          />
          </View>
        </View>
     </ScrollView>
    </>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    alignItems: "center",

  },
  topics:{
   marginTop: '5%',
   fontSize:20,
   color: "#002926"
  }
});
