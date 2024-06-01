// **Acknowledgements
//Just like the 'startSurveyDetailsScreen', this section of the app also deals with input forms, data retrieval, and Flatlist.
// The understanding of Flatlist was informed by the following articles:
// A deep dive into React Native FlatList: https://blog.logrocket.com/deep-dive-react-native-flatlist/
// FlatList: https://reactnative.dev/docs/flatlist
import React, {FunctionComponent} from 'react';
import {
View,
Text,
StyleSheet,
Dimensions,
Image,
TextInput,
ImageBackground,
ScrollView,
TouchableOpacity,
Pressable} from 'react-native';

//import form handler
import {useForm, Controller} from 'react-hook-form';

//importing material icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//importing global styles
import GlobalStyles from "../../constants/global.style.js";
//getting the device's dimensions
const {width, height} = Dimensions.get('window');

export default function EditProfileScreen({navigation}){

    //Form handling
     const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm();
      const onSubmit = data => {
        console.log(data);
      };

      const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        return console.log(errors)
      };

    return (
    <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <ImageBackground style={{flexDirection: 'row', paddingVertical: 25, paddingHorizontal: 15, height: height * 0.18, justifyContent: 'space-between' }} source= {require('../../assets/images/Profile_header_background.png')} resizeMode="cover">
            <TouchableOpacity
                style={{width: 50, height: 50, backgroundColor: "transparent"}}
                onPress={() => navigation.goBack()}>
                <MaterialIcons name="chevron-left" size={45} color="#000000" />
            </TouchableOpacity>
            <View>
                <Text style={GlobalStyles.headerAlternative}>Edit profile</Text>
            </View>
        </ImageBackground>

        <View style={{flex:1, position: 'relative', zIndex:0, top: -80,  paddingHorizontal: 15,}}>
            {/* Profile picture, name and location */}
            <View style={{alignItems: 'center', paddingBottom: 35}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('editProfileScreen')}>
                    <Image source={require('../../assets/images/Profile_picture.png')} resizeMode="contain" style={{width: 130, height: 130, marginBottom: 20}}></Image>
                </TouchableOpacity>
            </View>
            {/* Updating First name */}
            <Text style={GlobalStyles.paragraph}>First name</Text>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder={"Enter your first name"}
                        />
                    )}
                    name="updateFirstName"
                    rules={{ required: true }}
            />
            {/* Updating Last name */}
            <Text style={GlobalStyles.paragraph}>Last name</Text>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder={"Enter your first name"}
                        />
                    )}
                    name="updateLastName"
                    rules={{ required: true }}
            />
            {/* Updating email */}
            <Text style={GlobalStyles.paragraph}>Email</Text>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder={"Update your email"}
                        />
                    )}
                    name="updateEmailAddress"
                    rules={{ required: true }}
            />
            {/* Updating country */}
            <Text style={GlobalStyles.paragraph}>Country</Text>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder={"Enter the country you are currently in"}
                        />
                    )}
                    name="updateCountry"
                    rules={{ required: true }}
            />
            {/* Updating city */}
            <Text style={GlobalStyles.paragraph}>City</Text>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder={"Enter the city you are currently in"}
                        />
                    )}
                    name="updateCity"
                    rules={{ required: true }}
            />
            <View style={{ height: 120, width: "100%", marginVertical: 30}}>
                <TouchableOpacity
                    style={[GlobalStyles.primaryButton, {marginBottom:40, height: 20}]}
                    onPress={() => {
                    handleSubmit(onSubmit)();}}>
                    <Text style={GlobalStyles.primaryButtonText}>Update Information</Text>
                </TouchableOpacity>
            </View>

           {/* Background image*/}
            <View style={{alignItems: 'center'}}>
                <Image source={require('../../assets/images/splash_screen_bottom_asset.png')} resizeMode="contain" style={{position: 'absolute', zIndex: -1, width: '100%',  top: -350, opacity: 0.1}}></Image>
            </View>

        </View>

    </ScrollView>
  ); //close return
};//Close StartSurveyScreen

const styles = StyleSheet.create({
    headerBackground: {
        position: 'absolute',
        top:-18,
        left: -4,
        flex:1,
        width: 100,
    },
     input: {
        backgroundColor: '#E7F2F6',
        borderColor: '#ffffff',
        height: 70,
        borderRadius: 4,
        padding: 15,
        borderRadius: 4,
        marginBottom:20
      },
});
