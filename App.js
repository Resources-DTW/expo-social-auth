import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import "expo-dev-client";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import Header from "./Header";

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:
      "586012277192-cgol7jl7d4582avlvdierd1f5kkhn64p.apps.googleusercontent.com",
  });

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Header />
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ alignItems: "center", fontSize: 18, fontWeight: 600 }}>
          Welcome, {user.displayName}
        </Text>
        <Text style={{ alignItems: "center", fontSize: 16 }}>{user.email}</Text>
        <Image
          source={{ uri: user.photoURL }}
          resizeMode="contain"
          style={{
            height: 200,
            width: 200,
            alignItems: "center",
            margin: 20,
            borderRadius: 100,
          }}
        />
        <Button title="Sign Out" onPress={signOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
