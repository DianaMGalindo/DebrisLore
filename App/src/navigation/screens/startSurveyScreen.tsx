import React, {FunctionComponent} from 'react';
import {
View,
Text,
Button,
Alert,
SafeAreaView,
Pressable} from 'react-native';

//importing navigation handlers
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator } from '@react-navigation/native-stack';

export default function StartSurveyScreen({navigation}){
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View>
               <Button
                    title="Live survey screen"
                    onPress={() => navigation.navigate('liveSurveyScreen')}/>

          </View>
      </SafeAreaView>
  ); //close return
};//Close StartSurveyScreen