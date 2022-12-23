import {
  CHANGE_PORT,
  CHANGE_ADDRESS,
  SET_DATA_BEGIN,
  SET_DATA_SUCCESS,
  SET_DATA_ERROR,
  SET_CURRENT_ANIMATION,
} from "./settingsTypes";

const disallowedMedias = [
  "FaceTime_HD_Camera_(Built-in)",
  "TestCard",
  "Video-Output-1",
  "next",
  "per_type_selection",
  "previous",
  "select",
  "select_by_name",
];

export function changePort(port) {
  return {
    type: CHANGE_PORT,
    payload: port,
  };
}

export function changeAddress(address) {
  return {
    type: CHANGE_ADDRESS,
    payload: address,
  };
}

export function setDataBegin() {
  return {
    type: SET_DATA_BEGIN,
  };
}

export function setDataSuccess(data = {}) {
  const payload = [];
  const contents = data.CONTENTS;
  disallowedMedias.forEach((media) => {
    delete contents[media];
  });
  for (var key in contents) {
    payload.push(contents[key]);
  }
  return {
    type: SET_DATA_SUCCESS,
    payload,
  };
}

export function setDataError(message) {
  return {
    type: SET_DATA_ERROR,
    payload: message,
  };
}

export function setCurrentAnimation(animationId) {
  return {
    type: SET_CURRENT_ANIMATION,
    payload: animationId,
  };
}
