import {
  ADD_BANK,
  DELETE_BANK,
  UPDATE_BANK,
  GET_SINGLE_BANK,
  GET_ALL_BANKS,
  SET_BANKS,
} from "../actions/bankActions";
const bankReducer = (state = [], action) => {
  switch (action.type) {
    case SET_BANKS:
      state = action.payload;
      return state;
    case UPDATE_BANK:
      return state;
    case ADD_BANK:
      return state;
    case UPDATE_BANK:
      return state;
    case DELETE_BANK:
      return state;
    case GET_SINGLE_BANK:
      return state;
    default:
      return state;
  }
};

export default bankReducer;
