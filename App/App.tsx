import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

//importing splashScreen
import SplashScreen from 'react-native-splash-screen';


//importing app screens
import OnboardingScreen from './src/navigation/screens/onboardingScreen';
import HomeScreen from './src/navigation/screens/homeScreen';
import MainContainer from './src/navigation/mainContainer';
import HomeStack from './src/navigation/mainContainer';
import SurveyDetailsScreen from './src/navigation/screens/surveyDetailsScreen';
import LiveSurveyScreen from './src/navigation/screens/liveSurveyScreen';
import EditProfileScreen from './src/navigation/screens/editProfileScreen';

//importing navigation handlers
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, useGestureHandlerRef} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();


function App(): React.JSX.Element {
   //Splash Screen
   useEffect(() => {
    SplashScreen.hide();
  }, []);



    //checking if the app has been launched for the first time.
    //If it has been launched for the first time show Onboarding
    //If it has been launched before, don't show Onboarding
    const [isAppFirstLaunched, setAppFirstLaunched] = React.useState(null);
//     React.useEffect(async() => {
//         const appData = await AsyncStorage.getItem("isAppFirstLaunched");
//         if (appData == null) {
//             setAppFirstLaunched(true);
//             AsyncStorage.setItem('isAppFirstLaunched', 'false')
//         } else {
//             setAppFirstLaunched(false);
//         }
//     },[]);
    React.useEffect(() => {
        async function checkAppFirstLaunch() {
            const appData = await AsyncStorage.getItem("isAppFirstLaunched");
            if (appData == null) {
                setAppFirstLaunched(true);
                await AsyncStorage.setItem('isAppFirstLaunched', 'false');
            } else {
                setAppFirstLaunched(false);
            }
        }
        checkAppFirstLaunch();
    }, []);

      return (
       isAppFirstLaunched != null && (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {isAppFirstLaunched && ( <Stack.Screen name="onboardingScreen" component={OnboardingScreen} />)}
                <Stack.Screen name="homeScreen" component={MainContainer}/>
                <Stack.Screen name="surveyDetailsScreen" component={SurveyDetailsScreen}/>
                <Stack.Screen name="liveSurveyScreen" component={LiveSurveyScreen} />
                <Stack.Screen name="editProfileScreen" component={EditProfileScreen} />

            </Stack.Navigator>
        </NavigationContainer>
       )
      );
 };


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
