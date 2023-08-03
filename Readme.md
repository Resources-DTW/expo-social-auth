#Follow these steps:

1. Create Expo blank app
2. Open React native firebase install firebase/app & firebase/auth as per documentation
3. Go to social auth
4. open google sign in and open its github page > expo page
5. Adding Custom native code with development builds
6. install npx expo install expo-dev-client
7. import "expo-dev-client" inside app.js file
8. run > eas build --profile development --platform android
9. install > npx expo install @react-native-google-signin/google-signin
10. add plugin as per googlesign github docs
11. create firebase android app > set same package name in app.json
12. run > eas credentials
13. Android / ios > devlopment > Keystore: manage everything needed to build your app > setup new keystore > create new configuration > setname / enter as default > new android keystore : yes
14. copy created sha1 key and paste in firebase app setup and also add default sha1 key in project settings(firebase)
15. setup authentication methods and enable it
16. add googleservices code line inside > app.json > under android
17. download google-services.json file and paste at project level
18. add import auth from '@react-native-firebase/auth'; in app.js
19. again run > eas build --profile development --platform android
20. get apk and install local or emulator
21. Run dev mode > npx expo start --dev-client
