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
import Notice from '../components/Notice'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';



NoticeHistoryScreen = ({navigation})=> {

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

  const [notices,setNotices] = useState()

  useEffect(()=>{     
      let status = 'active'
    const subscriber = firestore().collection('notices').where('uid','==',userDetails.userId).where('state','==',"deleted").onSnapshot(querySnapshot=>{
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
        <Text style={{color:'#fff',fontSize:26, fontWeight:"bold"}}>Notices History</Text>
        </View>

      </View>

    <View style={styles.container}>

    <FlatList
    style={{width:'100%'}}
    data={notices}
    keyExtractor={(item)=>item.key}
    renderItem={({ item }) => (<Notice item={item} navigation={navigation} history={true}/>)}
    />
    
    </View>
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
  </>
  );
};

export default NoticeHistoryScreen;

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
  b:{
   color:"blue"
  },
  intro:{
    alignContent: "flex-end"
  }
});