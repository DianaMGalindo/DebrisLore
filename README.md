# DebrisLore
This repository includes the code to deploy a React Native application on Android Studio, capable of opening the camera of the user’s phone and then running a TensorFlow Lite object detection model to capture the number and the name of the objects within the field of view. It also contains the code I have used to train the object detection model, which I fine-tuned with the TensorFlow Object Detection API to detect plastic bottles and cardboard. <br/>

This app is a proof of concept on how technologies such as computer vision and machine learning can be applied to citizen science projects. My main focus is exploring the possible augmentation of the current efforts in collecting valuable data about waste for marine debris monitoring in coastal areas. 
A big thank you to the VisionCamera community, who helped me along the way to use their library. This library is the backbone of the app which allows the use of the camera,  the handling of permissions and the frame processing to run object detection inference on mobile devices.

![Github project support asset](https://github.com/DianaMGalindo/DebrisLore/blob/main/Resources/Github_support_asset_v3.png)<br/>

## Repository folder structure: 
-	[**App:**](https://github.com/DianaMGalindo/DebrisLore/tree/main/App) 
This folder contains the necessary code to run the app. To run the code you need to install Android Studio, with the build specifications listed under the Requirements section of this repository. This folder also contains different subfolders: 
    - **Android:** this code needs to be built and run with Android Studio.
    - **iOS:** this code needs to be built and run with Xcode on an Apple machine. Note, I have been building the app on Android Studio, and I haven’t tested the full functionality on iOS yet.
    -	**src:** this folder contains the assets, components, constant and navigation screens I have created for the app.
- [**Custom Model**](https://github.com/DianaMGalindo/DebrisLore/tree/main/Custom%20Model)
    - **object_detection:** this folder contains the code I used to fine-tune on top of different models using the TensorFlow object detection API. This is technically a clone of the API with some added scripts that allow the configuration, training, saving and converting to .tflite of the custom model. I got a grasp of its usage with the help of the following tutorial: https://www.youtube.com/watch?v=rRwflsS67ow 
    - **trained models:** this folder contains the different models I saved as .tflite format. They can be used within the app. To do so, they need to be added to the App/src/assets/model folder, and modified with the following line of code on the live survey screen, which can be found at App/src/navigation/screens/liveSurveyScreen.tsx:
   <br/><code> const objectDetection = useTensorflowModel(
   require('../../assets/model/ssd_mobilenet_v2_fineTune_copy.tflite'),
  );</code>
-	[**Resources**](https://github.com/DianaMGalindo/DebrisLore/tree/main/Resources)
    - [**Project Resources**](https://github.com/DianaMGalindo/DebrisLore/blob/main/Resources/Project%20Resources.md): this folder contains the resources, such as tutorials and readings that informed the building of this app. They have been collated within this single document, but they are also included on the relevant sections within the code.
## Requirements
Dependencies play a key role in the deployment of the application, as well as the running of the TensorFlow API. 
As mentioned above, to build the app on Android Studio, the following build specifications are compatible at the time this project was first deployed: 
-	**App Build** (relevant for Android Studio):<br/>
<code> buildToolsVersion = "34.0.0"
        minSdkVersion = 26
        compileSdkVersion = 34
        targetSdkVersion = 34
        ndkVersion = "24.0.8215888"
        kotlinVersion = "1.8.0"  </code>
-	**App Dependencies:** The compatible app dependencies can be found on the  [App_Build_Requirements.txt](https://github.com/DianaMGalindo/DebrisLore/blob/main/Resources/App_Build_Requirements.txt). It is important to keep an eye on future changes for <code> react-native-fast-tflite</code>, <code> react-native-reanimated</code>, <code> react-native-vision-camera</code>, <code> react-native-worklets-core</code>, and <code> vision-camera-resize-plugin</code> as these are essential to run the camera and the model on device.
-	**Object Detection Dependencies:** The dependencies needed to run the TensorFlow object detection API can be found in the [Object_Detection_Env_Requirements.txt](https://github.com/DianaMGalindo/DebrisLore/blob/main/Resources/Object_Detection_Env_Requirements.txt). These dependencies allow the training of the model on TF 2.10.1, but the use of the API might be deprecated in the near future. For this, I need to find a new training pipeline.



