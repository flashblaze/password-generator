import React from 'react';
import { Button } from 'antd';

import { auth } from '../../firebase/firebase.utils';

const SignIn = () => {
  return (
    <Button type="default" icon="logout" onClick={() => auth.signOut()}>
      Sign Out
    </Button>
  );
};

export default SignIn;
