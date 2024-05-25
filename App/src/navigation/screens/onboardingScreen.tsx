import React from 'react';
import {SafeAreaView, StyleSheet, Dimensions, Text, FlatList, View, Image, StatusBar, TouchableOpacity, ImageBackground} from 'react-native';
import HomeScreen from '/homeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//importing styles from Global styles
import GlobalStyles from "../../constants/global.style.js";


//getting the device's dimensions
const {width, height} = Dimensions.get('window');

const COLORS = {white: '#ffffff'};

//creating the onboarding slides
const slides = [
 {
    id: '1',
    image: require('../../assets/images/Onboarding_Screen_1.png'),
    imageSupport: require('../../assets/images/Support_asset_ob_1.png'),
    imageSupportTwo: require('../../assets/images/Support_asset_two_ob_1.png'),
    title: 'Be part of people powered research',
    description: 'Dive into a community effort! Your contribution fuels our mission to gather impactful data for cleaner beaches. Together, we make a real difference.',},
 {
    id: '2',
    image: require('../../assets/images/Onboarding_Screen_2_v2.png'),
    imageSupport: require('../../assets/images/Support_asset_two_ob_2_v2.png'),
    imageSupportTwo: require('../../assets/images/Support_asset_two_ob_2_wrapper_v2.png'),
    title: 'Track Debris',
    description: 'Embrace cutting-edge tech! We\'ve integrated object detection to streamline debris sorting, making your cleanup journey more efficient and empowering.',},
{
    id: '3',
    image: require('../../assets/images/Onboarding_Screen_3_v7.png'),
    imageSupport: require('../../assets/images/Support_asset_ob_3_spray.png'),
    imageSupportTwo: require('../../assets/images/Support_asset_two_ob_3.png'),
    title: 'Allow location and camera services',
    description: 'Camera access fuels precise object detection, while location services pinpoint cleanup hotspots. Rest assured, we prioritize your privacy and security every step of the way.',},

];

// Creating the Slide element that will go in the FlatList. It takes elements from the slides const
const Slide = ({item}) => {
    return (
        <View style = {{alignItems: 'center'}}>
            <Image source={item.imageSupport} style={{ width: 90, height:90, position:'absolute', zIndex: 1, bottom: 32, left: 10}}></Image>
            <View style ={{position: 'relative', zIndex: 0}}>
            <ImageBackground source={item.image} resizeMode="contain" style={{height: "86%", width}}></ImageBackground>
            <Image source={item.imageSupportTwo} style={{ width: 90, height:90, position:'absolute', zIndex: 2, top: 28, right: 10}}></Image>
            </View>

            <View style={{ width: 350, height: 200, backgroundColor: 'transparent', position: 'relative', zIndex:2, bottom: 220, alignItems: 'center',  justifyContent: 'center',}}>
                <Text style ={GlobalStyles.headerTitle}> {item.title}</Text>
                <Text style ={[GlobalStyles.paragraph, { textAlign: 'center'}]}>{item.description}</Text>
            </View>
        </View>

    );
};



const OnboardingScreen = ({navigation}) => {

//Checking current state of slider
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef(null)

// Indicators container
    const Footer = () => {
        return (
        <View style={{
                height: height * 0.20,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                backgroundColor: 'transparent',
                }}>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop:20,
                }}>
                {slides.map((_, index) => (
                    <View key={index} style={[styles.indicator, currentSlideIndex == index && {
                        backgroundColor: '#000000',
                        width: 25
                    }]}/>
                ))}
            </View>

            <View style={{marginBottom: 20, }}>
                {
                    currentSlideIndex == slides.length - 1 ?
                    <View style={{height: 80}}>
                     <TouchableOpacity
                        style={[GlobalStyles.primaryButton]}
                        onPress={() => navigation.replace('homeScreen')} >

                        <Text style={{fontWeight: 'bold', fontSize: 16, color: '#000000'}}>Start</Text>
                     </TouchableOpacity>
                    </View> :

                    <View style={{flexDirection: 'row',}}>
                        <TouchableOpacity
                            style={[GlobalStyles.primaryButton, {backgroundColor: 'transparent', textAlign: 'center', borderWidth: 2, borderColor: '#CDCFD5'}]}
                            onPress={skipOnboarding}
                            >
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>Skip</Text>
                        </TouchableOpacity>
                        <View style={{width: 15}} />
                         <TouchableOpacity style={[GlobalStyles.primaryButton]} onPress={goNextSlide}>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#000000'}}>Next</Text>
                         </TouchableOpacity>
                     </View>
                }



            </View>

        </View>

        );
    };

//Set current Index to the indicator based on Horizontal scroll offsets
    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX/width);
        setCurrentSlideIndex(currentIndex);
        //console.log(contentOffsetX);
        //console.log(currentIndex);
    };

// Control the slider with the buttons
    const goNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
       //if exceeds the existing number of slides, stop updating
        if(nextSlideIndex != slides.length){
         const offset = nextSlideIndex * width;
            ref?.current?.scrollToOffset({offset});
            setCurrentSlideIndex(nextSlideIndex);
        };
    };

// Skip the onboarding with Skip button
    const skipOnboarding = () => {
        const lastSlideIndex = slides.length - 1;
        //console.log(lastSlideIndex);
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({offset});
        setCurrentSlideIndex(lastSlideIndex);
    };

// Rendered Slides
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <StatusBar backgroundColor={'#95D2EF'}/>
            <FlatList
            ref={ref}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            pagingEnabled
            data = {slides}
            contentContainerStyle={{height: height * 0.85}}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <Slide item={item} />}
            />
            <Footer />
        </SafeAreaView>);
};
const styles = StyleSheet.create({
    indicator: {
        height: 15,
        width: 15,
        backgroundColor: '#CDCFD5',
        marginHorizontal: 10,
        borderRadius: 10,
    },
});

export default OnboardingScreen;