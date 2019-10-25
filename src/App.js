import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import PasswordConfig from './components/PasswordConfig/PasswordConfig';
import { auth, createUserProfile } from './firebase/firebase.utils';
// import { setCurrentUser } from './redux/actions/user-action';

import './App.less';

const App = () => {
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      createUserProfile(user);
      setCurrentUser(user);
    });
    console.log(currentUser);
    return function unsSub() {
      unsubscribeFromAuth();
    };
  });
  return (
    <div className="App">
      <PasswordConfig />
    </div>
  );
};

export default App;
