import React, {FunctionComponent, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useMemo, useState} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

import Timer from '../../components/Timer.tsx';

//importing global styles
import GlobalStyles from '../../constants/global.style.js';

//importing navigation handlers
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useIsFocused, useNavigation} from '@react-navigation/native';
//importing tflite model
import {
  useTensorflowModel,
  Tensor,
  TensorflowModel,
} from 'react-native-fast-tflite';
//importing camera permissions and lifecycle handlers
import type {CameraProps} from 'react-native-vision-camera';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  useFrameProcessor,
  getAvailableCameraDevices,
  useCameraFormat,
  runAtTargetFps,
  NoCameraDeviceError,
  useSkiaFrameProcessor,
  PhotoFile,
} from 'react-native-vision-camera';
import {useAppState} from '@react-native-community/hooks';
import {Skia, SkRect, Canvas, Rect} from '@shopify/react-native-skia';
import type {GestureResponderEvent} from 'react-native';
import Animated, {
  runOnJS,
  useSharedValue,
  useDerivedValue,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
} from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


//importing frame processor resize plugin
import {useResizePlugin, resize} from 'vision-camera-resize-plugin';

//Code to print to understand the Tensor Inputs and Outputs of the model
function tensorToString(tensor: Tensor): string {
  return `\n  - ${tensor.dataType} ${tensor.name}[${tensor.shape}]`;
}
function modelToString(model: TensorflowModel): string {
  return (
    `TFLite Model (${model.delegate}):\n` +
    `- Inputs: ${model.inputs.map(tensorToString).join('')}\n` +
    `- Outputs: ${model.outputs.map(tensorToString).join('')}`
  );
}

const AnimatedText = Animated.createAnimatedComponent(Text);

export default function LiveSurveyScreen({navigation}) {

//Managing the timer
const timerRef = useRef(null);

 const handleFinishSurvey = () => {
     if (timerRef.current) {
       timerRef.current.stopTimer();
     }
     navigation.navigate('homeScreen');
   };

  //Bottom sheet where findings will be shown
  const snapPoints = useMemo(() => ['25%', '50%', '70%', '100%'], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={2}
        disappearsOnIndex={0}
        {...props}
      />
    ),
    [],
  );

  //Setting up camera
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });
  const camera = useRef<Camera>(null);

  //Requesting permission to use camera
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);
  //Lifecycle of the camera
  const isFocused = useIsFocused();
  const appState = useAppState();
  const cameraIsActive = isFocused && appState === 'active';
  console.log('The camera is active on this screen:', cameraIsActive);

  //focusing the camera
  const focus = useCallback((point: Point) => {
    const c = camera.current;
    if (c == null) return;
    c.focus(point);
  }, []);

  const gesture = Gesture.Tap().onEnd(({x, y}) => {
    runOnJS(focus)({x, y});
  });
  if (device == null) return <NoCameraDeviceError />;

  //Camera format
  const format = useCameraFormat(device, [{fps: 30}]);

  const objectDetection = useTensorflowModel(
    require('../../assets/model/ssd_mobilenet_v2_fineTune_copy.tflite'),
  );
  const model =
    objectDetection.state === 'loaded' ? objectDetection.model : undefined;

  React.useEffect(() => {
    if (model == null) return;
    console.log(`Model loaded! Shape:\n${modelToString(model)}]`);
  }, [model]);

  //Has the user taken a photo?
  const [photo, setPhoto] = useState<PhotoFile>();
  const [processFrames, setProcessFrames] = useState(false);
  const [capturedObjects, setCapturedObjects] = useState({ count: 0, names: [] });

  //possible classes
  const labels = {
    0: 'Cardboard',
    1: 'Plastic Bottle',
//     2: 'bicycle',
//     3: 'car',
//     4: 'motorcycle',
//     5: 'airplane',
//     6: 'bus',
//     7: 'train',
//     8: 'truck',
//     9: 'boat',
//     10: 'traffic light',
//     11: 'fire hydrant',
//     12: 'stop sign', // Adding missing label for class 12
//     13: 'stop sign',
//     14: 'parking meter',
//     15: 'bench',
//     16: 'bird',
//     17: 'cat',
//     18: 'dog',
//     19: 'horse',
//     20: 'sheep',
//     21: 'cow',
//     22: 'elephant',
//     23: 'bear',
//     24: 'zebra',
//     25: 'giraffe',
//     26: 'backpack', // Adding missing label for class 26
//     27: 'backpack',
//     28: 'umbrella',
//     29: 'handbag', // Adding missing label for class 29
//     30: 'tie', // Adding missing label for class 30
//     31: 'handbag',
//     32: 'tie',
//     33: 'suitcase',
//     34: 'frisbee',
//     35: 'skis',
//     36: 'snowboard',
//     37: 'sports ball',
//     38: 'kite',
//     39: 'baseball bat',
//     40: 'baseball glove',
//     41: 'skateboard',
//     42: 'surfboard',
//     43: 'tennis racket',
//     44: 'bottle',
//     45: 'wine glass', // Adding missing label for class 45
//     46: 'wine glass',
//     47: 'cup',
//     48: 'fork',
//     49: 'knife',
//     50: 'spoon',
//     51: 'bowl',
//     52: 'banana',
//     53: 'apple',
//     54: 'sandwich',
//     55: 'orange',
//     56: 'broccoli',
//     57: 'carrot',
//     58: 'hot dog',
//     59: 'pizza',
//     60: 'donut',
//     61: 'cake',
//     62: 'chair',
//     63: 'couch',
//     64: 'potted plant',
//     65: 'bed',
//     66: 'dining table', // Adding missing label for class 66
//     67: 'dining table',
//     68: 'toilet',
//     69: 'tv',
//     70: 'toilet',
//     71: 'tv',
//     72: 'laptop',
//     73: 'mouse',
//     74: 'remote',
//     75: 'keyboard',
//     76: 'cell phone',
//     77: 'microwave',
//     78: 'oven',
//     79: 'toaster',
//     80: 'sink',
//     81: 'refrigerator',
//     82: 'book',
//     83: 'book',
//     84: 'clock',
//     85: 'vase',
//     86: 'scissors',
//     87: 'teddy bear',
//     88: 'hair drier',
//     89: 'toothbrush',
//     90: 'toothbrush',
  };

  //Managing States
  const {resize} = useResizePlugin();
  const [detectedObjects, setDetectedObjects] = useState(0);
  const [nameObjects, setNameObjects] = useState([]);
  //const uniqueDetectedObjects = useSharedValue(0);

  // useDerivedValue to read the shared value. This value reads from the useSharedValue
