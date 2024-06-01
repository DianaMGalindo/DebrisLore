// **Acknowledgements
// The understanding of the FlatList react native component was informed by the following articles: 
// A deep dive into React Native FlatList: https://blog.logrocket.com/deep-dive-react-native-flatlist/
// FlatList: https://reactnative.dev/docs/flatlist
import React, {FunctionComponent} from 'react';
import {
View,
ScrollView,
Text,
Button,
Alert,
StyleSheet,
TextInput,
Dimensions,
TouchableOpacity,
Pressable} from 'react-native';
import {useEffect} from 'react';

//import form handler
import {useForm, Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';

//importing navigation handlers
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//importing global styles
import GlobalStyles from "../../constants/global.style.js";




export default function SurveyDetailsScreen({navigation}){

    //Form handling
     const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm();
      const onSubmit = data => {
        console.log(data);
      };

      const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        return console.log(errors)
      };

    return (
          <ScrollView style={{flex: 1, backgroundColor: '#ffffff', padding: 20}}>

                <TouchableOpacity
                    style={{width: 50, height: 50, backgroundColor: "transparent"}}
                    onPress={() => navigation.goBack()}>
                    <MaterialIcons name="chevron-left" size={45} color="#000000" />
                </TouchableOpacity>
                <Text style= {[GlobalStyles.headerTitle, {textAlign:"center"}]}>Survey details</Text>

              <Text style={[GlobalStyles.paragraph, {textAlign:"center", paddingBottom: 40}]}>Tell us about who you are with and where you are. This is key to match the location you are in with the data you collect.</Text>

              <View style={{paddingBottom: 40}}>
              <Text style= {[GlobalStyles.headerTitle, {textAlign:"left", fontSize: 18}]}>Survey team</Text>


                    {/* Group name input field */}
                      <Text style={GlobalStyles.paragraph}>Group name/ organization</Text>
                      <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                          <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder={"Enter your group name"}
                          />
                        )}
                        name="group"
                        rules={{ required: true }}
                      />

                    {/* Number of participants input field */}
                      <Text style={GlobalStyles.paragraph}>Number of participants</Text>
                      <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                          <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder={"Enter the number of participants"}
                          />
                        )}
                        name="participantsNumber"
                        rules={{ required: true }}
                      />
              </View>
              <View  style={{paddingBottom: 40}}>

                      <Text style= {[GlobalStyles.headerTitle, {textAlign:"left", fontSize: 18}]}>Survey site information</Text>
                      {/* Location input field */}
                      <Text style={GlobalStyles.paragraph}>Location</Text>
                          <Controller
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => (
                              <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholder={"Enter your Location"}
                              />
                            )}
                            name="location"
                            rules={{ required: true }}
                      />
                      {/* Weather and season dropdowm */}
                      <Text style={GlobalStyles.paragraph}>Weather and season</Text>
                          <Controller
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => (
                              <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholder={"Enter your Location"}
                              />
                            )}
                            name="weatherAndSeason"
                            rules={{ required: true }}
                      />
                       {/* Substratum type dropdowm */}
                      <Text style={GlobalStyles.paragraph}>Substratum type</Text>
                      <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                  <Picker
                                    style={styles.input}
                                    onBlur={onBlur}
                                    selectedValue={value}
                                    onValueChange={(value) => onChange(value)}
                                  >
                                    <Picker.Item label="Select the substratum type of the beach" value="" />
                                    <Picker.Item label="Gravel" value="Gravel" />
                                    <Picker.Item label="Mud and Clay" value="Mud and Clay" />
                                    <Picker.Item label="Mixed substrate" value="Mixed substrate" />
                                    <Picker.Item label="Sand" value="Sand" />
                                    <Picker.Item label="Pebbles and Shingle" value="Pebbles and Shingle" />

                                  </Picker>
                                )}
                                name="substratum"
                                rules={{ required: true }}
                      />
                      {/* Access to beach dropdowm */}
                      <Text style={GlobalStyles.paragraph}>Access to the place</Text>
                          <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <Picker
                            style={styles.input}
                            onBlur={onBlur}
                            selectedValue={value}
                            onValueChange={(value) => onChange(value)}
                            >
                            <Picker.Item label="How did you reach the beach?" value="" />

                            <Picker.Item label="Driving" value="Driving" />
                            <Picker.Item label="Public transport" value="Public transport" />
                            <Picker.Item label="On foot" value="On foot" />
                            </Picker>
                            )}
                            name="accessToBeach"
                            rules={{ required: true }}
                      />

                      {/* Type of environment dropdowm */}
                     {/* <Text style={GlobalStyles.paragraph}>Type of environment</Text>
                          <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <Picker
                            style={styles.input}
                            onBlur={onBlur}
                            selectedValue={value}
                            onValueChange={(value) => onChange(value)}
                            >
                            <Picker.Item label="Predominant environment" value="" />
                            <Picker.Item label="Rocky" value="Rocky" />
                            <Picker.Item label="Sandy" value="Sandy" />
                            </Picker>
                            )}
                            name="typeOfEnvironment"
                            rules={{ required: true }}
                      /> */}
                      {/* Major usage dropdown */}
                      <Text style={GlobalStyles.paragraph}>Main usage</Text>
                          <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <Picker
                            style={styles.input}
                            onBlur={onBlur}
                            selectedValue={value}
                            onValueChange={(value) => onChange(value)}
                            >
                            <Picker.Item label="Main usage of the beach" value="" />
                            <Picker.Item label="Tourism" value="Tourism" />
                            <Picker.Item label="Habitat for Wildlife" value="Habitat for Wildlif" />
                            <Picker.Item label="Fishing" value="Fishing" />
                            </Picker>
                            )}
                            name="typeOfEnvironment"
                            rules={{ required: true }}
                      />
                      {/*<View style={styles.button}>
                        <Button
                          style={styles.buttonInner}
                          color
                          title="Reset"
                          onPress={() => {
                            reset({
                              group: 'jane@example.com',
                              participantsNumber: '****',
                              location: 'Find your location',
                              weatherAndSeason: 'placeholder',
                              substratum: 'placeholder',
                              accessToBeach: 'placeholder',

                            })
                          }}
                        />
                      </View>*/}
                      {/*}<View style={{flex: 1}}>
                        <TouchableOpacity
                            style={[GlobalStyles.primaryButton, {margin: 20, height: 35}]}
                            onPress={handleSubmit(onSubmit)}>
                            <Text style={GlobalStyles.primaryButtonText}>Submit</Text>
                        </TouchableOpacity>

                      </View> */}
              </View>


                    <View style={{ height: 120, width: "100%", marginBottom: 30}}>
                        <TouchableOpacity
                            style={[GlobalStyles.primaryButton, {marginBottom:40, height: 20}]}
                            onPress={() => {
                                handleSubmit(onSubmit)();
                                navigation.navigate('liveSurveyScreen');}}>
                            <Text style={GlobalStyles.primaryButtonText}>Submit and start Live Survey</Text>
                        </TouchableOpacity>
                    </View>



          </ScrollView>
  ); //close return
};//Close SurveyDetailsScreen

const styles = StyleSheet.create({

  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
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
