import { Alert } from "react-native";
import OSCManager from "../../OSC/OSCManager";
import { setDataBegin, setDataSuccess, setDataError } from "./settingsActions";

export const setData = () => (dispatch) => {
  dispatch(setDataBegin());
  OSCManager.pollCurrentState()
    .then((response) => {
      console.log("Data updated!");
      dispatch(setDataSuccess(response));
    })
    .catch((error) => {
      console.warn(error);
      Alert.alert(`Unable to connect to ${address}:${port}`);
      dispatch(setDataError(error?.message));
    });
};
