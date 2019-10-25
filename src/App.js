import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import PasswordConfig from './components/PasswordConfig/PasswordConfig';
import PasswordManager from './components/PasswordManager/PasswordManager';
import { auth, createUserProfile } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/actions/user-action';

import './App.less';

const App = () => {
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfile(userAuth);
        userRef.onSnapshot(snapShot => {
          setUserId(snapShot.id);
          dispatch(setCurrentUser({ id: snapShot.id, ...snapShot.data() }));
        });
      } else {
        setUserId(userAuth);
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
      {userId ? <PasswordManager /> : null}
    </div>
  );
};

export default App;
