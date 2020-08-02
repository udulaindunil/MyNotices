import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity

} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';



ExploreScreen = ({navigation})=> {
  return (
         <View style={styles.container}>
          <Text style={styles.topic}>
                 About Organization
          </Text>

          <View style={styles.content}>
            <Text style={styles.contentText}>
              
              We are the organization that it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </Text>
          </View>
          
          <View>
                <TouchableOpacity
                            style={styles.signIn}
                            onPress={()=>{navigation.navigate("Home")}}
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
          
            
          </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    // justifyContent: "center", 
    alignItems: "center"
  },
  topic:{
    marginTop: '10%',
    color: "#0093a7",
    fontSize: 16,
  },
  content:{
    textAlign:"justify",
    padding: '3%'
  }
  ,
  contentText:{
    color: "#0093a7"
  },
  signIn: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
});