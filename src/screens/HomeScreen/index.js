import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { connect } from "react-redux";
import OSCManager from "../../features/OSC/OSCManager";
import { setCurrentAnimation } from "../../features/settings/redux/settingsActions";
import Slider from "./components/Slider";
import { setData } from "../../features/settings/redux/settingsOperations";

function HomeScreen({
  animationProperties,
  animations,
  setCurrentAnimation,
  currentAnimation,
  loading,
  setData,
}) {
  const [valueOne, setValueOne] = React.useState(0);
  function onSliderChange(e, address) {
    setValueOne(e);
    // property.addresses.forEach((address) => {
    //   console.log("Sending to", address);
    OSCManager.sendMessage(address, [e]);
    // });
  }
  function renderAnimation({ item }) {
    return (
      <TouchableOpacity
        style={[
          styles.animationItem,
          {
            borderWidth: 3,
            borderColor: currentAnimation === item ? "#000" : "#ccc",
          },
        ]}
        onPress={() => {
          setCurrentAnimation(item);
        }}
      >
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    );
  }
  function renderSliders() {
    if (!animationProperties) {
      return null;
    }

    console.log(animationProperties.CONTENTS.Public?.CONTENTS?.Scale);
    return (
      <>
        <Slider
          {...animationProperties.CONTENTS.Public?.CONTENTS?.Scale}
          onSliderChange={onSliderChange}
        />
        <Slider
          {...animationProperties.CONTENTS.Public?.CONTENTS?.Speed}
          onSliderChange={onSliderChange}
        />
      </>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={setData} />
      }
    >
      <StatusBar style="auto" />
      <View style={styles.slidersWrapper}>{renderSliders()}</View>
      <FlatList
        horizontal
        data={animations}
        renderItem={renderAnimation}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  slidersWrapper: {
    width: "100%",
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: "#FFF",
  },
  animationItem: {
    width: 200,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  contentContainerStyle: {
    paddingLeft: 15,
  },
});

const mapDispatchToProps = {
  setCurrentAnimation,
  setData,
};

function mapStateToProps({
  settings: { data = [], loading, currentAnimation },
}) {
  const animationProperties = data.find((datum) => {
    return datum?.DESCRIPTION === currentAnimation;
  });
  return {
    loading,
    animationProperties,
    currentAnimation,
    animations: data.map((datum) => {
      return datum.DESCRIPTION;
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
