import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

import { auth } from '../../firebase/firebase.utils';
import { setMasterPassword } from '../../redux/actions/password-action';

const SignIn = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(setMasterPassword(null));
    auth.signOut();
  };

  return (
    <Button type="default" icon="logout" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};

export default SignIn;
