import React from 'react';
import { Button, Popover } from 'antd';

import { signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = () => {
  return (
    <Popover
      content={<p>Sign In for additional features</p>}
      placement="bottom"
    >
      <Button type="default" icon="google" onClick={signInWithGoogle}>
        Sign In
      </Button>
    </Popover>
  );
};

export default SignIn;
