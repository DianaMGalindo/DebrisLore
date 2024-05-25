import React, {FunctionComponent, useState, useEffect} from 'react';
import {
View,
Text,
Button,
Alert,
SafeAreaView,
StyleSheet,
ScrollView,
Image,
Modal,
ImageBackground,
TouchableOpacity,
Dimensions,
Pressable} from 'react-native';

//importing global styles
import GlobalStyles from "../../constants/global.style.js";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Divider from '../../components/Divider';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//getting the device's dimensions
const {width, height} = Dimensions.get('window');



// const ProfileScreen = () => {
//
// }; // close HomeScreen

export default function ProfileScreen({navigation}){

const [show, setShow] = useState(false); // State for managing modal visibility

    return (
    <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
     {/* Header section */}
        <ImageBackground style={{flexDirection: 'row', paddingVertical: 25, paddingHorizontal: 15, height: height * 0.18, justifyContent: 'space-between' }} source= {require('../../assets/images/Profile_header_background.png')} resizeMode="cover">
                <View>
                    <Image source={require('../../assets/images/Header_background_single.png')} resizeMode="contain" style={styles.headerBackground}></Image>
                    <Text style={GlobalStyles.headerAlternative}>Profile</Text>
                </View>
                <View>
                <TouchableOpacity
                    style={{width: 50, height: 50, }}
                    onPress={() => navigation.navigate('editProfileScreen')}>
                    <MaterialIcons name="settings" size={35} color="#000000" />
                </TouchableOpacity>
                </View>
        </ImageBackground>

        <View style={{flex:1, position: 'relative', zIndex:0, top: -80,}}>
            {/* Profile picture, name and location */}
            <View style={{alignItems: 'center', paddingBottom: 35}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('editProfileScreen')}>
                    <Image source={require('../../assets/images/Profile_picture.png')} resizeMode="contain" style={{width: 130, height: 130, marginBottom: 20}}></Image>
                </TouchableOpacity>
                <Text style= {[GlobalStyles.headerTitle, {paddingBottom: 10}]}>Diana Milena Galindo</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <MaterialIcons name="location-on" size={20} color="#000000"/>
                    <Text style={GlobalStyles.paragraph}>Location</Text>
                </View>
            </View>
            {/* Your impact */}
            <Text style= {[GlobalStyles.headerTitle, {paddingHorizontal: 15, paddingBottom: 20,textAlign: 'left', fontSize: 18}]}>Your impact</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 35}}>
                <View style={styles.impactContainer}>
                     <Image source={require('../../assets/images/YourImpact_time.png')} resizeMode="contain" style={{width: 40, height: 40, marginBottom: 20}}></Image>
                    <Text style={[GlobalStyles.paragraph, styles.impactTextBold]}>20 min </Text>
                    <Text style={[GlobalStyles.paragraph, styles.impactText]}>invested doing beach surveys</Text>

                </View>
                <View style={styles.impactContainer}>
                    <Image source={require('../../assets/images/YourImpact_items.png')} resizeMode="contain" style={{width: 40, height: 40, marginBottom: 20}}></Image>
                      <Text style={[GlobalStyles.paragraph, styles.impactTextBold]}>8 items</Text>
                      <Text style={[GlobalStyles.paragraph, styles.impactText]}>collected, equivalent to 2g of CO2</Text>
                </View>
                <View style={[styles.impactContainer, {marginRight:0}]}>
                    <Image source={require('../../assets/images/YourImpact_distance.png')} resizeMode="contain" style={{width: 40, height: 40, marginBottom: 20}}></Image>
                     <Text style={[GlobalStyles.paragraph, styles.impactTextBold]}>3 km</Text>
                     <Text style={[GlobalStyles.paragraph, styles.impactText]}>traveled, equivalent to 100 steps </Text>
                </View>
            </View>
            {/* Your achievements */}
            <Text style= {[GlobalStyles.headerTitle, {paddingHorizontal: 15, paddingBottom: 20, textAlign: 'left', fontSize: 18}]}>Your achievements</Text>
            <View style={{marginHorizontal: 15, borderWidth: 2, borderRadius: 10, padding: 15}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                    <Text style={[GlobalStyles.paragraph, {paddingBottom: 20}]}>Badges earned</Text>
                    <Text style={GlobalStyles.paragraph}>2 of 30</Text>
                </View>
                <Divider />
                <View>
                 {/* Achievements badges */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 30}}>
                         <TouchableOpacity
                            onPress={() => setShow(true)}>
                            <Image source={require('../../assets/images/YourAchievements_badge_1.png')} resizeMode="contain" style={{width: 110, height: 110}}></Image>
                         </TouchableOpacity>
                         <Image source={require('../../assets/images/YourAchievements_badge_2.png')} resizeMode="contain" style={{width: 110, height: 110}}></Image>
                         <Image source={require('../../assets/images/YourAchievements_badge_3.png')} resizeMode="contain" style={{width: 110, height: 110}}></Image>
                    </View>
                    {/* Achievement 1 - Modal Screen */}
                    <Modal transparent={true} visible={show}>
                        <View style={{backgroundColor:"#000000aa", flex:1, justifyContent: 'center',}}>
                            <View style={{backgroundColor:"#ffffff", height: 550, alignItems: 'center', margin:50, borderRadius: 20, padding: 15}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{flex:1}}> </Text>
                                <TouchableOpacity
                                    style={{width: 50, height: 50, alignItems: 'right', justifyContent: 'center', marginBottom: 10}}
                                    onPress={() => setShow(false)}>
                                    <MaterialIcons name="close" size={35} color="#000000" />
                                 </TouchableOpacity>
                             </View>

                             <Text style={GlobalStyles.headerTitle}>Plastic Bottle Hero</Text>
                             <Image source={require('../../assets/images/YourAchievements_badge_1.png')} resizeMode="contain" style={{width: 150, height: 150, marginBottom:25}}></Image>
                             <Text style={[GlobalStyles.paragraph, {textAlign: 'center', paddingHorizontal: 10}]}>Congratulations on earning the 'Plastic Bottle Hero' badge! You've excelled in collecting plastic bottles during the surveys. Keep up the excellent work!</Text>
                            </View>
                        </View>
                    </Modal>
                    <Divider />
                     <TouchableOpacity
                        style={[GlobalStyles.primaryButton, {width: "100%", marginTop: 20 }]}
                        onPress={() => navigation.navigate('surveyDetailsScreen')}>
                        <Text style={GlobalStyles.primaryButtonText}>View All</Text>
                     </TouchableOpacity>
                </View>
            </View>
             {/* Background image*/}
            <View style={{alignItems: 'center'}}>
                <Image source={require('../../assets/images/splash_screen_bottom_asset.png')} resizeMode="contain" style={{position: 'absolute', zIndex: -1, width: '100%',  top: -350, opacity: 0.1}}></Image>
            </View>

        </View>
    </ScrollView>

  ); //close return
};//Close ProfileScreen

const styles = StyleSheet.create({
    headerBackground: {
        position: 'absolute',
        top:-18,
        left: -4,
        flex:1,
        width: 100,

    },
    container: {
        height: 300,
        width: 400,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
    },
    impactContainer: {
        width: "30%",
        marginRight: "2%",
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#D9D9D9',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    impactText: {
        textAlign: 'center',
        fontSize: 14
    },
    impactTextBold: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 700
        }
});