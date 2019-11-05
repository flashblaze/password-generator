import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import PasswordConfig from './components/PasswordConfig/PasswordConfig';
import Profile from './components/Profile/Profile';
import { auth, createUserProfile } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/actions/user-action';

import './App.less';

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

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
      <Switch>
        <Route exact path="/" component={PasswordConfig} />
        <Route
          exact
          path="/profile"
          render={() => (!currentUser ? <Redirect to="/" /> : <Profile />)}
        />
      </Switch>
    </div>
  );
};

export default App;
