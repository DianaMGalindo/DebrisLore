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



export default function SurveysScreen({navigation}){
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View>
              <Text
              onPress={() => navigation.navigate('Home')}> This is surveys screen
              </Text>

          </View>
      </SafeAreaView>
  ); //close return
};//Close ProfileScreen