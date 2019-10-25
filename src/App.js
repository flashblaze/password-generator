import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PasswordConfig from './components/PasswordConfig/PasswordConfig';
import { auth, createUserProfile } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/actions/user-action';

import './App.less';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfile(userAuth);
        userRef.onSnapshot(snapShot => {
          dispatch(setCurrentUser({ id: snapShot.id, ...snapShot.data() }));
        });
      } else {
        dispatch(setCurrentUser(userAuth));
      }
    });

    return function unsSub() {
      unsubscribeFromAuth();
    };
  }, [dispatch]);
  return (
    <div className="App">
      <PasswordConfig />
    </div>
  );
};

export default App;
