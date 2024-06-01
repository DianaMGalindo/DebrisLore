# DebrisLore
This repository includes the code to deploy a React Native application on Android Studio, capable of opening the camera of the user’s phone and then running a TensorFlow Lite object detection model to capture the number and the name of the objects within the field of view. It also contains the code I have used to train the object detection model, which I fine-tuned with the TensorFlow Object Detection API to detect plastic bottles and cardboard. <br/>

This app is a proof of concept on how technologies such as computer vision and machine learning can be applied to citizen science projects. My main focus is exploring the possible augmentation of the current efforts in collecting valuable data about waste for marine debris monitoring in coastal areas. 
A big thank you to the VisionCamera community, who helped me along the way to use their library. This library is the backbone of the app which allows the use of the camera,  the handling of permissions and the frame processing to run object detection inference on mobile devices.

![Github project support asset](https://github.com/DianaMGalindo/DebrisLore/blob/main/Resources/Github_support_asset_v3.png)<br/>

## Repository folder structure: 
-	**App:** 
This folder contains the necessary code to run the app. To run the code you need to install Android Studio, with the build specifications listed under the Requirements section of this repository. This folder also contains different subfolders: 
    - **Android:** this code needs to be built and run with Android Studio.
    - **iOS:** this code needs to be built and run with Xcode on an Apple machine. Note, I have been building the app on Android Studio, and I haven’t tested the full functionality on iOS yet.
    -	**src:** this folder contains the assets, components, constant and navigation screens I have created for the app.
- **Custom Model**
    - **object_detection:** this folder contains the code I used to fine-tune on top of different models using the TensorFlow object detection API. This is technically a clone of the API with some added scripts that allow the configuration, training, saving and converting to .tflite of the custom model. I got a grasp of its usage with the help of the following tutorial: https://www.youtube.com/watch?v=rRwflsS67ow 
    - **trained models:** this folder contains the different models I saved as .tflite format. They can be used within the app. To do so, they need to be added to the App/src/assets/model folder, and modified with the following line of code on the live survey screen, which can be found at App/src/navigation/screens/liveSurveyScreen.tsx: <code> const objectDetection = useTensorflowModel(
   require('../../assets/model/ssd_mobilenet_v2_fineTune_copy.tflite'),
  );</code>
-	**Resources**
    - **Project Resources**: this folder contains the resources, such as tutorials and readings that informed the building of this app.
## Requirements