//   const detectedObjectsText = useDerivedValue(() => {
//     return `Total unique detected objects: ${uniqueDetectedObjects.value}`;
//   });
// bridge the execution context between Reanimated worklets and the regular JavaScript (JS) execution environment
//   const handleUniqueObjects = Worklets.createRunOnJS((totalValues: number) => {
//     //uniqueDetectedObjects.value = totalValues;
//     setDetectedObjects(totalValues)
//   });
//
//   const nameUniqueObjects = Worklets.createRunOnJS((totalValue: string[]) => {
//                                 //uniqueDetectedObjects.value = totalValues;
//                                 setNameObjects(totalValue)
//                               });

 const handleModelOutput = Worklets.createRunOnJS((modelOutputQuantityData: number, modelOutputQuantityClasses: string[] ) => {
    setDetectedObjects(modelOutputQuantityData)
    setNameObjects(modelOutputQuantityClasses)
    //console.log(modelOutputData)
 });
  //Frame Processor.
  const frameProcessor = useFrameProcessor(
    frame => {
      //if I get error on camera, switch back to useFrameProcessor(frame => {}) with single parentesis
      'worklet';

      if (model == null || !processFrames) return;
      const start = performance.now();
      //Resizing input camera data and converting to RGB
      const resized = resize(frame, {
        scale: {
          width: 320,
          height: 320,
        },
        pixelFormat: 'rgb',
        dataType: 'float32',
      });

      //Run model with given input buffer synchronously
      const output = model.runSync([resized]);
      //Interpret outputs accordingly
//       const detection_boxes = output[0];
//       const detection_classes = output[1];
//       const detection_scores = output[2];
//       const num_detections = output[3];

       const detection_scores = output[0]; // Number of detections
       const detection_boxes = output[1]; // Detection boxes
       const num_detections = output[2]; // Detection classes
       const detection_classes = output[3]; // Detection boxes

       //console.log("Model outputs:", output);
       //console.log("Number of detections:", num_detections);
       //console.log("Detection scores:", detection_scores);
       //console.log("Detection boxes:", detection_boxes);
       //console.log("Detection classes:", detection_classes);

      const uniqueDetectedObjects = new Set();

      for (let i = 0; i < num_detections; i++) {
        const confidence = detection_scores[i / 4];
        if (confidence > 0.5) {
          const classNumber = detection_classes[i];
          const className =
            labels[classNumber] || `Unknown Class (${classNumber})`;

          // Check if this object is already in the set
          if (!uniqueDetectedObjects.has(className)) {
            // If not, add it to the set and increment the counter
            uniqueDetectedObjects.add(className);
            //totalUniqueDetectedObjects++;

            console.log(`Detected Objects: ${className}`);
          }
        }
      }

       const objectsArray = Array.from(uniqueDetectedObjects)
       console.log(objectsArray)
      // Print the total number of unique detected objects
      //         console.log(
      //           `Total number of unique detected objects: ${totalUniqueDetectedObjects}`,);
      console.log(uniqueDetectedObjects.size);
      //runOnJS(handleUniqueObjects)(uniqueDetectedObjects.size);
      //handleUniqueObjects(uniqueDetectedObjects.size);
      //nameUniqueObjects(objectsArray);
      handleModelOutput(uniqueDetectedObjects.size, objectsArray)
    },
    [model, processFrames, handleModelOutput]
  );

  //   const handleUniqueObjects = (uniqueObjectCount) => {
  //     totalUniqueDetectedObjects.value = uniqueObjectCount;
  //     console.log(`Detected unique objects: ${uniqueObjectCount}`)
  //   };

  //Starting inference and then taking photo
  const onTakePicturePressed = async () => {
    //             const photo = await camera.current?.takePhoto();
    //             const result = await fetch(`file://${photo.path}`)
    //             const data = await result.blob();
    //             setPhoto(photo);
    //             console.log(data)
    setProcessFrames(true); // Start processing frames when the button is pressed
    setTimeout(async () => {
      // Wait for 6 seconds
      // Take the photo after 6 seconds
      const photo = await camera.current?.takePhoto();
      const result = await fetch(`file://${photo.path}`);
      const data = await result.blob();
      setPhoto(photo);
      console.log(data);
      setCapturedObjects({ count: detectedObjects, names: nameObjects }); // Capture the state
      setProcessFrames(false); // Stop processing frames
    }, 4000); // 4000 milliseconds = 4 seconds
  };

  const onRetakePressed = () => {
    setPhoto(null); //Reset the photo state
    setProcessFrames(false); //reset the frame processing
    //setDetectedObjects(0);// reset count
    //setNameObjects([]);
    setCapturedObjects({ count: 0, names: [] }); // Reset captured objects
  };
  //     const devices = Camera.getAvailableCameraDevices();
  //     console.log(devices);

  //*******************************************
  //if the user hasn't granted permission display
  if (!hasPermission) {
    return <Text> User has not allowed permissions</Text>;
  }
  if (device == null) return <NoCameraErrorView />;

  console.log('The user has granted camera permission:', hasPermission);

  //Flatlist of the found items during inference

  const Categories = [
    {
      id: 'categoryPlastic',
      image: require('../../assets/images/CategoriesIcon_plastic.png'),
      title: 'Plastic',
      quantity: 1,
      categoryColor: '#00FF00',
    },
    {
      id: 'categoryCardboard',
      image: require('../../assets/images/CategoriesIcon_clothing.png'),
      title: 'Clothing',
      quantity: 0,
      categoryColor: '#FFE500',
    },
    {
      id: 'categoryGlass',
      image: require('../../assets/images/CategoriesIcon_glass.png'),
      title: 'Glass',
      quantity: 0,
      categoryColor: '#0000FF',
    },
  ];

  return (
    <View style={{flex: 1}}>
      {photo ? (
        <>
          <Image
            source={{uri: `file://${photo.path}`}}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
               <TouchableOpacity
                    style={{width: 50, height: 50, borderRadius: 75 / 2, backgroundColor: "#00000080"}}
                    onPress={onRetakePressed}>
                    <MaterialIcons name="chevron-left" size={45} color="#ffffff" />
                </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <>
          <GestureDetector gesture={gesture}>
            <Camera
              ref={camera}
              device={device}
              isActive={cameraIsActive && !photo}
              style={{width: '100%', height: '90%'}}
              enableFpsGraph={true}
              format={format}
              frameProcessor={processFrames ? frameProcessor : undefined}
              photo={true}
            />
          </GestureDetector>

          <Pressable
                onPress={onTakePicturePressed}
                style={styles.pressable}
          >
                <View style={styles.outerCircle}>
                  <View style={styles.middleCircle}>
                  </View>
                </View>
          </Pressable>
        </>
      )}
       <Timer ref={timerRef} />
       <View style={styles.weatherContainer}>
            <MaterialIcons name="filter-drama" size={20} color="#000000" />
            <Text>15°C</Text>
       </View>
      <BottomSheet
        style={{padding: 15, zIndex: 1}}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}>
        {/* <AnimatedText style={{fontSize: 18, color: 'black'}}>
          {detectedObjectsText.value}
        </AnimatedText>*/}
        {/*<Text>Class names: {nameObjects}</Text>*/}
        <Text>Class names: {capturedObjects.names.join(', ')}</Text>
        <Text
          style={[
            GlobalStyles.headerTitle,
            {paddingVertical: 20, textAlign: 'left', fontSize: 18},
          ]}>
          {/*Objects detected : {detectedObjects} */}
          Objects detected : {capturedObjects.count}
        </Text>

        {/* Detected objects summary per image */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 15,
          }}>
          <Text style={GlobalStyles.paragraph}>Detected material </Text>
          <Text style={GlobalStyles.paragraph}>Quantity </Text>
        </View>
        <View>
          {/* Detected objects list of elements*/}
          <View
            style={{
              borderWidth: 1,
              borderColor: '#D9D9D9',
              borderRadius: 4,
              marginBottom: 40,
            }}>
            <FlatList
              data={Categories}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#F0F6F8',
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      width: 10,
                      height: '100%',
                      backgroundColor: item.categoryColor,
                    }}></View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={item.image}
                      style={{width: 80, height: 80, margin: 10}}
                    />
                    <Text style={[GlobalStyles.paragraph, {width: 170}]}>
                      {item.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#D4E5EB',
                      alignItems: 'center',
                      width: 100,
                      height: 100,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        backgroundColor: '#ffffff',
                        textAlign: 'center',
                        lineHeight: 50,
                        borderWidth: 1,
                        borderColor: '#D9D9D9',
                        width: 60,
                        height: 60,
                        borderRadius: 5,
                      }}>
                      {item.quantity}
                    </Text>
                  </View>
                </View>
              )}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 15,
              }}>
              <View style={{height: 100}}>
                <TouchableOpacity
                  style={[
                    GlobalStyles.primaryButton,
                    {marginBottom: 20, height: 20, paddingHorizontal: 40},
                  ]}
                  onPress={() => {
                    navigation.navigate('liveSurveyScreen');
                  }}>
                  <Text style={GlobalStyles.primaryButtonText}>Add items</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Finish survey CTA */}
        <View style={{height: 120, width: '100%', marginBottom: 5}}>
         <TouchableOpacity
                 style={[
                   GlobalStyles.primaryButton,
                   { marginBottom: 40, height: 20, borderWidth: 0 },
                 ]}
                 onPress={handleFinishSurvey}
               >
                 <Text style={GlobalStyles.primaryButtonText}>Finish Survey</Text>
               </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{paddingVertical: 10}}
            onPress={() => {
              navigation.navigate('homeScreen');
            }}>
            <Text style={[GlobalStyles.paragraph, {color: 'grey'}]}>
              Cancel survey
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View> //close general view
  ); //close return
} //close Live survey screen

const styles = StyleSheet.create({
  pressable: {
    position: 'absolute',
    zIndex: 0,
    alignSelf: 'center',
    top: '65%',
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    width: 75,
    height: 75,
    borderWidth:3,
    borderColor: '#ffffff',
    backgroundColor: 'transparent',
    borderRadius: 75 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleCircle: {
    width: 65,
    height: 65,
    backgroundColor: '#ffffff',
    borderRadius: 65 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
   buttonContainer: {
      position: 'absolute',
      top: '2%',
      left: '2%',
    },
    buttonRow: {
      flexDirection: 'row',
    },
    weatherContainer: {
     position: 'absolute',
        top: '3%',
        right: '2%',
        backgroundColor: '#ffffff',
        zIndex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 20,
        borderRadius: 10,
    },

});