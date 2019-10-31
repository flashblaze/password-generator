import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user-reducer.js';
import masterPasswordReducer from './password-reducer';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  user: userReducer,
  masterPassword: masterPasswordReducer
});

export default persistReducer(persistConfig, rootReducer);
