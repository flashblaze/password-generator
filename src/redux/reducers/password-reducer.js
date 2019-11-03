import { passwordActionTypes } from '../types/password-types';

const INITIAL_STATE = {
  masterPassword: null,
  tempMasterPassword: null
};

const masterPasswordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case passwordActionTypes.SET_MASTER_PASSWORD:
      return {
        ...state,
        masterPassword: action.payload
      };
    case passwordActionTypes.STORE_MASTER_PASSWORD_TEMP:
      return {
        ...state,
        tempMasterPassword: action.payload
      };
    default:
      return state;
  }
};

export default masterPasswordReducer;
