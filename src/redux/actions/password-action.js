import { passwordActionTypes } from '../types/password-types';

export const setMasterPassword = masterPassword => ({
  type: passwordActionTypes.SET_MASTER_PASSWORD,
  payload: masterPassword
});
