import { View, Text } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={{ alignItems: "center", margin: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 600 }}>Sign In With Google</Text>
    </View>
  );
};

export default Header;
