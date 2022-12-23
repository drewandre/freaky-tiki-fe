import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { Text, TouchableOpacity } from "react-native";
import OSCManager from "./features/OSC/OSCManager";
import { connect } from "react-redux";
import { setData } from "./features/settings/redux/settingsOperations";

const RootStack = createStackNavigator();

function App({ port, address, setData }) {
  React.useEffect(() => {
    OSCManager.setClient(port, address);
    setData();
  }, [port, address, setData]);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerTitle: "",
              headerRight: () => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("SettingsScreen");
                    }}
                    style={{
                      marginRight: 15,
                      backgroundColor: "rgba(0,0,0,0.1)",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                    }}
                  >
                    <Text>Settings</Text>
                  </TouchableOpacity>
                );
              },
            })}
          />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{
              headerBackTitleVisible: false,
              headerTitle: "Settings",
            }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const mapDispatchToProps = {
  setData,
};

function mapStateToProps({ settings }) {
  return {
    port: settings?.port,
    address: settings?.address,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
