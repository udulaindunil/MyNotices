import React from 'react'
import { View, Text } from 'react-native';
import { List } from 'react-native-paper';
import Swipeout from 'react-native-swipeout';
import firebase from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth';

function Todos({doc}){

    console.log(doc);
    const userId = auth().currentUser.uid;
    console.log(userId);
        

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

    function deleted(key){
        // firebase.database().ref('tasks/').child(doc.key).remove()
        firebase().ref(`tasks/${userId}/${key}`).remove();
    }

    async function toggleComplete(){
        await firebase().ref(`tasks/${userId}`).child(doc.key).update({complete:!doc.val().complete})
    } 

    return(
        <Swipeout {...swipeSettinngs}>

            <List.Item
                title={doc.val().task}
                description={doc.val().description}
                onPress={()=>toggleComplete()}
                left = {props=>(
                    <List.Icon {...props} icon={doc.val().complete ? 'check': 'cancel'}/>
                )}
                />
        </Swipeout>
    );

}

export default Todos;