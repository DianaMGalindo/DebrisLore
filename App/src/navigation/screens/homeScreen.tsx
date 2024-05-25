import React, {FunctionComponent} from 'react';
import {
View,
Text,
Button,
ImageBackground,
Image,
StatusBar,
StyleSheet,
TouchableOpacity,
Dimensions,
Pressable} from 'react-native';

//importing navigation handlers
import 'react-native-gesture-handler';
import OnboardingScreenAsset from '../../assets/images/Onboarding_1.svg';
 //<OnboardingScreenAsset  />

//importing global styles
import GlobalStyles from "../../constants/global.style.js";

//getting the device's dimensions
const {width, height} = Dimensions.get('window');


export default function HomeScreen({navigation}){
    return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
            <StatusBar backgroundColor={'#95D2EF'}/>

                <View style={{height: height * 0.25,flexDirection: 'row', padding: 15}}>
                    <View style={{ width: "35%"}}>
                         <Image source={require('../../assets/images/appicon600x600.png')} resizeMode="contain" style={{flex:1, width: "100%", height:"100%"}}></Image>
                    </View>
                    <View style={styles.containerRight}>
                        <Image source={require('../../assets/images/Header_background.png')} resizeMode="contain" style={styles.headerBackground}></Image>
                        <Text style={GlobalStyles.headerAlternative}> Hello Diana</Text>
                        <Text style={[GlobalStyles.paragraph, {paddingTop: 10}]}> Let's clean up!</Text>
                    </View>
                </View>


                  <View style={GlobalStyles.mainContainer}>
                    <Text style= {[GlobalStyles.headerTitle, {textAlign:"left"}]}>Recent tracking sessions</Text>
                    <View style= {styles.container}>
                        <View style={{flex: 1}}>
                          <Text style={[GlobalStyles.paragraph, {textAlign:"left", height: 150, margin:20}]}>It seems that you haven't registered a survey yet.</Text>
                            <TouchableOpacity
                                  style={[GlobalStyles.primaryButton, {margin: 20,}]}
                                  onPress={() => navigation.navigate('surveyDetailsScreen')}>
                                  <Text style={GlobalStyles.primaryButtonText}>Start Survey</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.supportImageContainer}>
                           <ImageBackground source={require('../../assets/images/Homepage_asset_rubbish.png')} resizeMode="contain" style={{flex:1, }}></ImageBackground>
                           <Text>.</Text>
                        </View>
                    </View>
                  </View>
             <Image source={require('../../assets/images/splash_screen_bottom_asset.png')}
                            resizeMode="contain"
                            style={{ height: '50%', width:'100%', justifyContent: 'flex-end', zIndex: -1, opacity: 0.1 }}>
             </Image>
          </View>
  ); //close return
};//close Home Screen

const styles = StyleSheet.create({
    headerBackground: {
        position: 'absolute',
        top: height * 0.055,
        left: 10,
        flex:1,
        width: "70%"
    },
    containerRight: {
        flex:1,
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        paddingLeft: 10
    },
    container: {
        height: 300,
        width: 400,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
    },
    supportImageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "#95D2EF",
        borderRadius: 10,
    }
});
