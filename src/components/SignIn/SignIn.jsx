import React from 'react';
import { Button } from 'antd';

import { signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = () => {
  return (
    <Button type="primary" icon="google" onClick={signInWithGoogle}>
      Sign In
    </Button>
  );
};

export default SignIn;
