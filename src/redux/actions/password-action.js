import { passwordActionTypes } from '../types/password-types';

export const setMasterPassword = masterPassword => ({
  type: passwordActionTypes.SET_MASTER_PASSWORD,
  payload: masterPassword
});

export const storeTempMasterPassword = tempMasterPassword => ({
  type: passwordActionTypes.STORE_MASTER_PASSWORD_TEMP,
  payload: tempMasterPassword
});
