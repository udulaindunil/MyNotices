import React ,{useState,useEffect} from 'react'
import {Text,StyleSheet,Button,TouchableOpacity,TextInput,View} from 'react-native'
import { Appbar, } from 'react-native-paper'
import firebase from '@react-native-firebase/database'
import {FlatList} from 'react-native'
import Todos from '../components/Todos'
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'

BookMarkScreen = ({ navigation, route })=> {
 
  const [task,setTask] = useState('');
  const [description,setDescription] = useState('')
  const userId = route.params.userId;
  const db = firebase().ref(`tasks/${userId}`)
  const [tasks,setTasks] = useState([]);

  useEffect(()=>{             
      return db.on('value',(snapshot)=>{
          const list=[];
          snapshot.forEach(doc=>{
              list.push({doc})
          });
          
          console.log() 
          setTasks(list)
      })
  },[])

  async function addTask(){
    db.push({
          task: task,
          description: description,
          complete: false
      })
      setTask('');
      setDescription('');
  }

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
                <Text style={{color:'#fff'}}>My Tasks</Text>
        </View>
      </View>
      <FlatList
          style={{flex: 1,width:'100%'}}
          data={tasks}
          keyExtractor={(item)=>item.key}
          renderItem={({item})=><Todos {...item}/>}
      />

                    <Text>Task</Text>

                        <TextInput  placeholder="Task"
                                    style={styles.textInput}
                                    value={task} onChangeText={setTask}/>
                    
                    <Text>Description</Text>

                        <TextInput  placeholder="Description"
                                    style={styles.textInput}
                                    value={description} onChangeText={setDescription}/>


                        <TouchableOpacity  onPress={()=>{addTask()}} style={[styles.signIn, {borderColor: '#009387',borderWidth: 1,marginTop: 5}]}>   
                            <LinearGradient  colors={['#08d4c4', '#01ab9d']}  style={styles.signIn}  >
                                    <Text style={[styles.textSign, {color:'#fff'}]}>
                                               Add Task
                                    </Text>
                            </LinearGradient>
                        </TouchableOpacity>

      {/* <TextInput label={'new task'} value={task} onChangeText={setTask}/>
      <TextInput label={'Description'} value={description} onChangeText={setDescription}/>
      <Button onPress={()=>{addTask()}}>Add task</Button> */}
      </>
      );
};

export default BookMarkScreen;

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        backgroundColor:'#009387',
        flexDirection: "row"
    },
    signIn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textInput: {
        color: '#05375a',
    },
});