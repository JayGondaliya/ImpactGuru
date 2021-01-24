import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import HomeContainer from '../Containers/HomeContainer';
import ProgramDetailContainer from '../Containers/ProgramDetailContainer';

export const BASE_STACK = createStackNavigator();
export default function BASE_STACK_NAVIGATION({navigation}) {
    return(
        <NavigationContainer>
            <BASE_STACK.Navigator headerMode={'none'} initialRouteName={'Home'}>
                <BASE_STACK.Screen name={'Home'} component={HomeContainer} />
                <BASE_STACK.Screen name={'Detail'} component={ProgramDetailContainer} />
            </BASE_STACK.Navigator>
        </NavigationContainer>
    )
}