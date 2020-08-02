import React,{useContext} from 'react';
import {View} from 'react-native';

import { UserDetails } from '../../../contextFiles/userDetailsContext';
import {AdminDrawerContent} from '../screens/drawerScreens/adminDrawerContent'
import {StaffDrawerContent} from '../screens/drawerScreens/staffDrawerContent'

export function DrawerContent(props){

       
    const userDetails = useContext(UserDetails);
  
    if(userDetails.role=='admin'){
        return (
            <>
               <AdminDrawerContent {...props}/>
            </>
        );
    }else{
        return (
            <>
                <StaffDrawerContent {...props}/>
            </>
        )
    }
}



export default DrawerContent;