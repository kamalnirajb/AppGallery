# AppGallery
 
A react native cli based sample project to list the images and show the details of the image having option to share and save.

## Project Setup
-------


In order to setup the project, please follow the steps below:
- Clone the repository at your desired path say `~/PATH/TO/PROJECT/FOLDER`
- Launch the terminal and change the directory to the project root folder using below command:
    ```
    $> cd ~/PATH/TO/PROJECT/FOLDER/AppGallery
    ```
- Make sure to have the node version 13.x.x or above. We can use `nvm` to manage different node versions in order ot be safe sure.
- Run the following command to install all the node packages:
    ```
    $> npm install --save
    ```
- Run the following command to install all the iOS Pods:
    ```
    $> cd ios && pod install
    ```
- To run the app in debug mode for iOS simulator, we need to run metro in a separate terminal using the command below:
    ```
    $> npx react-native start
    ```
    and then we need to use the following command to launch the app in simulator:
    ```
    $> npx react-native run-ios
    ```
    or to run the app in android emulator, we need to run the following command on the terminal:
    ```
    $>  npx react-native run-android
    ```