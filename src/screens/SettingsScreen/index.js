import React from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { connect } from "react-redux";
import {
  changePort,
  changeAddress,
} from "../../features/settings/redux/settingsActions";
import OSCManager from "../../features/OSC/OSCManager";
import { SafeAreaView } from "react-native-safe-area-context";

function SettingsScreen({
  navigation,
  port,
  address,
  changePort,
  changeAddress,
}) {
  const [localPort, setLocalPort] = React.useState(port);
  const [localAddress, setLocalAddress] = React.useState(address);

  function handleSave() {
    changePort(localPort);
    changeAddress(localAddress);
    OSCManager.setClient(localPort, localAddress);
    navigation.goBack();
  }

  function onChangePortText(value) {
    setLocalPort(value);
  }

  function onChangeAddressText(value) {
    setLocalAddress(value);
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.wrapper}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.textInputsContainer}>
          <View style={styles.textInputContainer}>
            <Text>IP Address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              value={localAddress}
              onChangeText={onChangeAddressText}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Text>Port</Text>
            <TextInput
              value={localPort}
              onChangeText={onChangePortText}
              style={styles.textInput}
            />
          </View>
        </View>
        <Button title="Save" onPress={handleSave} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    alignSelf: "center",
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.1)",
    width: "100%",
  },
  textInputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  textInputsContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.1)",
    width: "100%",
    height: 100,
    alignSelf: "flex-end",
  },
});

function mapStateToProps({ settings }) {
  return {
    port: settings?.port,
    address: settings?.address,
  };
}

const mapDispatchToProps = {
  changePort,
  changeAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
