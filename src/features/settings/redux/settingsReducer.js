import { produce } from "immer";

import {
  CHANGE_PORT,
  CHANGE_ADDRESS,
  SET_DATA_BEGIN,
  SET_DATA_SUCCESS,
  SET_DATA_ERROR,
  SET_CURRENT_ANIMATION,
} from "./settingsTypes";

const INITIAL_STATE = {
  port: "8010",
  address: "192.168.100.118",
  // address: "localhost",
  loading: false,
  error: null,
  data: [],
  currentAnimation: null,
};

export { INITIAL_STATE };
export default produce((draft, action) => {
  switch (action.type) {
    case CHANGE_PORT:
      draft.port = action.payload;
      return draft;
    case CHANGE_ADDRESS:
      draft.address = action.payload;
      return draft;
    case SET_DATA_BEGIN:
      draft.loading = true;
      draft.error = null;
      draft.data = [];
      return draft;
    case SET_DATA_SUCCESS:
      draft.data = action.payload;
      draft.loading = false;
      draft.error = null;
      return draft;
    case SET_DATA_ERROR:
      draft.data = INITIAL_STATE.data;
      draft.loading = false;
      draft.error = action.payload;
      return draft;
    case SET_CURRENT_ANIMATION:
      draft.currentAnimation = action.payload;
      return draft;
    default:
      return draft;
  }
}, INITIAL_STATE);
