// **Acknowledgements
//This is where I handle the routing of the application. The implementation of routing and bottom tab navigation was informed 
//by the following resources: 
//Bottom Navigation Bar Tutorial in React Native: https://www.youtube.com/watch?v=AnjyzruZ36E
//Hide Bottom Tab on Specific Screen in React Native Typescript: https://www.youtube.com/watch?v=oqPrCiZyUEs
//React Native Stack and Tab Navigator: https://www.youtube.com/watch?v=s7ackFpN-GU

import React, {FunctionComponent} from 'react';
import {
View,
Text,
Button,
Alert,
SafeAreaView,
Pressable} from 'react-native';

//importing icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import Ionicons from 'react-native-vector-icons/Ionicons';

//importing navigation handlers
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//importing App screens
import HomeScreen from './screens/homeScreen';
import ProfileScreen from './screens/profileScreen';
import SurveysScreen from './screens/surveysScreen';
import StartSurveyScreen from './screens/startSurveyScreen';
import SurveyDetailsScreen from './screens/surveyDetailsScreen';
import LiveSurveyScreen from './screens/liveSurveyScreen';


//Creating navigator labels for each screen on the menu
const homeLabel = 'Home';
const surveysLabel = 'Surveys';
const profileLabel = 'Profile';
const startSurveyLabel = 'Track';

//create bottom navigator for menu
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function HomeStack() {
 return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="homeScreen" component={HomeScreen}/>
        <Stack.Screen name="surveyDetailsScreen" component={SurveyDetailsScreen}/>
        <Stack.Screen name="liveSurveyScreen" component={LiveSurveyScreen} />
    </Stack.Navigator>
 );
};

export default function MainContainer(){
    return(
        <Tab.Navigator
            initialRouteName={homeLabel}
            screenOptions={
            ({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if(rn === homeLabel) {
                        iconName = focused ? 'add-home' : 'add-home';
                    } else if (rn === surveysLabel){
                        iconName = focused ? 'add-home' : 'add-home';
                    } else if (rn === profileLabel) {
                        iconName = focused ? 'person' : 'person';
                    } else if (rn === startSurveyLabel){
                        iconName = focused ? 'crop-free': 'crop-free';
                    }

                    return <MaterialIcons name ={iconName} size= {size} color={color} />
                    },
                     "tabBarActiveTintColor": '#000000',
                     "tabBarInactiveTintColor": '#ffffff',
                     "tabBarLabelStyle": {"paddingBottom": 20, "fontSize": 14 },
                     "tabBarStyle":[
                        {backgroundColor: '#798BC5', padding: 10, height: 100},
                        null
                     ]
                    })
            }
        >

                <Tab.Screen name={homeLabel}
                component={HomeScreen}
                options={{ headerShown: false }}/>

                <Tab.Screen name={startSurveyLabel}
                component={SurveyDetailsScreen}
                options={{ headerShown: false }}/>


                <Tab.Screen name={surveysLabel}
                component={SurveysScreen}
                options={{ headerShown: false }}/>

                <Tab.Screen name={profileLabel}
                component={ProfileScreen}
                options={{ headerShown: false }}/>
        </Tab.Navigator>
    );

};
