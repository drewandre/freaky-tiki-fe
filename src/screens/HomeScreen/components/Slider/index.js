import React from "react";
import { Text, View, StyleSheet } from "react-native";
import SliderComponent from "@react-native-community/slider";

function Slider({
  DESCRIPTION,
  VALUE,
  RANGE,
  FULL_PATH,
  onSliderChange,
  /* TYPE */
}) {
  function onValueChange(e) {
    onSliderChange(e, FULL_PATH);
  }
  const { MAX: max, MIN: min } = RANGE[0];
  const value = VALUE[0];
  return (
    <View style={styles.container}>
      <Text>{DESCRIPTION}</Text>
      <SliderComponent
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="#f00"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});

export default Slider;
